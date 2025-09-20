import fetch from "node-fetch";

const YOUTUBE_API_KEY = "AIzaSyAJrpKVk0Ds5dHlayD5f6W2moeJMMF51JI";
const YOUTUBE_SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_VIDEOS_API_URL = "https://www.googleapis.com/youtube/v3/videos";

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

export default async function handler(req, res) {
  const query = req.query.q?.trim();
  if (!query) {
    return res.status(400).json({ error: "Missing 'q' parameter.", contact: "@ISmartCoder" });
  }

  try {
    const searchUrl = `${YOUTUBE_SEARCH_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const videoIds = searchData.items.map(item => item.id.videoId);
    if (!videoIds.length) {
      return res.status(404).json({ error: "No videos found." });
    }

    const videosUrl = `${YOUTUBE_VIDEOS_API_URL}?part=snippet,statistics,contentDetails&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();

    const videosMap = {};
    videosData.items.forEach(video => (videosMap[video.id] = video));

    const result = searchData.items.map(item => {
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

    res.status(200).json({
      api_owner: "@ISmartCoder",
      updates_channel: "@TheSmartDevs",
      result
    });
  } catch {
    res.status(500).json({ api_owner: "@ISmartCoder", updates_channel: "@TheSmartDevs", error: "Failed to fetch search data." });
  }
}
