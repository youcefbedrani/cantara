require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const types = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.html': 'text/html; charset=utf-8',
  '.css': 'text/css', '.js': 'text/javascript',
};

app.get(/\.(png|jpg|jpeg|svg|ico|css|js)$/, (req, res) => {
  const file = path.join(__dirname, req.path);
  if (fs.existsSync(file)) {
    res.type(types[path.extname(file)] || 'application/octet-stream');
    res.sendFile(file);
  } else {
    res.status(404).end();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'cantara-landing.html'));
});

app.listen(PORT, () => console.log('Running'));
