const express = require('express');
const app = express();

// List of bot User-Agent keywords
const botUserAgents = [
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Googlebot',
  'bingbot',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'facebot',
  'ia_archiver'
];

// Middleware to detect bots and redirect normal users
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const isBot = botUserAgents.some(bot => userAgent && userAgent.toLowerCase().includes(bot.toLowerCase()));

  if (!isBot) {
    // Redirect real users to Site B
    res.redirect('https://siteB.com');
  } else {
    // Let bots see Site A
    next();
  }
});

// Main content for bots
app.get('*', (req, res) => {
  res.send('<html><head><title>Site A</title></head><body><h1>Welcome to Site A</h1></body></html>');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
