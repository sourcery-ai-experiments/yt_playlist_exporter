require('dotenv').config();
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const default_thumbnail_url = '../DefaultThumbnail.jpg';
const YT_API = process.env.YT_API;
const cors = require('cors');
const puppeteer = require('puppeteer');

const client_id = process.env.YT_CLIENT_ID;
const client_secret = process.env.YT_CLIENT_SECRET;
const redirect_uri = 'http://localhost:4000/videos/callback';

const oauth2Client = new OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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
  res.send({url: url});
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

    res.redirect('http://localhost:3000'); // Redirect to frontend

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


// Scrape a YouTube mix playlist for video links

async function scrapeMixVideos(mixUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(mixUrl, { waitUntil: 'networkidle2' });

    const videoLinks = new Set();

    while (true) {
      const newVideoLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('ytd-playlist-panel-video-renderer a#wc-endpoint')).map(a => a.href);
      });

      newVideoLinks.forEach(link => videoLinks.add(link));

      const loadMoreButton = await page.$('button#more-button');
      if (!loadMoreButton) {
        console.log('No more load more button found.');
        break;
      }

      await loadMoreButton.click();
      console.log('Clicked load more button.');
      await page.waitForTimeout(2000); // Adjust as necessary
    }

    // Extract video IDs from video links
    const vidIds = Array.from(videoLinks).map(link => {
      // Example YouTube video link: "https://www.youtube.com/watch?v=VIDEO_ID"
      const url = new URL(link);
      return url.searchParams.get('v'); // Extracts the video ID from query parameter 'v'
    }).filter(id => id); // Filter out any null or undefined values

    return vidIds;
  } catch (error) {
    console.error('Error scraping mix videos:', error);
    throw error; // Rethrow the error to propagate it to the caller
  } finally {
    await browser.close();
  }
}


router.get('/mix', async (req, res) => {
  const { mixUrl } = req.query;
  console.log("Mix URL: ", mixUrl);

  try {
    // Scrape video IDs from mix URL
    const videoIDs = await scrapeMixVideos(mixUrl);
    console.log("Video IDs:", videoIDs);

    // Initialize variables to store playlist information
    let videoInfo = [];
    let mixName = '';
    let firstVideoThumbnail = '';

    // Process each video ID to fetch its details
    for (let i = 0; i < videoIDs.length; i++) {
      const videoId = videoIDs[i];

      // Get video details using YouTube Data API
      const videoResponse = await youtube.videos.list({
        part: 'snippet',
        id: videoId,
      });

      if (videoResponse.data.items.length > 0) {
        const video = videoResponse.data.items[0];
        const thumbnail = video.snippet.thumbnails.high ? video.snippet.thumbnails.high.url : default_thumbnail_url;
        videoInfo.push({
          title: video.snippet.title,
          thumbnail,
          artist: video.snippet.channelTitle,
        });

        // Save the thumbnail of the first video
        if (i === 0) {
          firstVideoThumbnail = thumbnail;
          mixName = video.snippet.title;
        }
      }
    }

    res.json({ mixName,videoInfo,firstVideoThumbnail });

  } catch (error) {
    console.error('Error fetching mix information:', error);
    res.status(500).send('Failed to fetch mix information');
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

  // oauth2Client.setCredentials(req.session.tokens);
  // console.log("Session tokens: ", req.session.tokens); // Log the session tokens

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
