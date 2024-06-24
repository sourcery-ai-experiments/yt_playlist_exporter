require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const client_id = process.env.SPOT_CLIENT_ID;
const client_secret = process.env.SPOT_CLIENT_SECRET;
const redirect_uri = 'http://localhost:4000/spotify/callback';

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});


const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.randomBytes(length);
  return Array.from(values).map(byte => possible[byte % possible.length]).join('');
};

const sha256 = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest();
};

const base64URLEncode = (buffer) => {
  return buffer.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

router.get('/login', (req, res) => {
  const code_verifier = generateRandomString(64);
  const code_challenge = base64URLEncode(sha256(code_verifier));
  const state = generateRandomString(16);

  // Store the code_verifier in the session (or use a database)
  req.session.code_verifier = code_verifier;

  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private';

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', client_id);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('redirect_uri', redirect_uri);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', code_challenge);
  authUrl.searchParams.append('show_dialog', 'true');
  res.send({ url: authUrl.toString() });
});

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  // Retrieve the code_verifier from the session (or use a database)
  const code_verifier = req.session.code_verifier;

  if (!code) {
    res.status(400).send('Authorization code is missing');
    return;
  }

  if (!code_verifier) {
    res.status(400).send('Code verifier is missing');
    return;
  }

  try {
    const url = 'https://accounts.spotify.com/api/token';
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
      },
      body: new URLSearchParams({
        client_id: client_id,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        code_verifier: code_verifier,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    console.log(data);

    if (data.error) {
      throw new Error(data.error_description);
    }

    const { access_token, refresh_token } = data;
    // Save the tokens for later use
    req.session.spotify_access_token = access_token;
    req.session.spotify_refresh_token = refresh_token;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    // Fetch user profile
    const userProfile = await spotifyApi.getMe();
    const profileImage = userProfile.body.images.length > 0 ? userProfile.body.images[0].url : null;

    // Create SpotifyProfile object
    const SpotifyProfile = {
      name: userProfile.body.display_name,
      photoUrl: profileImage
    };

    // Store user profile image in session
    req.session.spotify_profile = SpotifyProfile;

    res.redirect('http://localhost:3000'); // Redirect to frontend
  } catch (err) {
    console.error('Error during authentication:', err);
    res.status(500).send('Authentication failed.');
  }
});

router.get('/auth-status', (req, res) => {
  const access_token = req.session.spotify_access_token;

  if (access_token) {
    res.json({
      isSpotyAuthenticated: true,
      SpotyProfile: req.session.spotify_profile
    });
  } else {
    res.json({
      isSpotyAuthenticated: false
    });
  }
});

module.exports = router;

