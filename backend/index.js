require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const youtubeRoutes = require('./Routes/youtubeRoutes');
const spotifyRoutes = require('./Routes/spotifyRoutes');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
    maxAge:1800000  
   } // Set secure: true if using HTTPS
}));
 
app.use('/videos', youtubeRoutes);
app.use('/spotify', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
