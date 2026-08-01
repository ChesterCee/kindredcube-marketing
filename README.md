# Kindred Cube website

A dependency-free responsive landing page and download page.

## Preview locally

From this folder, run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Configure downloads

Edit `assets/download-config.js`. Leave `googlePlayUrl` empty to serve
`downloads/kindredcube.apk`, or add the live Google Play URL to redirect there.
Replace `appleAppStoreUrl` with the official App Store listing before launch.
