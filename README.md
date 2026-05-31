# Property Description Viewer

Standalone React app for the WeOwn property description page UI — no site header or footer.

## Run

```bash
npm install
npm start
```

Runs on **http://localhost:3006**

## URLs

| URL | Description |
|-----|-------------|
| `http://localhost:3006/` | Default property (from `.env.local`) |
| `http://localhost:3006/?property=Cityscape%20Living` | Load by slug (email-backend, like frontned-video-prop) |
| `http://localhost:3006/property/69c1d4bb5321fbfdc87676a9` | Load by WeOwn property ID |
| `http://localhost:3006/property_description/69c1d4bb5321fbfdc87676a9` | Same as main WeOwn frontend route |

## Environment

`.env.local`:

- `REACT_APP_WEOWN_API_URL` — WeOwn API (default: `https://api.weown.ai/`)
- `REACT_APP_VIDEO_PROP_API_URL` — Slug/property list API (default: email-backend)
- `REACT_APP_DEFAULT_PROPERTY_ID` — Fallback property when no URL param is set
