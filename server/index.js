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

app.use(cors());
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

const imagesProxy = createProxyMiddleware(
  'http://localhost:3001/api/images'
);
app.use('/api/images', imagesProxy);

const bookingProxy = createProxyMiddleware(
  'http://localhost:3002/api/booking'
);
app.use('/api/booking', bookingProxy);

const overallReviewsProxy = createProxyMiddleware(
  'http://localhost:3003/api/overall_reviews'
);
app.use('/api/overall_reviews', overallReviewsProxy);

const individualReviewsProxy = createProxyMiddleware(
  'http://localhost:9000/api/individual_reviews'
);
app.use('/api/individual_reviews', individualReviewsProxy);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
