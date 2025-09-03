<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4">Installation Guide</h1>
        <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
          Get started with Nuxt Design System in your project. Follow these steps to integrate our component library seamlessly.
        </p>
      </div>

      <!-- Prerequisites Section -->
      <section class="mb-16">
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">
              <BpIcon name="check-circle" class="w-6 h-6 text-success" />
              Prerequisites
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-bold mb-2">Required Dependencies</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <BpIcon name="check" class="w-4 h-4 text-success mr-2" />
                    Nuxt 4.0.3 or higher
                  </li>
                  <li class="flex items-center">
                    <BpIcon name="check" class="w-4 h-4 text-success mr-2" />
                    Node.js 18+ or 20+
                  </li>
                  <li class="flex items-center">
                    <BpIcon name="check" class="w-4 h-4 text-success mr-2" />
                    npm, yarn, or pnpm
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-2">Optional Dependencies</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <BpIcon name="info" class="w-4 h-4 text-info mr-2" />
                    TypeScript (recommended)
                  </li>
                  <li class="flex items-center">
                    <BpIcon name="info" class="w-4 h-4 text-info mr-2" />
                    TailwindCSS (included)
                  </li>
                  <li class="flex items-center">
                    <BpIcon name="info" class="w-4 h-4 text-info mr-2" />
                    DaisyUI (included)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Installation Steps -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Installation Steps</h2>
        
        <!-- Step 1: Install Package -->
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body">
            <div class="flex items-start gap-4">
              <div class="badge badge-primary badge-lg">1</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-3">Install the Package</h3>
                <p class="text-base-content/70 mb-4">
                  Install the Nuxt Design System package using your preferred package manager.
                </p>
                
                <div class="mockup-code text-left mb-4">
                  <pre data-prefix="$"><code>npm install @boilerplatepowa/nuxt4-design-system</code></pre>
                </div>
                
                <div class="mockup-code text-left mb-4">
                  <pre data-prefix="$"><code>yarn add @boilerplatepowa/nuxt4-design-system</code></pre>
                </div>
                
                <div class="mockup-code text-left">
                  <pre data-prefix="$"><code>pnpm add @boilerplatepowa/nuxt4-design-system</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Configure Nuxt -->
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body">
            <div class="flex items-start gap-4">
              <div class="badge badge-primary badge-lg">2</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-3">Configure Nuxt</h3>
                <p class="text-base-content/70 mb-4">
                  Add the module to your <code class="bg-base-300 px-2 py-1 rounded">nuxt.config.ts</code> file.
                </p>
                
                <div class="mockup-code text-left">
                  <pre data-prefix="//"><code>// nuxt.config.ts</code></pre>
                  <pre data-prefix="export"><code>export default defineNuxtConfig({</code></pre>
                  <pre data-prefix="  "><code>  modules: [</code></pre>
                  <pre data-prefix="    "><code>    '@boilerplatepowa/nuxt4-design-system'</code></pre>
                  <pre data-prefix="  "><code>  ],</code></pre>
                  <pre data-prefix="  "><code>  // Optional: Configure the module</code></pre>
                  <pre data-prefix="  "><code>  nuxtDesignSystem: {</code></pre>
                  <pre data-prefix="    "><code>    // Your configuration options</code></pre>
                  <pre data-prefix="  "><code>  }</code></pre>
                  <pre data-prefix="})"><code>})</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Start Using Components -->
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body">
            <div class="flex items-start gap-4">
              <div class="badge badge-primary badge-lg">3</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-3">Start Using Components</h3>
                <p class="text-base-content/70 mb-4">
                  Components are auto-imported and ready to use in your Vue templates.
                </p>
                
                <div class="mockup-code text-left">
                  <pre data-prefix="<"><code>&lt;template&gt;</code></pre>
                  <pre data-prefix="  "><code>  &lt;div&gt;</code></pre>
                  <pre data-prefix="    "><code>    &lt;BpButton color="primary"&gt;</code></pre>
                  <pre data-prefix="      "><code>      Click me!</code></pre>
                  <pre data-prefix="    "><code>    &lt;/BpButton&gt;</code></pre>
                  <pre data-prefix>    <code>    &lt;Icon name="heart" /&gt;</code></pre>
                  <pre data-prefix="  "><code>  &lt;/div&gt;</code></pre>
                  <pre data-prefix="&lt;/"><code>&lt;/template&gt;</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Configuration Options -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Configuration Options</h2>
        
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>prefix</code></td>
                    <td><code>string</code></td>
                    <td><code>'Bp'</code></td>
                    <td>Component prefix for auto-imports</td>
                  </tr>
                  <tr>
                    <td><code>theme</code></td>
                    <td><code>string</code></td>
                    <td><code>'light'</code></td>
                    <td>Default DaisyUI theme</td>
                  </tr>
                  <tr>
                    <td><code>components</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable component auto-imports</td>
                  </tr>
                  <tr>
                    <td><code>icons</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable icon auto-imports</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Advanced Configuration -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Advanced Configuration</h2>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Custom Theme Configuration -->
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">
                <BpIcon name="settings" class="w-5 h-5" />
                Custom Theme Setup
              </h3>
              <p class="mb-4">Configure custom DaisyUI themes and color schemes.</p>
              
              <div class="mockup-code text-left">
                <pre data-prefix="//"><code>// nuxt.config.ts</code></pre>
                <pre data-prefix="export"><code>export default defineNuxtConfig({</code></pre>
                <pre data-prefix="  "><code>  nuxtDesignSystem: {</code></pre>
                <pre data-prefix="    "><code>    theme: 'corporate',</code></pre>
                <pre data-prefix="    "><code>    themes: ['light', 'dark', 'corporate']</code></pre>
                <pre data-prefix="  "><code>  }</code></pre>
                <pre data-prefix="})"><code>})</code></pre>
              </div>
            </div>
          </div>

          <!-- Component Customization -->
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">
                <BpIcon name="settings" class="w-5 h-5" />
                Component Customization
              </h3>
              <p class="mb-4">Override default component configurations and add custom variants.</p>
              
              <div class="mockup-code text-left">
                <pre data-prefix="//"><code>// nuxt.config.ts</code></pre>
                <pre data-prefix="export"><code>export default defineNuxtConfig({</code></pre>
                <pre data-prefix="  "><code>  nuxtDesignSystem: {</code></pre>
                <pre data-prefix="    "><code>    components: {</code></pre>
                <pre data-prefix="      "><code>      prefix: 'DS',</code></pre>
                <pre data-prefix="      "><code>      global: true</code></pre>
                <pre data-prefix="    "><code>  }</code></pre>
                <pre data-prefix="})"><code>})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Troubleshooting -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Troubleshooting</h2>
        
        <div class="space-y-6">
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">
                <BpIcon name="alert-triangle" class="w-5 h-5 text-warning" />
                Common Issues
              </h3>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-bold text-warning">Components not auto-imported?</h4>
                  <p class="text-sm text-base-content/70 mb-2">
                    Make sure the module is properly added to your <code class="bg-base-300 px-1 rounded">nuxt.config.ts</code> and restart your dev server.
                  </p>
                </div>
                
                <div>
                  <h4 class="font-bold text-warning">Styling not working?</h4>
                  <p class="text-sm text-base-content/70 mb-2">
                    Ensure TailwindCSS and DaisyUI are properly configured. The module should handle this automatically.
                  </p>
                </div>
                
                <div>
                  <h4 class="font-bold text-warning">TypeScript errors?</h4>
                  <p class="text-sm text-base-content/70 mb-2">
                    Check that your <code class="bg-base-300 px-1 rounded">tsconfig.json</code> includes the module types.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Next Steps -->
      <section class="mb-16">
        <div class="card bg-primary text-primary-content shadow-xl">
          <div class="card-body text-center">
            <h2 class="card-title text-2xl justify-center mb-4">
              <BpIcon name="arrow-right" class="w-6 h-6" />
              Ready to Get Started?
            </h2>
            <p class="mb-6">
              Now that you have the module installed, explore our components and start building amazing interfaces!
            </p>
            <div class="card-actions justify-center">
              <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                <BpIcon name="eye" class="w-5 h-5 mr-2" />
                Browse Components
              </NuxtLink>
              <NuxtLink to="/examples" class="btn btn-outline btn-lg">
                <BpIcon name="file" class="w-5 h-5 mr-2" />
                View Examples
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page metadata
definePageMeta({
  title: 'Installation',
  description: 'Complete installation guide for Nuxt Design System - step by step setup instructions'
})

// Theme management
function setTheme(theme: string) {
  if (process.client) {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('@nuxt-design-system/theme', theme)
  }
}

// Initialize theme on mount
onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
    setTheme(savedTheme)
  }
})
</script>
