# 📦 Publishing to GitHub Packages

This guide covers how to publish the Nuxt Design System to GitHub Packages registry.

## 🚀 Quick Start

### 1. **Automatic Publishing (Recommended)**

Publishing is automated when you create a Git tag:

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

This will trigger the GitHub Actions workflow that:

- ✅ Runs all tests
- ✅ Builds the package
- ✅ Publishes to GitHub Packages
- ✅ Creates a GitHub release

### 2. **Manual Publishing**

#### Using npm script:

```bash
npm run publish:github
```

#### Using the custom script:

```bash
npm run publish:github:script
```

## 🔧 Setup Requirements

### GitHub Repository Settings

1. **Enable GitHub Packages** in your repository settings
2. **Set package visibility** to your preference (public/private)

### Required Secrets

The workflow uses the built-in `GITHUB_TOKEN` (no additional setup needed).

### Package Configuration

The package is already configured for GitHub Packages:

```json
{
  "name": "@boilerplatepowa/nuxt4-design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

## 📋 Publishing Workflow

### Step 1: Prepare Release

```bash
# Update version in package.json
npm version patch  # or minor, major

# Or manually edit package.json
# "version": "1.0.1"
```

### Step 2: Create Release

```bash
# Create and push tag
git add .
git commit -m "chore: release v1.0.1"
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

### Step 3: Monitor Publishing

1. Go to **Actions** tab in GitHub
2. Watch the "Publish to GitHub Packages" workflow
3. Check the **Packages** tab for your published package

## 📦 Installing the Package

### For Public Packages

```bash
npm install @boilerplatepowa/nuxt4-design-system
```

### For Private Packages

```bash
# Configure npm for GitHub Packages
echo "@boilerplatepowa:registry=https://npm.pkg.github.com" >> .npmrc

# Install with authentication
npm install @boilerplatepowa/nuxt4-design-system
```

## 🔍 Package Information

- **Registry**: GitHub Packages (`npm.pkg.github.com`)
- **Scope**: `@boilerplatepowa`
- **Package Name**: `@boilerplatepowa/nuxt4-design-system`
- **Visibility**: Configurable (public/private)

## 🛠️ Troubleshooting

### Common Issues

1. **Authentication Failed**

   ```bash
   # Ensure GITHUB_TOKEN is available in workflow
   # Check repository secrets
   ```

2. **Package Already Exists**

   ```bash
   # Update version in package.json
   npm version patch
   ```

3. **Build Failed**
   ```bash
   # Run locally first
   npm run test:ci
   npm run build
   ```

### Debug Commands

```bash
# Test package locally
npm pack

# Check package contents
tar -tf nuxt4-design-system-1.0.0.tgz

# Validate package.json
npm publish --dry-run
```

## 📊 Package Analytics

View package statistics at:

- **GitHub**: Repository → Packages tab
- **Downloads**: Package page → Download statistics
- **Versions**: Package page → Version history

## 🔄 Version Management

### Semantic Versioning

- **Patch** (`1.0.1`): Bug fixes
- **Minor** (`1.1.0`): New features
- **Major** (`2.0.0`): Breaking changes

### Version Commands

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major
```

## 📝 Release Notes

The automated release includes:

- ✅ All quality gates passed
- ✅ Package published to GitHub Packages
- ✅ Automated changelog generation

## 🎯 Best Practices

1. **Always test locally** before tagging
2. **Use semantic versioning** for releases
3. **Write meaningful commit messages**
4. **Monitor package downloads** and feedback
5. **Keep documentation updated**

---

_This publishing setup is optimized for GitHub Packages and provides a streamlined workflow for your Nuxt Design System._
