# 📦 @jerrycoder/instagram-api

Unofficial Instagram Downloader API — fetch Reels, Posts, and Stories using JerryCoder API.


## 🌐 API Website
👉 https://jerrycoder.oggyapi.workers.dev


## 🚀 Installation

```bash
npm install @jerrycoder/instagram-api

⚡ Quick Usage

## ✅ CommonJS (Node.js)
const { instagram } = require("@jerrycoder/instagram-api");

(async () => {
  const data = await instagram("https://www.instagram.com/reel/xxxxx/");
  console.log(data);
})();


## ✅ ESM / Modern JS
import { instagram } from "@jerrycoder/instagram-api";

const data = await instagram("https://www.instagram.com/reel/xxxxx/");
console.log(data);

📡 Response Example
{
  "status": "success",
  "data": {
    "type": "https://...",
    "url": "https://..."
  }
}


## ☁️ Deploy on Vercel (API Endpoint)
Create file:

```bash
 /api/instagram.js

import { instagram } from "@jerrycoder/instagram-api";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: "error",
        message: "URL query is required"
      });
    }

    const data = await instagram(url);

    return res.status(200).json({
      status: "success",
      data
    });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
}


## 🔗 API Usage (after deploy)

https://your-domain.vercel.app/api/instagram?url=INSTAGRAM_URL


## ⚠️ Notes
URL must be a valid Instagram post/reel/story

Private content is not supported

Depends on external API availability

## 🛠️ Features

⚡ Fast response

📥 Download Reels / Posts / Stories

🔄 Simple API structure

🧩 Works with CommonJS & ESM



## 🧪 Status

✅ Fully Tested on Node.js & Vercel
🚀 Version: 2.5.5 (Latest)


## 📄 License
MIT License © JerryCoder
