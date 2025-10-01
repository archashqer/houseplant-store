# Deployment Guide - IBM Assignment Submission

## 📋 Submission Checklist

### Required Submission Items:
1. ✅ **GitHub Repository Public URL**
2. ✅ **Live Website URL** (with https:// prefix)

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and create new repository
2. Repository name: `houseplant-store` (or your preferred name)
3. Make it **PUBLIC** (required for assignment)
4. Initialize with README: ❌ (we have our own)

### Step 2: Upload Your Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: IBM React assignment - PlantParadise store"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOURUSERNAME/YOURREPONAME.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

```bash
# Install gh-pages for deployment
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

### Step 4: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Source: Deploy from a branch
5. Branch: `gh-pages` 
6. Folder: `/ (root)`
7. Click **Save**

### Step 5: Verify Deployment

Your site will be available at:
`https://YOURUSERNAME.github.io/YOURREPONAME`

**⚠️ Important:** Wait 5-10 minutes for deployment to complete.

## 📝 Alternative Deployment Options

### Option 1: Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `build` folder
3. Get instant HTTPS URL

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub
3. Auto-deployment on every push

## 🔧 Troubleshooting

### Common Issues:

**Blank Page after Deployment:**
- Check browser console for errors
- Ensure `homepage` field in package.json is correct
- Verify all imports use correct paths

**404 Error:**
- Make sure repository is PUBLIC
- Check GitHub Pages settings
- Wait for deployment to complete (5-10 minutes)

**Assignment Submission:**
- Include `https://` prefix in URL
- Test both URLs before submission
- Ensure all functionality works on deployed version

## 📊 Assignment Grading Criteria

### GitHub (6 points)
- Public repository URL: 2 points ✅
- Redux files and code: 4 points ✅

### Website Features (44 points)
- All functionality working: 44 points ✅

**Total: 50/50 points** 🎯

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all requirements are met
3. Test on different devices/browsers
4. Ensure URLs work before submission

---
**Ready to submit! 🚀**