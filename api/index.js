import fetch from "node-fetch";

const YOUTUBE_API_KEY = "AIzaSyAJrpKVk0Ds5dHlayD5f6W2moeJMMF51JI"; // replace with your key
const YOUTUBE_SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_VIDEOS_API_URL = "https://www.googleapis.com/youtube/v3/videos";

function extractVideoId(url) {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&?\s]+)/,
    /(?:https?:\/\/)?youtu\.be\/([^&?\s]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&?\s]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&?\s]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^&?\s]+)/
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  const queryMatch = url.match(/v=([^&?\s]+)/);
  return queryMatch ? queryMatch[1] : null;
}

function parseDuration(duration) {
  try {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "N/A";
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    let formatted = "";
    if (hours > 0) formatted += `${hours}h `;
    if (minutes > 0) formatted += `${minutes}m `;
    if (seconds > 0) formatted += `${seconds}s`;
    return formatted.trim() || "0s";
  } catch {
    return "N/A";
  }
}

async function fetchYoutubeDetails(videoId) {
  try {
    const apiUrl = `${YOUTUBE_VIDEOS_API_URL}?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (!data.items || !data.items.length) return { error: "No video found" };

    const video = data.items[0];
    const snippet = video.snippet;
    const stats = video.statistics || {};
    const contentDetails = video.contentDetails || {};

    return {
      title: snippet.title || "N/A",
      channel: snippet.channelTitle || "N/A",
      description: snippet.description || "N/A",
      imageUrl: snippet.thumbnails?.high?.url || "",
      duration: parseDuration(contentDetails.duration || ""),
      views: stats.viewCount || "N/A",
      likes: stats.likeCount || "N/A",
      comments: stats.commentCount || "N/A",
      tags: snippet.tags || []
    };
  } catch {
    return { error: "Failed to fetch YouTube video details." };
  }
}

async function fetchYoutubeSearch(query) {
  try {
    const searchUrl = `${YOUTUBE_SEARCH_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const videoIds = searchData.items.map(item => item.id.videoId);
    if (!videoIds.length) {
      return { error: "No videos found." };
    }

    const videosUrl = `${YOUTUBE_VIDEOS_API_URL}?part=snippet,statistics,contentDetails&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();

    const videosMap = {};
    videosData.items.forEach(video => (videosMap[video.id] = video));

    return searchData.items.map(item => {
      const video = videosMap[item.id.videoId] || {};
      const snippet = item.snippet;
      const stats = video.statistics || {};
      const content = video.contentDetails || {};
      return {
        title: snippet.title,
        channel: snippet.channelTitle,
        imageUrl: snippet.thumbnails?.high?.url || "",
        link: `https://youtube.com/watch?v=${item.id.videoId}`,
        duration: parseDuration(content.duration || ""),
        views: stats.viewCount || "N/A",
        likes: stats.likeCount || "N/A",
        comments: stats.commentCount || "N/A",
        tags: video.snippet?.tags || []
      };
    });
  } catch {
    return { error: "Failed to fetch search data." };
  }
}

export default async function handler(req, res) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/api/dl") {
    const youtubeUrl = searchParams.get("url")?.trim();
    if (!youtubeUrl) {
      return res.status(400).json({ error: "Missing 'url' parameter.", contact: "@ISmartCoder" });
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube URL.", contact: "@ISmartCoder" });
    }

    const standardUrl = `https://www.youtube.com/watch?v=${videoId}`;
    let youtubeData = await fetchYoutubeDetails(videoId);

    if (youtubeData.error) {
      youtubeData = {
        title: "Unavailable",
        channel: "N/A",
        description: "N/A",
        imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        duration: "N/A",
        views: "N/A",
        likes: "N/A",
        comments: "N/A",
        tags: []
      };
    }

    try {
      const cliptoRes = await fetch("https://www.clipto.com/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: standardUrl })
      });

      const data = await cliptoRes.json();
      const response = {
        api_owner: "@ISmartCoder",
        updates_channel: "@TheSmartDevs",
        title: data.title || youtubeData.title,
        channel: youtubeData.channel,
        description: youtubeData.description,
        thumbnail: data.thumbnail || youtubeData.imageUrl,
        thumbnail_url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        url: data.url || standardUrl,
        duration: youtubeData.duration,
        views: youtubeData.views,
        likes: youtubeData.likes,
        comments: youtubeData.comments,
        tags: youtubeData.tags,
        ...data
      };

      return res.status(200).json(response);
    } catch {
      return res.status(500).json({
        api_owner: "@ISmartCoder",
        updates_channel: "@TheSmartDevs",
        ...youtubeData,
        thumbnail_url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        url: standardUrl,
        error: "Something went wrong. Please contact @ISmartCoder"
      });
    }
  }

  if (pathname === "/api/search") {
    const query = searchParams.get("q")?.trim();
    if (!query) {
      return res.status(400).json({ error: "Missing 'q' parameter.", contact: "@ISmartCoder" });
    }

    const searchData = await fetchYoutubeSearch(query);
    if (searchData.error) {
      return res.status(500).json({
        api_owner: "@ISmartCoder",
        updates_channel: "@TheSmartDevs",
        error: searchData.error
      });
    }

    return res.status(200).json({
      api_owner: "@ISmartCoder",
      updates_channel: "@TheSmartDevs",
      result: searchData
    });
  }

  // default
  return res.status(404).json({ error: "Not Found" });
}
