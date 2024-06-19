require('dotenv').config();
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const default_thumbnail_url = '../DefaultThumbnail.jpg';
const YT_API = process.env.YT_API;

const client_id = process.env.YT_CLIENT_ID;
const client_secret = process.env.YT_CLIENT_SECRET;
const redirect_uri = 'http://localhost:4000/videos/callback';

const oauth2Client = new OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

// Redirect to Google's OAuth 2.0 endpoint
router.get('/auth', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'select_account' 
  });
  res.redirect(url);
});

// Logout and clear session tokens
router.get('/logout', (req, res) => {
  req.session.tokens = null;
  req.session.profile = null;
  res.send('Logged out. You can now log in with a different Google account.');
});


// Exchange authorization code for tokens
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens; // Save tokens to session


    const peopleService = google.people({ version: 'v1', auth: oauth2Client });
    const me = await peopleService.people.get({
      resourceName: 'people/me',
      personFields: 'names,photos'
    });

    const profile = {
      name: me.data.names[0].displayName,
      photoUrl: me.data.photos[0].url
    };

    req.session.profile = profile; // Save profile to session

    res.redirect('/videos/profile'); // Redirect to profile page

  } catch (error) {
    console.error('Error retrieving tokens:', error);
    res.status(500).send('Authentication failed');
  }
});

// Route to get the logged-in user's profile
router.get('/profile', (req, res) => {
  if (req.session.profile) {
    res.json(req.session.profile);
  } else {
    res.status(403).json({ error: 'User not authenticated' });
  }
});

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});

//Check if the user is authenticated
router.get('/auth-status', (req, res) => {
  if (req.session.tokens && req.session.profile) {
    res.json({
      isGoogleAuthenticated: true,
      GoogleProfile: req.session.profile
    });
  } else {
    res.json({
      isGoogleAuthenticated: false
    });
  }
});

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  let videoInfo = [];
  let nextPageToken = null;
  let playlistName = '';
  let creator = '';
  let datePublished = ''; 
  let firstVideoThumbnail = '';
  let privacyStatus = '';

  if (!req.session.tokens) {
    return res.status(403).json({ error: 'User not authenticated' });
  }

  oauth2Client.setCredentials(req.session.tokens);
  console.log("Session tokens: ", req.session.tokens); // Log the session tokens

  try {
    // Get playlist details
    const playlistResponse = await youtube.playlists.list({
      part: 'snippet,status',
      id: playlistId,
    });

    if (playlistResponse.data.items.length > 0) {
      const playlist = playlistResponse.data.items[0];
      playlistName = playlist.snippet.title;
      creator = playlist.snippet.channelTitle;
      datePublished = playlist.snippet.publishedAt;
      privacyStatus = playlist.status.privacyStatus;
    } else {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (privacyStatus === 'private') {
      console.log("Private playlist");
      // return res.status(403).json({ error: 'Private playlist' });
    }

    // Get playlist items
    console.log("Privacy Status : ", privacyStatus);
    do {
      const response = await youtube.playlistItems.list({
        part: 'snippet',
        maxResults: 50,
        playlistId,
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

    res.json({ playlistName, creator, datePublished, videoInfo, firstVideoThumbnail });

  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
