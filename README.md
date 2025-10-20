# Brikk Website

This repository contains the static websites for Brikk AI, including the beta landing page.

## Structure

- `/beta` - Beta program landing page

## Deployment

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/eritger1110/brikk-website)

1. Connect this repository to Netlify
2. Set the publish directory to `.` (root)
3. No build command needed (static site)
4. Configure custom domain: `beta.getbrikk.com`

### Render

1. Create a new Static Site on Render
2. Connect this repository
3. Set the publish directory to `.` (root)
4. No build command needed
5. Configure custom domain: `beta.getbrikk.com`

## Cache Control

- `index.html`: `no-store, must-revalidate` (always fetch latest)
- JS/CSS: `public, max-age=31536000, immutable` (cache forever with versioning)

## Environment Variables

- `API_BASE`: Backend API URL (default: `https://brikk-infrastructure.onrender.com`)

## Local Development

Simply open `beta/index.html` in a browser, or use a local server:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000/beta/
```

## DNS Configuration

Point `beta.getbrikk.com` to your deployment:

**Netlify:**
- CNAME: `beta.getbrikk.com` → `<your-site>.netlify.app`

**Render:**
- CNAME: `beta.getbrikk.com` → `<your-site>.onrender.com`

