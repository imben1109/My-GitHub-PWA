# My GitHub PWA

A [Progressive Web App](https://web.dev/progressive-web-apps/) hosted on [GitHub Pages](https://pages.github.com/) with continuous deployment powered by [GitHub Actions](https://github.com/features/actions).

## Features

- **Installable** – add to your home screen on any device
- **Offline Ready** – service worker caches all static assets
- **Fast** – cached assets load instantly on repeat visits
- **Auto Deploy** – every push to `main` deploys automatically to GitHub Pages

## Live Demo

The app is automatically deployed to GitHub Pages at:

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://imben1109.github.io/My-GitHub-PWA/)

```
https://imben1109.github.io/My-GitHub-PWA/
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CD workflow
├── css/
│   └── style.css           # App styles
├── js/
│   └── app.js              # App logic & SW registration
├── icons/
│   ├── icon-192.png        # PWA icon (192×192)
│   └── icon-512.png        # PWA icon (512×512)
├── index.html              # Main HTML entry point
├── manifest.json           # Web App Manifest
└── service-worker.js       # Service Worker (caching & offline)
```

## Continuous Deployment

The workflow file at `.github/workflows/deploy.yml` runs on every push to the `main` branch:

1. Checks out the repository
2. Configures GitHub Pages
3. Uploads the site as a Pages artifact
4. Deploys to GitHub Pages

### Enable GitHub Pages

1. Go to **Settings → Pages** in your repository
2. Under **Source**, select **GitHub Actions**
3. Push a commit to `main` – the workflow will deploy automatically

## Local Development

No build step required. Just open `index.html` in your browser, or serve it locally:

```bash
npx serve .
```
