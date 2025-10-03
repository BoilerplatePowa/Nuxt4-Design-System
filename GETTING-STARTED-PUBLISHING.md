# 🚀 Getting Started with Publishing

Quick guide to start publishing your Nuxt4-Design-System to GitHub Packages.

## ✅ What's Ready

Your CI/CD pipeline is already set up with:

- ✅ Quality gates (linting, type checking, formatting, security)
- ✅ Comprehensive testing (unit, integration, component, performance)
- ✅ Automated publishing to GitHub Packages
- ✅ GitHub Release creation
- ✅ Storybook documentation deployment

**You're ready to publish!**

---

## 🔧 One-Time Setup (Required)

### Enable Workflow Permissions

**This is the only setup step needed!**

1. Go to your repository on GitHub
2. Click **Settings**
3. Navigate to **Actions** → **General**
4. Scroll down to **Workflow permissions**
5. Select **Read and write permissions**
6. ✅ Check **Allow GitHub Actions to create and approve pull requests**
7. Click **Save**

**That's it!** Your workflows now have permission to publish packages and create releases.

---

## 📦 Publishing Your First Version

### Quick Start (3 steps):

```bash
# 1. Update version
npm version patch

# 2. Push to trigger publishing
git push origin main --tags

# 3. Watch the magic happen!
# Go to: https://github.com/BoilerplatePowa/Nuxt4-Design-System/actions
```

### What Happens Automatically:

1. **Validation** (~3 min)
   - Runs all tests
   - Builds module
   - Validates package

2. **Publishing** (~2 min)
   - Publishes to GitHub Packages
   - Makes package available for installation

3. **Release** (~1 min)
   - Creates GitHub Release
   - Generates changelog
   - Publishes release notes

**Total time:** ~6 minutes

---

## 📊 Monitoring Your Deployment

### While Publishing:

1. **Actions Tab**
   ```
   https://github.com/BoilerplatePowa/Nuxt4-Design-System/actions
   ```
   Watch "Publish to GitHub Packages" workflow

2. **Check Progress**
   - Validate Release ✅
   - Publish to GitHub Packages ✅
   - Create GitHub Release ✅

### After Publishing:

1. **Packages Tab**
   ```
   https://github.com/BoilerplatePowa/Nuxt4-Design-System/packages
   ```
   Your package will appear here

2. **Releases Tab**
   ```
   https://github.com/BoilerplatePowa/Nuxt4-Design-System/releases
   ```
   Release notes with changelog

---

## 🎯 Version Types

Choose the right version update:

| Command | When to Use | Example |
|---------|-------------|---------|
| `npm version patch` | Bug fixes, small changes | 1.0.0 → 1.0.1 |
| `npm version minor` | New features, backward compatible | 1.0.0 → 1.1.0 |
| `npm version major` | Breaking changes | 1.0.0 → 2.0.0 |

### Examples:

```bash
# Bug fix
npm version patch -m "fix: correct button styling"

# New feature
npm version minor -m "feat: add new dropdown component"

# Breaking change
npm version major -m "feat!: redesign component API"
```

---

## 🧪 Test Before Publishing

**Always test locally first:**

```bash
# Run all quality checks
npm run test            # Unit tests
npm run lint            # Code linting
npm run test:types:module  # Type checking
npm run build           # Build module
npm run bundle:size     # Check bundle size

# Or run everything at once
npm run test && npm run lint && npm run test:types:module && npm run build
```

**All green?** You're ready to publish! ✅

---

## 📥 Installing Your Published Package

Once published, anyone can install your package:

### Public Installation

```bash
# Configure npm for GitHub Packages
echo "@boilerplatepowa:registry=https://npm.pkg.github.com" >> .npmrc

# Install package
npm install @boilerplatepowa/nuxt4-design-system
```

### In Nuxt Project

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system']
})
```

---

## 🐛 Troubleshooting

### Publishing Fails

**Error:** "Permission denied" or "403 Forbidden"

**Solution:** Enable workflow permissions (see Setup section above)

---

**Error:** "Package already exists"

**Solution:** Increment version number:
```bash
npm version patch
git push origin main --tags
```

---

**Error:** "Tests failed"

**Solution:** Fix tests locally:
```bash
npm run test
# Fix any failures
npm run test
```

---

### Tag Format Wrong

**Must start with 'v':**

```bash
git tag v1.0.0  # ✅ Correct
git tag 1.0.0   # ❌ Wrong (workflow won't trigger)
```

If you tagged without 'v':
```bash
git tag -d 1.0.0           # Delete wrong tag
git tag v1.0.0             # Create correct tag
git push origin v1.0.0     # Push correct tag
```

---

## 📚 Complete Documentation

For detailed information, see:

- **[CI/CD Guide](.github/CI-CD-GUIDE.md)** - Complete workflow docs
- **[Workflows Reference](.github/WORKFLOWS-REFERENCE.md)** - Quick reference
- **[Deployment Checklist](.github/DEPLOYMENT-CHECKLIST.md)** - Pre/post deployment
- **[Implementation Summary](CI-CD-IMPLEMENTATION.md)** - What was done

---

## 🎉 You're All Set!

Your publishing workflow is:

- ✅ Fully automated
- ✅ Quality-assured (all tests run before publishing)
- ✅ Secure (uses GitHub's built-in authentication)
- ✅ Documented (complete guides available)

### Ready to Publish?

```bash
npm version patch
git push origin main --tags
```

**Watch your first deployment in the Actions tab!** 🚀

---

## 💡 Tips

1. **Test locally first** - Always run tests before publishing
2. **Use semantic versioning** - Patch for fixes, minor for features, major for breaking changes
3. **Write good commit messages** - They become your changelog
4. **Monitor the first deployment** - Watch Actions tab to ensure everything works
5. **Test installation** - Try installing your package in a test project

---

## 📞 Need Help?

- **Check workflow logs**: Actions tab → Failed run → Job logs
- **Review documentation**: `.github/CI-CD-GUIDE.md`
- **Common issues**: See Troubleshooting section above
- **Open issue**: Include workflow run ID and error message

---

_You're ready to start publishing to GitHub Packages!_ 🎉

