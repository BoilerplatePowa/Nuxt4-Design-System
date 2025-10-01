# Deployment Guide

This guide covers various deployment options for the Nuxt Design System documentation website.

## 🚀 Quick Deploy Options

### 1. Netlify (Recommended)

**Pros**: Free tier, automatic deployments, form handling, edge functions
**Best for**: Documentation sites, static hosting

#### Setup Steps

1. **Push to GitHub**

    ```bash
    git add .
    git commit -m "feat: add documentation website"
    git push origin main
    ```

2. **Connect to Netlify**
    - Go to [netlify.com](https://netlify.com)
    - Click "New site from Git"
    - Connect your GitHub account
    - Select the repository
    - Configure build settings:
        - **Build command**: `cd playground && npm run generate`
        - **Publish directory**: `playground/.output/public`
        - **Node version**: `18` (or higher)

3. **Environment Variables** (Optional)

    ```bash
    NODE_VERSION=18
    NPM_VERSION=9
    ```

4. **Custom Domain** (Optional)
    - Go to Site settings > Domain management
    - Add custom domain
    - Configure DNS records

#### Netlify Configuration File

Create `playground/netlify.toml`:

```toml
[build]
  base = "playground"
  command = "npm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true

[build.processing.images]
  compress = true
```

### 2. Vercel

**Pros**: Excellent performance, automatic deployments, serverless functions
**Best for**: Next.js/Nuxt projects, dynamic content

#### Setup Steps

1. **Install Vercel CLI**

    ```bash
    npm i -g vercel
    ```

2. **Deploy**

    ```bash
    cd playground
    vercel
    ```

3. **Configure Build**
    - **Framework Preset**: Nuxt.js
    - **Build Command**: `npm run generate`
    - **Output Directory**: `.output/public`
    - **Install Command**: `npm install`

#### Vercel Configuration File

Create `playground/vercel.json`:

```json
{
    "framework": "nuxt",
    "buildCommand": "npm run generate",
    "outputDirectory": ".output/public",
    "installCommand": "npm install",
    "devCommand": "npm run dev",
    "functions": {
        "app/api/**/*.ts": {
            "runtime": "nodejs18.x"
        }
    },
    "headers": [
        {
            "source": "/(.*)",
            "headers": [
                {
                    "key": "X-Content-Type-Options",
                    "value": "nosniff"
                },
                {
                    "key": "X-Frame-Options",
                    "value": "DENY"
                },
                {
                    "key": "X-XSS-Protection",
                    "value": "1; mode=block"
                }
            ]
        }
    ]
}
```

### 3. GitHub Pages

**Pros**: Free, integrated with GitHub, automatic deployments
**Best for**: Open source projects, documentation

#### Setup Steps

1. **Create GitHub Action**

Create `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy Documentation

on:
    push:
        branches: [main]
        paths: ['playground/**']
    pull_request:
        branches: [main]
        paths: ['playground/**']

jobs:
    build-and-deploy:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v4

            - name: Setup Node.js
              uses: actions/setup-node@v4
              with:
                  node-version: '18'
                  cache: 'npm'

            - name: Install dependencies
              run: |
                  npm ci
                  cd playground && npm ci

            - name: Build documentation
              run: |
                  cd playground
                  npm run generate

            - name: Deploy to GitHub Pages
              uses: peaceiris/actions-gh-pages@v3
              if: github.ref == 'refs/heads/main'
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./playground/.output/public
                  cname: your-domain.com # Optional: custom domain
```

2. **Enable GitHub Pages**
    - Go to repository Settings > Pages
    - Source: Deploy from a branch
    - Branch: `gh-pages`
    - Folder: `/ (root)`

3. **Configure Custom Domain** (Optional)
    - Add custom domain in Pages settings
    - Create `CNAME` file in `playground/public/`:
        ```
        your-domain.com
        ```

### 4. AWS S3 + CloudFront

**Pros**: Scalable, cost-effective, global CDN
**Best for**: Enterprise, high-traffic sites

#### Setup Steps

1. **Create S3 Bucket**

    ```bash
    aws s3 mb s3://your-docs-bucket-name
    aws s3 website s3://your-docs-bucket-name --index-document index.html --error-document error.html
    ```

2. **Configure Bucket Policy**

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::your-docs-bucket-name/*"
            }
        ]
    }
    ```

3. **Deploy**

    ```bash
    cd playground
    npm run generate
    aws s3 sync .output/public s3://your-docs-bucket-name --delete
    ```

4. **Setup CloudFront** (Optional)
    - Create CloudFront distribution
    - Origin: S3 bucket
    - Behaviors: Cache based on selected request headers
    - Custom error responses for SPA routing

## 🔧 Build Configuration

### Static Generation (Recommended)

```typescript
// playground/nuxt.config.ts
export default defineNuxtConfig({
    modules: ['../src/module'],
    nuxtDesignSystem: {},
    devtools: { enabled: true },

    // Static generation
    ssr: false,
    nitro: {
        prerender: {
            routes: ['/'],
        },
    },
})
```

### Server-Side Rendering

```typescript
// playground/nuxt.config.ts
export default defineNuxtConfig({
    modules: ['../src/module'],
    nuxtDesignSystem: {},
    devtools: { enabled: true },

    // SSR
    ssr: true,
    nitro: {
        preset: 'node-server',
    },
})
```

## 🌐 Domain & SSL Configuration

### Custom Domain Setup

1. **DNS Configuration**

    ```
    Type: CNAME
    Name: docs (or @ for root domain)
    Value: your-deployment-url.com
    TTL: 3600
    ```

2. **SSL Certificate**
    - **Netlify**: Automatic SSL
    - **Vercel**: Automatic SSL
    - **GitHub Pages**: Automatic SSL
    - **AWS**: Use ACM for CloudFront

### Subdomain Examples

```
docs.yourcompany.com
design-system.yourcompany.com
ui.yourcompany.com
```

## 📱 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
cd playground
npm run build
npm run analyze  # If available

# Optimize images
npm install -g imagemin-cli
imagemin playground/public/images/* --out-dir=playground/public/images/
```

### CDN Configuration

```typescript
// playground/nuxt.config.ts
export default defineNuxtConfig({
    // ... other config

    app: {
        baseURL: process.env.NODE_ENV === 'production' ? 'https://your-cdn.com' : '/',
    },

    nitro: {
        storage: {
            redis: {
                driver: 'redis',
                url: process.env.REDIS_URL,
            },
        },
    },
})
```

## 🔒 Security Headers

### Security Configuration

```typescript
// playground/nuxt.config.ts
export default defineNuxtConfig({
    // ... other config

    nitro: {
        routeRules: {
            '/**': {
                headers: {
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
                },
            },
        },
    },
})
```

### Content Security Policy

```typescript
// playground/nuxt.config.ts
export default defineNuxtConfig({
    // ... other config

    nitro: {
        routeRules: {
            '/**': {
                headers: {
                    'Content-Security-Policy': [
                        "default-src 'self'",
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                        "style-src 'self' 'unsafe-inline'",
                        "img-src 'self' data: https:",
                        "font-src 'self'",
                        "connect-src 'self'",
                        "media-src 'self'",
                        "object-src 'none'",
                        "base-uri 'self'",
                        "form-action 'self'",
                    ].join('; '),
                },
            },
        },
    },
})
```

## 📊 Monitoring & Analytics

### Google Analytics

```typescript
// playground/nuxt.config.ts
export default defineNuxtConfig({
    // ... other config

    app: {
        head: {
            script: [
                {
                    src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
                    async: true,
                },
            ],
        },
    },
})
```

### Performance Monitoring

```typescript
// playground/plugins/performance.client.ts
export default defineNuxtPlugin({
    name: 'performance-monitoring',
    setup() {
        if (process.client) {
            // Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log('[Performance]', entry.name, entry.startTime)
                })
            })

            observer.observe({
                entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
            })
        }
    },
})
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**

    ```bash
    # Clear cache
    rm -rf playground/.nuxt playground/.output playground/node_modules
    npm install
    npm run generate
    ```

2. **Routing Issues**
    - Ensure SPA fallback is configured
    - Check for 404 redirects
    - Verify base URL configuration

3. **Performance Issues**
    - Enable gzip compression
    - Use CDN for static assets
    - Implement lazy loading
    - Optimize images

### Debug Commands

```bash
# Development
cd playground
npm run dev

# Build analysis
npm run build
npm run analyze

# Production preview
npm run preview

# Type checking
npm run type-check
```

## 📈 Deployment Checklist

- [ ] **Pre-deployment**
    - [ ] All tests passing
    - [ ] Build successful locally
    - [ ] Environment variables configured
    - [ ] Domain DNS configured

- [ ] **Deployment**
    - [ ] Build command executed
    - [ ] Assets uploaded to hosting
    - [ ] SSL certificate active
    - [ ] Custom domain working

- [ ] **Post-deployment**
    - [ ] Site accessible
    - [ ] All routes working
    - [ ] Performance acceptable
    - [ ] Analytics tracking
    - [ ] Error monitoring active

## 🔄 Continuous Deployment

### GitHub Actions Workflow

```yaml
name: Deploy Documentation

on:
    push:
        branches: [main, develop]
    pull_request:
        branches: [main]

jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: '18'
                  cache: 'npm'
            - run: npm ci
            - run: npm run test
            - run: cd playground && npm ci
            - run: cd playground && npm run build

    deploy:
        needs: test
        runs-on: ubuntu-latest
        if: github.ref == 'refs/heads/main'
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: '18'
                  cache: 'npm'
            - run: npm ci
            - run: cd playground && npm ci
            - run: cd playground && npm run generate
            - name: Deploy to hosting
              # Add your deployment step here
```

---

_This deployment guide covers the most common deployment scenarios. For specific hosting providers or custom requirements, refer to their official documentation._
