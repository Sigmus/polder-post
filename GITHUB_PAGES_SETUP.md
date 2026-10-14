# GitHub Pages Deployment Instructions

## Current Status

✅ **Complete:**
- All 30 articles translated to English
- Site configured for static export (`output: 'export'`)
- GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- `.nojekyll` file created for GitHub Pages
- Code committed and pushed to Origin

❌ **Blocked (requires user action):**
- Creating public GitHub repository (no GitHub authentication in agent environment)
- Pushing to GitHub
- Enabling GitHub Pages

---

## Steps to Deploy to GitHub Pages

### 1. Create Public GitHub Repository

On GitHub.com, create a new **public** repository named `polder-post` (or your preferred name).

**Important:** Do NOT initialize with README, .gitignore, or license (the repo should be empty).

### 2. Add GitHub as Remote and Push

```bash
# Navigate to your workspace (if not already there)
cd /workspace

# Add GitHub as a remote (replace YOUR_USERNAME with your GitHub username)
git remote add github https://github.com/YOUR_USERNAME/polder-post.git

# Push all code to GitHub
git push github main

# Push git submodule configuration
git push github --tags
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Click **Save**

### 4. Wait for Deployment

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the static site with `npm run build`
- Deploy to GitHub Pages

Check the **Actions** tab to monitor progress.

### 5. Access Your Live Site

Once deployed, your site will be available at:

```
https://YOUR_USERNAME.github.io/polder-post/
```

---

## Configuration Notes

### basePath

The workflow is configured with `NEXT_PUBLIC_BASE_PATH: /polder-post` because GitHub Pages serves repos at `username.github.io/repo-name/`.

**If you name your repo differently**, update line 37 in `.github/workflows/deploy.yml`:

```yaml
NEXT_PUBLIC_BASE_PATH: /your-repo-name
```

**For a custom domain** or if using `username.github.io` repo (no subdirectory), change to:

```yaml
NEXT_PUBLIC_BASE_PATH: ""
```

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `/workspace/public/` with your domain:
   ```
   news.yourdomain.com
   ```

2. In GitHub Settings → Pages → Custom domain, enter your domain

3. Update `NEXT_PUBLIC_BASE_PATH` in the workflow to `""`

---

## Troubleshooting

### Build Fails

- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify `next.config.ts` has `output: 'export'`

### Site Shows 404

- Verify basePath matches your repo name
- Check that `.nojekyll` file exists in `public/`
- Wait 2-5 minutes after deploy completes

### Images/Styles Missing

- Confirm `.nojekyll` was committed
- Check basePath configuration
- Verify `images: { unoptimized: true }` in `next.config.ts`

---

## What's Already Set Up

✅ Static export configuration in `next.config.ts`
✅ GitHub Actions workflow in `.github/workflows/deploy.yml`
✅ `.nojekyll` file to prevent Jekyll processing
✅ All 30 articles translated to English
✅ Search functionality (client-side, works with static export)
✅ Responsive design with light/dark modes

---

## Alternative: Deploy to Other Platforms

If you prefer not to use GitHub Pages, you can also deploy to:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag `out/` folder to Netlify drop
- **Cloudflare Pages**: Connect GitHub repo
- **Any static host**: Upload `out/` folder after `npm run build`
