// File: api/download.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "No url provided" });
      return;
    }

    // Pilih endpoint Instagram/YouTube
    let endpoint = '';
    if (url.includes("instagram.com")) {
      endpoint = `https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram?url=${encodeURIComponent(url)}`;
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      endpoint = `https://social-media-video-downloader.p.rapidapi.com/smvd/get/youtube?url=${encodeURIComponent(url)}`;
    } else {
      res.status(400).json({ error: "Unsupported URL" });
      return;
    }

    // Request ke RapidAPI
    const fetchResponse = await fetch(endpoint, {
      headers: {
        'X-RapidAPI-Key': '13e2c7c752msh1920c46ff67c7f9p16b1e0jsnffc8be8ad7da',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    });

    const data = await fetchResponse.json();
    res.status(fetchResponse.status).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}