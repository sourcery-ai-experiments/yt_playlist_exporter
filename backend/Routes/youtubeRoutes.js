require('dotenv').config();
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const youtube = google.youtube('v3');

const YT_API = process.env.YT_API;

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  let videoTitles = [];
  let nextPageToken = null;

  try {
    do {
      const response = await youtube.playlistItems.list({
        part: 'snippet',
        maxResults: 50,
        playlistId,
        key: YT_API,
        pageToken: nextPageToken,
      });

      const { items, nextPageToken: newNextPageToken } = response.data;
      videoTitles = [...videoTitles, ...items.map(item => item.snippet.title)];
      nextPageToken = newNextPageToken;
    } while (nextPageToken);

    res.json({ videoTitles });
    console.log(videoTitles.length);
  } catch (err) {
    console.error('YouTube API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
