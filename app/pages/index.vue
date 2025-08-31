<script setup lang="ts">
// Get content from Nuxt Content
const { data: page } = await useAsyncData('home', () => $fetch('/api/content'))

// Extract hero and features from frontmatter
const hero = computed(() => (page.value as any)?.hero || {
  title: 'Nuxt4-Design-System',
  tagline: 'Build beautiful, accessible, and consistent UIs with DaisyUI and Tailwind CSS',
  actions: [
    { theme: 'brand', text: 'Get Started', link: '/docs/installation' },
    { theme: 'alt', text: 'View Components', link: '/docs/components' }
  ]
})

const features = computed(() => (page.value as any)?.features || [
  {
    icon: '🎨',
    title: 'DaisyUI Integration',
    details: 'Full DaisyUI 5.0.54 support with all components, variants, and themes'
  },
  {
    icon: '⚡',
    title: 'Nuxt 4 Optimized',
    details: 'Built specifically for Nuxt 4 with auto-imports, SSR support, and performance optimizations'
  },
  {
    icon: '🎯',
    title: 'TypeScript First',
    details: 'Complete TypeScript support with strict typing and runtime validation'
  },
  {
    icon: '♿',
    title: 'Accessibility Ready',
    details: 'WCAG 2.1 AA compliant components with proper ARIA attributes'
  },
  {
    icon: '🎪',
    title: 'Theme System',
    details: 'Dynamic theme switching with 30+ built-in DaisyUI themes'
  },
  {
    icon: '📦',
    title: 'Tree Shakeable',
    details: 'Optimized bundle size with tree shaking and code splitting'
  }
])

// Theme switching functionality
const currentTheme = ref('light')
const sampleThemes = ['light', 'dark', 'corporate', 'synthwave', 'retro', 'cyberpunk']

function setTheme(theme: string) {
  currentTheme.value = theme
  // In a real implementation, this would update the document theme
  if (process.client) {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

// Set initial theme
onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="hero min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div class="hero-content text-center">
        <div class="max-w-4xl">
          <div class="badge badge-primary mb-4">v1.0.0</div>
          <h1 class="text-5xl font-bold mb-8">
            <span class="text-primary">{{ hero.title }}</span>
          </h1>
          <p class="text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
            {{ hero.tagline }}
          </p>
          
          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 justify-center mb-12">
            <NuxtLink 
              v-for="action in hero.actions" 
              :key="action.text"
              :to="action.link"
              :class="[
                'btn',
                action.theme === 'brand' ? 'btn-primary' : 'btn-outline',
                'btn-lg'
              ]"
            >
              {{ action.text }}
            </NuxtLink>
          </div>
          
          <!-- Installation Code -->
          <div class="mockup-code bg-base-200 text-left max-w-md mx-auto">
            <pre data-prefix="$"><code>npm install @nuxt-design-system/core</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Why Choose Nuxt4-Design-System?</h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
            Built specifically for Nuxt 4 with DaisyUI integration, providing everything you need for modern web applications.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="card-body text-center">
              <div class="text-4xl mb-4">{{ feature.icon }}</div>
              <h3 class="card-title justify-center mb-2">{{ feature.title }}</h3>
              <p class="text-base-content/70">{{ feature.details }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section class="py-20 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Quick Start</h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
            Get up and running in minutes with our simple setup process.
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Installation Steps -->
          <div class="space-y-6">
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title text-primary">1. Installation</h3>
                <div class="mockup-code bg-base-300">
                  <pre data-prefix="$"><code>npm install @nuxt-design-system/core @nuxt-design-system/tokens</code></pre>
                </div>
              </div>
            </div>
            
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title text-secondary">2. Configuration</h3>
                <div class="mockup-code bg-base-300">
                  <pre data-prefix="//"><code>nuxt.config.ts</code></pre>
                  <pre data-prefix=""><code>export default defineNuxtConfig({</code></pre>
                  <pre data-prefix="  "><code>modules: ['@nuxt-design-system/core'],</code></pre>
                  <pre data-prefix="  "><code>designSystem: {</code></pre>
                  <pre data-prefix="    "><code>theme: 'light',</code></pre>
                  <pre data-prefix="    "><code>components: true,</code></pre>
                  <pre data-prefix="    "><code>prefix: 'DS'</code></pre>
                  <pre data-prefix="  "><code>}</code></pre>
                  <pre data-prefix="})"><code></code></pre>
                </div>
              </div>
            </div>
            
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title text-accent">3. Usage</h3>
                <div class="mockup-code bg-base-300">
                  <pre data-prefix="&lt;"><code>DSButtonPrimary variant="primary"&gt;</code></pre>
                  <pre data-prefix="  "><code>Click me</code></pre>
                  <pre data-prefix="&lt;/"><code>DSButtonPrimary&gt;</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Live Demo -->
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-center mb-6">Live Demo</h3>
              
              <div class="space-y-4">
                <!-- Button Demo -->
                <div class="flex flex-wrap gap-2">
                  <button class="btn btn-primary">Primary</button>
                  <button class="btn btn-secondary">Secondary</button>
                  <button class="btn btn-accent">Accent</button>
                  <button class="btn btn-ghost">Ghost</button>
                </div>
                
                <!-- Card Demo -->
                <div class="card bg-base-100 shadow">
                  <div class="card-body">
                    <h4 class="card-title">Sample Card</h4>
                    <p>This is a sample card component from our design system.</p>
                    <div class="card-actions justify-end">
                      <button class="btn btn-primary btn-sm">Action</button>
                    </div>
                  </div>
                </div>
                
                <!-- Alert Demo -->
                <div class="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>This is an info alert from our design system!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Component Categories Section -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Component Categories</h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
            Organized by functionality for easy discovery and implementation.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Actions -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-primary">Actions</h3>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <div class="badge badge-primary badge-sm">ButtonPrimary</div>
                  <span class="text-sm">Primary action buttons</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="badge badge-secondary badge-sm">DropdownMenu</div>
                  <span class="text-sm">Dropdown menus</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="badge badge-accent badge-sm">ModalDialog</div>
                  <span class="text-sm">Modal dialogs</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Data Display -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-secondary">Data Display</h3>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <div class="badge badge-primary badge-sm">AlertMessage</div>
                  <span class="text-sm">Status messages</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="badge badge-secondary badge-sm">CardContent</div>
                  <span class="text-sm">Content cards</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="badge badge-accent badge-sm">BadgeLabel</div>
                  <span class="text-sm">Status badges</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Data Input -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-accent">Data Input</h3>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <div class="badge badge-primary badge-sm">InputText</div>
                  <span class="text-sm">Text inputs</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="badge badge-secondary badge-sm">CheckboxInput</div>
                  <span class="text-sm">Checkbox inputs</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="badge badge-accent badge-sm">SelectDropdown</div>
                  <span class="text-sm">Dropdown selectors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Theme System Section -->
    <section class="py-20 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Theme System</h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
            Switch between 30+ beautiful DaisyUI themes with a single click.
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Theme Switcher -->
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title mb-6">Theme Switcher</h3>
              
              <div class="grid grid-cols-3 gap-2 mb-6">
                <button 
                  v-for="theme in sampleThemes" 
                  :key="theme"
                  class="btn btn-sm"
                  :class="currentTheme === theme ? 'btn-primary' : 'btn-outline'"
                  @click="setTheme(theme)"
                >
                  {{ theme }}
                </button>
              </div>
              
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Current theme: <strong>{{ currentTheme }}</strong></span>
              </div>
            </div>
          </div>
          
          <!-- Theme Preview -->
          <div class="space-y-4">
            <div class="card bg-base-200 shadow">
              <div class="card-body">
                <h4 class="card-title">Theme Preview</h4>
                <p>See how components look in the current theme.</p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <button class="btn btn-primary btn-sm">Primary</button>
                  <button class="btn btn-secondary btn-sm">Secondary</button>
                  <button class="btn btn-accent btn-sm">Accent</button>
                </div>
              </div>
            </div>
            
            <div class="stats shadow">
              <div class="stat">
                <div class="stat-title">Available Themes</div>
                <div class="stat-value text-primary">30+</div>
                <div class="stat-desc">DaisyUI themes included</div>
              </div>
              <div class="stat">
                <div class="stat-title">Custom Themes</div>
                <div class="stat-value text-secondary">∞</div>
                <div class="stat-desc">Create your own</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance Section -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Performance Optimized</h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
            Built with performance in mind, ensuring fast loading and smooth interactions.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="card bg-base-100 shadow-xl text-center">
            <div class="card-body">
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="card-title justify-center">Tree Shaking</h3>
              <p class="text-sm">Only import what you use</p>
            </div>
          </div>
          
          <div class="card bg-base-100 shadow-xl text-center">
            <div class="card-body">
              <div class="text-4xl mb-4">📦</div>
              <h3 class="card-title justify-center">Code Splitting</h3>
              <p class="text-sm">Automatic route-based splitting</p>
            </div>
          </div>
          
          <div class="card bg-base-100 shadow-xl text-center">
            <div class="card-body">
              <div class="text-4xl mb-4">🚀</div>
              <h3 class="card-title justify-center">Lazy Loading</h3>
              <p class="text-sm">Components loaded on demand</p>
            </div>
          </div>
          
          <div class="card bg-base-100 shadow-xl text-center">
            <div class="card-body">
              <div class="text-4xl mb-4">🎯</div>
              <h3 class="card-title justify-center">PurgeCSS</h3>
              <p class="text-sm">Unused CSS automatically removed</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary text-primary-content">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of developers building beautiful applications with Nuxt4-Design-System.
        </p>
        
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/docs/installation" class="btn btn-secondary btn-lg">
            Get Started
          </NuxtLink>
          <a href="https://github.com/your-org/nuxt4-design-system" class="btn btn-outline btn-lg">
            View on GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer footer-center p-10 bg-base-300 text-base-content">
      <div>
        <div class="text-2xl font-bold mb-2">Nuxt4-Design-System</div>
        <p class="text-sm opacity-70">
          Built with ❤️ for the Nuxt community
        </p>
        <p class="text-xs opacity-50 mt-2">
          MIT License - Open Source
        </p>
      </div>
      
      <div>
        <div class="grid grid-flow-col gap-4">
          <a href="https://github.com/your-org/nuxt4-design-system" class="link link-hover">GitHub</a>
          <a href="/docs" class="link link-hover">Documentation</a>
          <a href="/docs/contributing" class="link link-hover">Contributing</a>
          <a href="https://discord.gg/nuxt-design-system" class="link link-hover">Discord</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Custom styles for the landing page */
.hero {
  background: linear-gradient(135deg, hsl(var(--p) / 0.1) 0%, hsl(var(--s) / 0.05) 50%, hsl(var(--a) / 0.1) 100%);
}

/* Smooth transitions for theme switching */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Custom gradient text */
.text-gradient {
  background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--s)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
