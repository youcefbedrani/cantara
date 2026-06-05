require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'service-account.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function appendToSheet(data) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const timestamp = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });

  const values = [[
    timestamp,
    data.name,
    data.phone,
    data.city,
    data.product,
    data.quantity,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:F',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

app.post('/submit', async (req, res) => {
  try {
    const { name, phone, city, product, quantity } = req.body;

    if (!name || !phone || !city || !product || !quantity) {
      return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
    }

    await appendToSheet({ name, phone, city, product, quantity });
    res.json({ success: true, message: 'تم إرسال الطلب بنجاح' });
  } catch (err) {
    console.error('Sheet append error:', err);
    res.status(500).json({ error: 'فشل حفظ الطلب، حاول مرة أخرى' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
