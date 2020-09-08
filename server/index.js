require('dotenv').config();
require('newrelic');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

/**
 * Cloud redirect for style
 */
const CLOUD_STYLE_URL = process.env.CLOUD_STYLE_URL;
app.get('*/style.css', (req, res) => {
  res.redirect(`${CLOUD_STYLE_URL}/style.css`);
  return;
});

/**
 * Middleware & static files
 */
app.use(cors());
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

/**
 * Images Service Proxy
 */
const imagesProxy = createProxyMiddleware(
  process.env.IMAGES_SERVICE_URL || 'http://localhost:3001/api/images'
);
app.use('/api/images', imagesProxy);

/**
 * Booking Service Proxy
 */
const bookingProxy = createProxyMiddleware(
  process.env.BOOKING_SERVICE_URL || 'http://localhost:3002/api/booking'
);
app.use('/api/booking', bookingProxy);

/**
 * Reviews Service Proxy
 */
const overallReviewsProxy = createProxyMiddleware(
  process.env.OVERALL_REVIEWS_SERVICE_URL
  || 'http://localhost:3003/api/overall_reviews'
);
app.use('/api/overall_reviews', overallReviewsProxy);

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
