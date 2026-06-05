const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/v2', (req, res) => {
  res.sendFile(path.join(__dirname, 'cantara-landing-v2.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'cantara-landing.html'));
});

app.listen(PORT, () => console.log('Running on port ' + PORT));
