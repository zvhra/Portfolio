# Deployment Guide

## Option 1: Vercel (Recommended - Easiest for Next.js)

Vercel is made by the creators of Next.js and offers the best integration.

### Steps:

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain (Optional)**:
   - In your Vercel project dashboard, go to Settings → Domains
   - Add your custom domain

---

## Option 2: Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

---

## Option 3: Manual Build & Deploy

### Build for production:

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Test locally:

```bash
npm start
```

Visit `http://localhost:3000` to test the production build.

### Deploy to any hosting service:

- Upload the entire project folder
- Run `npm install --production`
- Run `npm run build`
- Run `npm start`

---

## Pre-Deployment Checklist

- [ ] Test the build locally: `npm run build && npm start`
- [ ] Check all links work correctly
- [ ] Verify images load properly
- [ ] Test light/dark mode toggle
- [ ] Test on mobile devices
- [ ] Ensure environment variables are set (if any)

---

## Environment Variables (if needed later)

If you add environment variables, set them in:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

---

## Quick Vercel CLI Deployment

You can also deploy via command line:

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy!

