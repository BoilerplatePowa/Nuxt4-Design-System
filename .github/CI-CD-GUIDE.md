# 🚀 CI/CD Pipeline Guide

This guide explains how to use the automated CI/CD pipeline for publishing the Nuxt Design System to GitHub Packages.

## 📋 Overview

Your project uses a **modular workflow structure** with three dedicated workflows:

1. **Quality Gates** - Code quality validation
2. **Testing Suite** - Comprehensive testing
3. **Release & Publishing** - Package deployment to GitHub Packages

All workflows run automatically on push/PR, with publishing triggered only by version tags.

---

## 🔄 Workflows

### 1️⃣ **Quality Gates** (`quality-gates.yml`)

**Triggers:** Push to main/develop, Pull requests

**Purpose:** Validate code quality and security

**Jobs:**

- **Lint & Format**
    - ESLint validation
    - TypeScript type checking (module only)
    - Prettier format verification

- **Security Scan**
    - npm security audit
    - Snyk vulnerability scanning

- **Bundle Analysis**
    - Package build
    - Bundle size validation (<250KB)
    - Artifact upload for review

**Duration:** ~3-4 minutes

---

### 2️⃣ **Testing Suite** (`testing.yml`)

**Triggers:** Push to main/develop, Pull requests

**Purpose:** Comprehensive testing across multiple scenarios

**Jobs:**

- **Unit Tests**
    - Component tests with Vitest
    - Coverage reporting
    - Codecov integration

- **Integration Tests**
    - Playground build verification
    - Module integration testing

- **Component Tests**
    - Storybook build validation
    - Component story verification

- **Performance Tests**
    - Lighthouse CI checks
    - Bundle performance validation

**Duration:** ~4-6 minutes

---

### 3️⃣ **Release & Publishing** (`release.yml`)

**Triggers:** Version tags (v\*), Manual workflow dispatch

**Purpose:** Publish package to GitHub Packages and create releases

**Jobs:**

- **Validate Release**
    - Run all tests
    - Build module
    - Validate package structure

- **Publish to GitHub Packages**
    - Build production package
    - Publish to npm.pkg.github.com
    - Uses `GITHUB_TOKEN` automatically

- **Create GitHub Release**
    - Generate changelog
    - Create release notes
    - Publish release on GitHub

**Duration:** ~5-8 minutes

---

## 📦 Publishing a New Version

### Simple Publishing Flow:

```bash
# 1. Update version (creates commit & tag)
npm version patch  # or minor, major

# 2. Push changes and tags
git push origin main --tags
```

### What Happens Automatically:

1. **Quality Gates** run on push to main
2. **Testing Suite** runs in parallel
3. **Release workflow** triggers on tag detection
4. Package is validated and built
5. **Published to GitHub Packages** 🚀
6. **GitHub Release created** with notes

**Total Duration:** ~8-12 minutes (workflows run in parallel)

---

## 🎯 Workflow Triggers Summary

| Event                | Quality Gates | Testing | Release |
| -------------------- | ------------- | ------- | ------- |
| Push to main/develop | ✅            | ✅      | ❌      |
| Pull Request         | ✅            | ✅      | ❌      |
| Tag push (v\*)       | ❌            | ❌      | ✅      |
| Manual dispatch      | ❌            | ❌      | ✅      |

---

## 🔐 Security & Permissions

### Required Permissions

The release workflow uses `GITHUB_TOKEN` with:

- `contents: write` - For creating releases
- `packages: write` - For publishing packages (set in repo settings)

### Enable GitHub Packages

1. Go to repository **Settings**
2. Navigate to **Actions** → **General**
3. Under "Workflow permissions", select **Read and write permissions**
4. Save changes

---

## 📊 Quality Standards

### Bundle Size Limits

- **Maximum:** 250KB
- **Warning:** 200KB
- **Optimal:** <200KB

### Test Coverage

- **Target:** 80%+
- **Minimum:** 70%

### Node.js Support

- **Primary:** 22.x
- **Testing:** Node 22 only (currently)

---

## 🛠️ Troubleshooting

### Publishing Fails

**Symptom:** Release workflow fails at publish step

**Solutions:**

1. Check package.json `publishConfig`:

    ```json
    {
        "publishConfig": {
            "registry": "https://npm.pkg.github.com",
            "access": "public"
        }
    }
    ```

2. Verify tag format: `v1.0.0` (must start with 'v')

3. Check repository permissions:
    - Settings → Actions → Workflow permissions
    - Enable "Read and write permissions"

4. Ensure package name matches scope:
    ```json
    {
        "name": "@boilerplatepowa/nuxt4-design-system"
    }
    ```

### Tests Fail in CI

**Symptom:** Tests pass locally but fail in CI

**Solutions:**

```bash
# Match CI Node version
nvm use 22

# Clean install
rm -rf node_modules package-lock.json
npm install

# Run tests
npm run test
```

### Bundle Size Exceeded

**Symptom:** Quality gates fail on bundle analysis

**Solutions:**

```bash
# Analyze bundle
npm run build:analyze

# Check current size
npm run bundle:size

# Common fixes:
# - Use dynamic imports for heavy components
# - Remove unused dependencies
# - Optimize assets
```

---

## 📈 Best Practices

### Before Publishing

1. **Test locally:**

    ```bash
    npm run test
    npm run lint
    npm run test:types:module
    npm run build
    ```

2. **Check bundle size:**

    ```bash
    npm run bundle:size
    ```

3. **Verify package:**
    ```bash
    npm pack --dry-run
    ```

### Version Conventions

| Type  | Command             | Use Case         | Example       |
| ----- | ------------------- | ---------------- | ------------- |
| Patch | `npm version patch` | Bug fixes        | 1.0.0 → 1.0.1 |
| Minor | `npm version minor` | New features     | 1.0.0 → 1.1.0 |
| Major | `npm version major` | Breaking changes | 1.0.0 → 2.0.0 |

### Commit Messages

Use conventional commits for better changelogs:

- `fix:` - Bug fixes (triggers patch)
- `feat:` - New features (triggers minor)
- `feat!:` - Breaking changes (triggers major)
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates

---

## 🔄 Workflow Dependencies

```
Push/PR to main
    ├── Quality Gates (parallel)
    │   ├── Lint & Format
    │   ├── Security Scan
    │   └── Bundle Analysis
    │
    └── Testing Suite (parallel)
        ├── Unit Tests
        ├── Integration Tests
        ├── Component Tests
        └── Performance Tests

Tag push (v*)
    └── Release
        ├── Validate (runs tests + build)
        ├── Publish to GitHub Packages
        └── Create GitHub Release
```

---

## 📦 Installing Published Package

### Public Installation

```bash
# Configure npm for GitHub Packages
echo "@boilerplatepowa:registry=https://npm.pkg.github.com" >> .npmrc

# Install package
npm install @boilerplatepowa/nuxt4-design-system
```

### Private Repository Access

```bash
# Create .npmrc with authentication
echo "@boilerplatepowa:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc

# Install package
npm install @boilerplatepowa/nuxt4-design-system
```

---

## 🎓 Advanced Usage

### Manual Release Trigger

You can trigger a release manually from GitHub:

1. Go to **Actions** tab
2. Click **Publish to GitHub Packages**
3. Click **Run workflow**
4. Enter version number (e.g., 1.0.0)
5. Click **Run workflow**

### Monitoring Workflows

**GitHub Actions:**

```
https://github.com/BoilerplatePowa/Nuxt4-Design-System/actions
```

**Published Packages:**

```
https://github.com/BoilerplatePowa/Nuxt4-Design-System/packages
```

**Releases:**

```
https://github.com/BoilerplatePowa/Nuxt4-Design-System/releases
```

---

## 📞 Support

For CI/CD issues:

1. **Check workflow logs:** Actions tab → Failed run → Job logs
2. **Review this guide:** Common solutions above
3. **Check package settings:** Verify publishConfig in package.json
4. **Open issue:** Include workflow run ID and error logs

---

## 🎉 Quick Start Checklist

Before your first release:

- [ ] Verify `publishConfig` in package.json
- [ ] Enable workflow write permissions in repo settings
- [ ] Test workflows with a dry run: `npm pack --dry-run`
- [ ] Create test tag: `git tag v0.0.1-test && git push origin --tags`
- [ ] Monitor workflow execution
- [ ] Verify package appears in Packages tab
- [ ] Test installation in separate project

---

_This guide reflects your modular workflow structure: quality-gates.yml, testing.yml, and release.yml_
