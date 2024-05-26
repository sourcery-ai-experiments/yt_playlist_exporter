require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const youtubeRoutes = require('./Routes/youtubeRoutes');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/videos', youtubeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});