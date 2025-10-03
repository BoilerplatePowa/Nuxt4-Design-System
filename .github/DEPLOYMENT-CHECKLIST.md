# ✅ Deployment Checklist

Use this checklist before deploying a new version to GitHub Packages.

## 🔍 Pre-Deployment

### Code Quality

- [ ] All code is committed and pushed
- [ ] No uncommitted changes in working directory
- [ ] All tests pass locally (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run test:types:module`)
- [ ] Code is formatted (`npm run format:check`)

### Dependencies

- [ ] All dependencies are up to date
- [ ] No critical security vulnerabilities (`npm run security:audit`)
- [ ] Package-lock.json is committed
- [ ] No unused dependencies

### Build

- [ ] Package builds successfully (`npm run build`)
- [ ] Bundle size is within limits (`npm run bundle:size`)
- [ ] No build warnings
- [ ] All exports are properly defined

### Documentation

- [ ] README is updated
- [ ] CHANGELOG is updated
- [ ] API documentation is current
- [ ] Storybook stories are updated
- [ ] Migration guide updated (if breaking changes)

---

## 📦 Version Update

### Choose Version Type

- [ ] **Patch** (bug fixes, no breaking changes): `npm version patch`
- [ ] **Minor** (new features, backward compatible): `npm version minor`
- [ ] **Major** (breaking changes): `npm version major`

### Update Version

```bash
# Run the appropriate command
npm version [patch|minor|major] -m "chore: release v%s"
```

This will:

- Update version in package.json
- Create a git commit
- Create a git tag

---

## 🧪 Pre-Release Testing

### Local Testing

- [ ] Build package: `npm run build`
- [ ] Run full test suite: `npm run test:ci`
- [ ] Check bundle size: `npm run bundle:size`
- [ ] Test package locally:
    ```bash
    npm pack
    # Install in test project:
    # npm install /path/to/nuxt4-design-system-1.0.0.tgz
    ```

### Integration Testing

- [ ] Test in playground: `npm run dev`
- [ ] Test all components work
- [ ] Test theme switching
- [ ] Test in production mode: `npm run dev:build`

---

## 🚀 Deployment

### Push to GitHub

```bash
# Push commits
git push origin main

# Push tags (this triggers deployment)
git push origin --tags
```

### Monitor Deployment

- [ ] Go to GitHub Actions tab
- [ ] Find "CI/CD Pipeline" workflow
- [ ] Watch workflow progress
- [ ] Verify all jobs succeed:
    - [ ] Quality Gates
    - [ ] Test Suite
    - [ ] Build Package
    - [ ] Publish to GitHub Packages

### Expected Duration

- Total time: ~5-10 minutes
- Quality Gates: ~2 minutes
- Tests: ~3 minutes
- Build: ~1 minute
- Publish: ~2 minutes

---

## ✅ Post-Deployment Verification

### Verify Publication

- [ ] Check GitHub Packages tab
- [ ] Verify package version is listed
- [ ] Check package details page
- [ ] Verify package is public/accessible

### Verify Release

- [ ] Check Releases tab
- [ ] Verify release notes are generated
- [ ] Verify tag is listed
- [ ] Check release assets

### Test Installation

```bash
# Create test directory
mkdir test-install
cd test-install
npm init -y

# Configure for GitHub Packages
echo "@boilerplatepowa:registry=https://npm.pkg.github.com" > .npmrc

# Install package
npm install @boilerplatepowa/nuxt4-design-system@latest

# Verify installation
npm list @boilerplatepowa/nuxt4-design-system
```

### Test Usage

- [ ] Create test Nuxt project
- [ ] Install package
- [ ] Import and use components
- [ ] Verify all features work
- [ ] Check for console errors

---

## 📢 Communication

### Update Documentation

- [ ] Update main README if needed
- [ ] Update migration guide (if breaking changes)
- [ ] Update API documentation
- [ ] Deploy Storybook: `npm run storybook:deploy`

### Announcements

- [ ] Write release announcement
- [ ] Update project Discord/Slack (if applicable)
- [ ] Tweet/social media (if applicable)
- [ ] Notify team members

### GitHub

- [ ] Close related issues
- [ ] Update project board
- [ ] Add labels to release

---

## 🐛 Rollback Plan (If Needed)

If deployment fails or has critical issues:

### Immediate Actions

1. **Deprecate problematic version**:

    ```bash
    npm deprecate @boilerplatepowa/nuxt4-design-system@x.y.z "Critical bug - use x.y.w instead"
    ```

2. **Fix issue**:
    - Identify and fix the problem
    - Test thoroughly
    - Prepare patch version

3. **Deploy fix**:
    ```bash
    npm version patch -m "fix: critical issue in x.y.z"
    git push origin main --tags
    ```

### Communication

- [ ] Notify users of issue
- [ ] Explain fix timeline
- [ ] Document in release notes

---

## 📊 Success Criteria

Deployment is successful when:

- ✅ All CI/CD jobs pass
- ✅ Package is published to GitHub Packages
- ✅ GitHub Release is created
- ✅ Package can be installed
- ✅ All features work in test project
- ✅ No critical errors in console
- ✅ Bundle size is acceptable
- ✅ Documentation is updated

---

## 🎉 Deployment Complete!

After successful deployment:

1. **Monitor**:
    - Watch for issues in first 24 hours
    - Check error tracking (if configured)
    - Monitor package downloads

2. **Document**:
    - Add entry to CHANGELOG
    - Update version history
    - Document any issues encountered

3. **Celebrate**:
    - Share success with team
    - Thank contributors
    - Plan next release

---

## 📝 Notes

### First Deployment

If this is your first deployment:

- [ ] Verify GitHub Packages is enabled in repo settings
- [ ] Check package visibility settings
- [ ] Test authentication with personal token
- [ ] Read [CI/CD Guide](CI-CD-GUIDE.md) thoroughly

### Regular Deployments

- [ ] Review previous deployment notes
- [ ] Check for breaking changes in dependencies
- [ ] Update this checklist if needed

---

## 🔗 Resources

- **[CI/CD Guide](CI-CD-GUIDE.md)**: Complete workflow documentation
- **[Publishing Guide](../README-PUBLISHING.md)**: Publishing instructions
- **[Workflows Reference](WORKFLOWS-REFERENCE.md)**: Quick reference

---

_Last updated: 2025-01-XX_
_Next review: After each deployment_
