# Cantara Orders — Landing Page with Google Sheets

A Node.js landing page that collects orders and saves them to Google Sheets.

## 📋 Requirements

- Node.js 18+
- A Google account (for Google Sheets API)

---

## 🚀 Setup

### 1. Clone & Install

```bash
npm install
```

### 2. Create a Google Service Account

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing one)
3. Go to **APIs & Services > Library**
4. Search for **Google Sheets API** and enable it
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > Service Account**
7. Give it a name (e.g. `cantara-sheets`) and click **Create and Continue**
8. Skip the optional steps, click **Done**
9. Click on the service account you just created
10. Go to the **Keys** tab
11. Click **Add Key > Create New Key**
12. Choose **JSON** and click **Create**
13. A JSON file will be downloaded — **rename it to `service-account.json`** and place it in the project root folder

> ⚠️ **Keep this file secure. Never commit it to Git or share it publicly.**

### 3. Create a Google Sheet

1. Go to https://sheets.new/
2. Create a sheet with the following headers in **Row 1** (columns A–F):

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | الوقت | الاسم | الهاتف | المدينة | المنتج | الكمية |

3. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_IS_THE_ID`**`/edit`

### 4. Share the Sheet with the Service Account

1. Open your Google Sheet
2. Click the **Share** button (top right)
3. Paste the **service account email** (found in the JSON file under `client_email`)
4. Give **Editor** permissions
5. Click **Send**

### 5. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your `SPREADSHEET_ID`.

### 6. Run Locally

```bash
npm start
```

Open http://localhost:3000 in your browser.

---

## ☁️ Deploy to Render.com

1. Push your project to a GitHub repository
2. Go to https://dashboard.render.com/
3. Click **New + > Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `cantara-orders`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Under **Environment Variables**, add:
   - `SPREADSHEET_ID` — your Google Sheet ID
   - `PORT` — `10000` (Render sets this automatically)
7. **Important:** Upload your `service-account.json` file:
   - In Render dashboard, go to your service
   - Click **Environment > Secret Files**
   - Add a **Secret File** with **Mount Path** set to `/etc/secrets/service-account.json`
   - Then update your `.env` or server code to read from that path
   - Or, copy the JSON content into an environment variable called `GOOGLE_CREDENTIALS` and modify `server.js` to parse it from `process.env.GOOGLE_CREDENTIALS`

8. Click **Create Web Service**

Your app will be live at `https://your-app-name.onrender.com`.

---

## 📁 Project Structure

```
├── public/
│   └── index.html      # Landing page with order form
├── .env                # Environment variables (not committed)
├── .env.example        # Environment variables template
├── package.json
├── server.js           # Express server
├── service-account.json # Google service account key (not committed)
└── README.md
```

## 🛠 Tech Stack

- **Express.js** — web server
- **Google Sheets API** — data storage
- **googleapis** — Google API client
- **dotenv** — environment variables
- **cors** — cross-origin support
