# 📚 Storybook Deployment to GitHub Pages

This guide covers deploying your Storybook documentation to GitHub Pages.

## 🚀 Quick Start

### **Automatic Deployment (Recommended)**

Storybook is automatically deployed when you push to the `main` branch:

```bash
# Push to main branch
git push origin main
```

This triggers the GitHub Actions workflow that:

- ✅ Builds Storybook
- ✅ Deploys to GitHub Pages
- ✅ Creates preview links for PRs

### **Manual Deployment**

#### Using npm script:

```bash
npm run storybook:deploy
```

#### Using the custom script:

```bash
npm run storybook:deploy:script
```

## 🔧 Setup Requirements

### GitHub Repository Settings

1. **Enable GitHub Pages**:
    - Go to repository **Settings** → **Pages**
    - Source: **GitHub Actions**
    - Save settings

2. **Configure Pages Environment**:
    - The workflow automatically creates the `github-pages` environment
    - No additional configuration needed

### Required Permissions

The workflow requires these permissions (already configured):

- `contents: read`
- `pages: write`
- `id-token: write`

## 📋 Deployment Workflow

### Step 1: Build Storybook

```bash
# Test build locally
npm run storybook:build

# Verify output
ls -la storybook-static/
```

### Step 2: Deploy

```bash
# Deploy to GitHub Pages
npm run storybook:deploy
```

### Step 3: Verify Deployment

1. Go to repository **Actions** tab
2. Check "Deploy Storybook to GitHub Pages" workflow
3. Visit your GitHub Pages URL

## 🌐 Access Your Storybook

### Production URL

```
https://boilerplatepowa.github.io/Nuxt4-Design-System/
```

### PR Preview URLs

- Each PR gets a preview deployment
- URL is commented on the PR automatically
- Perfect for reviewing component changes

## 📊 What's Included

### **Component Documentation**

- All your component stories
- Interactive controls
- Documentation
- Accessibility testing

### **Features**

- ✅ Responsive design
- ✅ Dark/light theme support
- ✅ Search functionality
- ✅ Component isolation
- ✅ Addon support

## 🛠️ Configuration

### Storybook Configuration

Your Storybook is configured for GitHub Pages:

```typescript
// .storybook/main.ts
export default {
    // ... existing config
    outputDir: 'storybook-static',
    publicPath: '/Nuxt4-Design-System/',
}
```

### GitHub Pages Configuration

```yaml
# .github/workflows/storybook-deploy.yml
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
  with:
      path: storybook-static/
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Failed**

    ```bash
    # Check Storybook configuration
    npm run storybook:preview

    # Verify stories exist
    find stories -name "*.stories.ts"
    ```

2. **Deployment Failed**

    ```bash
    # Check GitHub Pages settings
    # Repository Settings → Pages → Source: GitHub Actions
    ```

3. **404 on GitHub Pages**
    ```bash
    # Check base path configuration
    # Ensure .nojekyll file exists
    ```

### Debug Commands

```bash
# Test Storybook locally
npm run storybook:preview

# Build and check output
npm run storybook:build
ls -la storybook-static/

# Test deployment locally
npm run storybook:deploy
```

## 📈 Monitoring

### GitHub Pages Analytics

1. **Repository Settings** → **Pages**
2. View deployment history
3. Check build logs

### Storybook Analytics

- **Page views**: GitHub Pages analytics
- **Component usage**: Storybook addon analytics
- **Performance**: Lighthouse scores

## 🎯 Best Practices

### Story Organization

```
stories/
├── Actions/
│   ├── Button.stories.ts
│   └── Dropdown.stories.ts
├── DataDisplay/
│   ├── Card.stories.ts
│   └── Table.stories.ts
└── DataInput/
    ├── Input.stories.ts
    └── Select.stories.ts
```

### Story Writing

```typescript
// Example: Button.stories.ts
export default {
    title: 'Actions/Button',
    component: ButtonPrimary,
    parameters: {
        docs: {
            description: {
                component: 'Primary button component with DaisyUI styling',
            },
        },
    },
}

export const Default = {
    args: {
        variant: 'primary',
        children: 'Click me',
    },
}
```

## 🔄 Workflow Triggers

### Automatic Triggers

- **Push to main**: Deploys to production
- **Pull Request**: Creates preview deployment
- **Manual**: Workflow dispatch

### Manual Triggers

```bash
# Trigger deployment manually
gh workflow run storybook-deploy.yml
```

## 📝 Customization

### Custom Domain

1. Add `CNAME` file to `storybook-static/`
2. Configure DNS records
3. Update GitHub Pages settings

### Custom Base Path

```typescript
// .storybook/main.ts
export default {
    // ... config
    publicPath: '/your-custom-path/',
}
```

## 🎉 Benefits

- **📚 Documentation**: Always up-to-date component docs
- **🔍 Preview**: See changes before merging
- **📱 Responsive**: Works on all devices
- **🔧 Interactive**: Test components in isolation
- **♿ Accessible**: Built-in accessibility testing
- **🎨 Themed**: Dark/light mode support

---

_Your Storybook is now automatically deployed to GitHub Pages with every push to main! 🚀_
