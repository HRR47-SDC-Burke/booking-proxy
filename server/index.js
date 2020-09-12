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
const imagesUrl = process.env.IMAGES_SERVICE_URL || 'http://localhost:3001';
const imagesProxy = createProxyMiddleware(imagesUrl + '/api/images');
app.use('/api/images', imagesProxy);

app.get('*/images_script', (req, res) => {
  res.redirect(`${imagesUrl}/bundle.js`);
  return;
});

/**
 * Booking Service Proxy
 */
const bookingUrl = process.env.BOOKING_SERVICE_URL || 'http://localhost:3002';
const bookingProxy = createProxyMiddleware(bookingUrl + '/api/booking');
app.use('/api/booking', bookingProxy);

app.get('*/booking_script', (req, res) => {
  res.redirect(`${bookingUrl}/bundle.js`);
  return;
});

/**
 * Reviews Service Proxy
 */
const reviewsUrl = process.env.REVIEWS_SERVICE_URL || 'http://localhost:3003';
const overallReviewsProxy = createProxyMiddleware(
  reviewsUrl + '/api/overall_reviews'
);
const individualReviewsProxy = createProxyMiddleware(
  reviewsUrl + '/api/individual_reviews'
);
app.use('/api/overall_reviews', overallReviewsProxy);
app.use('/api/individual_reviews', individualReviewsProxy);
app.get('*/reviews_script', (req, res) => {
  res.redirect(`${reviewsUrl}/bundle.js`);
  return;
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
