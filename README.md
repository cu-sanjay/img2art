```
   _____  _______ _______ _    _ _______
  |_____| |_____/ |______ \  /   |
  |     | |    \_ |______  \/    |   .SYS
```

# ARTXT.SYS — Image & Text to Art Converter

Convert images and text into ASCII art, dot art, block art, braille, and SVG — with a dark UI.

---

## Features

**Tab 01 · IMAGE → ART**
- Drag & drop image upload (PNG, JPG, WEBP, GIF, BMP — max 10MB)
- 5 art styles: ASCII `$@#%*`, DOTS `●◉○`, BLOCKS `█▓▒░`, BRAILLE `⣿⣷⠀`, LINES `╬╪━`
- Width (40–160), Intensity (10–100), Invert toggle
- Export as text file or SVG vector

**Tab 02 · TEXT → ART**
- Figlet-powered ASCII art from any name or text
- 10 fonts: Big, Standard, Banner, Block, Doom, Shadow, Slant, Ghost, Larry 3D, Graffiti
- Live debounced preview, one-click copy & download

**Tab 03 · GALLERY**
- 40+ pre-made art pieces across 5 categories: Hands, Animals, Symbols, Faces, Frames
- Search + filter by category, one-click copy

---

## Project Structure

```
artxt/
├── api/                  ← Vercel Serverless Functions
│   ├── convert.ts        POST /api/convert   — image → art
│   └── text-art.ts       POST /api/text-art  — text → figlet art
├── src/                  ← React + Vite frontend
│   ├── App.tsx
│   ├── index.css         design system
│   ├── main.tsx
│   ├── pages/
│   │   ├── image-art.tsx
│   │   ├── text-art.tsx
│   │   └── gallery.tsx
│   └── data/
│       └── gallery.ts    40+ curated art pieces
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
└── tsconfig.json
```

---

## Local Development

```bash
npm install

# Run the frontend locally
npm run dev
```

Open: http://localhost:5173

---

## Deploy to Vercel

### 1. Push to GitHub
Push this entire repo to GitHub as-is.

### 2. Create a Vercel Project
Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo.

### 3. Configure these settings

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Root Directory** | `.` (leave blank / repo root) |
| **Build Command** | `vite build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Environment Variables** | *(none required)* |

### 4. Hit Deploy

Vercel will:
- Build the Vite frontend → `dist/`
- Deploy `api/convert.ts` + `api/text-art.ts` as serverless functions automatically
- Route all `/api/*` calls to those functions via `vercel.json`

---

## API Reference

### `POST /api/convert`

```json
// Request
{
  "image": "<base64 image>",
  "type": "ascii | dots | blocks | braille | lines",
  "width": 80,
  "intensity": 50,
  "invert": false
}

// Response
{ "textArt": "...", "svg": "<svg>...</svg>" }
```

### `POST /api/text-art`

```json
// Request
{ "text": "HELLO", "font": "Big" }

// Response
{ "art": "  _   _ ..." }
```

Available fonts: `Big`, `Standard`, `Banner`, `Block`, `Doom`, `Shadow`, `Slant`, `Ghost`, `Larry 3D`, `Graffiti`

---

## Design System

Dark UI — black background, lime accent, Space Mono typeface.

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Card | `#161616` |
| Accent | `#cfff04` (lime) |
| Text | `#f0f0f0` |
| Font | Space Mono |

---

## Stack

- **React 19** + **Vite 7** — frontend
- **Tailwind CSS v4** — styling
- **jimp** — pure-JS image processing (no native binaries, Vercel compatible)
- **figlet** — ASCII text art
- **wouter** — lightweight router
- **@vercel/node** — serverless function types
