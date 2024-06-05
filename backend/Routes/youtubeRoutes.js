require('dotenv').config();
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const default_thumbnail_url = '../../Assets/DefaultThumbnail.jpg'; 
const YT_API = process.env.YT_API;

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  let videoInfo = []; // Renamed to videoInfo since it now holds more than just titles
  let nextPageToken = null;
  let playlistName = '';
  let creator = '';
  let datePublished = '';
  let firstVideoThumbnail = '';

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
  videoInfo = [...videoInfo, ...items.map(item => {
    const thumbnail = item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : default_thumbnail_url;
    return { title: item.snippet.title, thumbnail, artist: item.snippet.videoOwnerChannelTitle };
  })];
  nextPageToken = newNextPageToken;

  // Save the thumbnail of the first video
  if (!firstVideoThumbnail && items.length > 0) {
    firstVideoThumbnail = items[0].snippet.thumbnails.high ? items[0].snippet.thumbnails.high.url : default_thumbnail_url;
  }
} while (nextPageToken);
    
    res.json({ playlistName, creator, datePublished, videoInfo, firstVideoThumbnail }); // videoTitles is now videoInfo
  } catch (err) {
    console.error('YouTube API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
