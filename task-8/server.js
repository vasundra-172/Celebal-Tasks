const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;
require('dotenv').config();
// Middleware for parsing JSON
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Error: File type not supported!'));
  }
});

// Ensure uploads directory exists
const ensureUploadsDir = async () => {
  try {
    await fs.mkdir('./uploads', { recursive: true });
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }
};
ensureUploadsDir();

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Enhanced Express API' });
});

// File upload route
app.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    res.json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size
      }
    });
  } catch (err) {
    next(err);
  }
});

// Weather API route
app.get('/weather/:city', async (req, res, next) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity
    };

    res.json(weatherData);
  } catch (err) {
    next(err);
  }
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle Multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: 'File upload error',
      message: err.message
    });
  }

  // Handle Axios errors
  if (err.isAxiosError) {
    return res.status(err.response?.status || 500).json({
      error: 'Weather API error',
      message: err.response?.data?.message || 'Failed to fetch weather data'
    });
  }

  // Generic error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});