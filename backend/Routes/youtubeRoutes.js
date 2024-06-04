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
  let playlistName = '';
  let creator = '';
  let datePublished = '';

  try {
    // Get playlist details
    const playlistResponse = await youtube.playlists.list({
      part: 'snippet',
      id: playlistId,
      key: YT_API,
    });

    if (playlistResponse.data.items.length > 0) {
      const playlist = playlistResponse.data.items[0];
      playlistName = playlist.snippet.title;
      creator = playlist.snippet.channelTitle;
      datePublished = playlist.snippet.publishedAt;
    }

    // Get playlist items
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

    res.json({ playlistName, creator, datePublished, videoTitles });
  } catch (err) {
    console.error('YouTube API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
