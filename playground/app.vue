<template>
  <div class="p-8 space-y-8">
    <h1 class="text-4xl font-bold text-center mb-8">Nuxt Design System - Button Component Demo</h1>
    
    <!-- New btnMap-based Button Component -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">New btnMap-based Button Component</h2>
      
      <!-- Color Variants -->
      <div>
        <h3 class="text-lg font-medium mb-3">Color Variants (btnColorMap)</h3>
        <div class="flex flex-wrap gap-2">
          <BpButton color="primary">Primary</BpButton>
          <BpButton color="secondary">Secondary</BpButton>
          <BpButton color="accent">Accent</BpButton>
          <BpButton color="neutral">Neutral</BpButton>
          <BpButton color="info">Info</BpButton>
          <BpButton color="success">Success</BpButton>
          <BpButton color="warning">Warning</BpButton>
          <BpButton color="error">Error</BpButton>
        </div>
      </div>
      
      <!-- Style Variants -->
      <div>
        <h3 class="text-lg font-medium mb-3">Style Variants (btnStyleMap)</h3>
        <div class="flex flex-wrap gap-2">
          <BpButton style="outline">Outline</BpButton>
          <BpButton style="dash">Dash</BpButton>
          <BpButton style="soft">Soft</BpButton>
          <BpButton style="ghost">Ghost</BpButton>
          <BpButton style="link">Link</BpButton>
        </div>
      </div>
      
      <!-- Combined Color + Style -->
      <div>
        <h3 class="text-lg font-medium mb-3">Combined Color + Style</h3>
        <div class="flex flex-wrap gap-2">
          <BpButton color="primary" style="outline">Primary Outline</BpButton>
          <BpButton color="secondary" style="ghost">Secondary Ghost</BpButton>
          <BpButton color="accent" style="soft">Accent Soft</BpButton>
          <BpButton color="success" style="link">Success Link</BpButton>
        </div>
      </div>
      
      <!-- Size Variants -->
      <div>
        <h3 class="text-lg font-medium mb-3">Size Variants (btnSizeMap)</h3>
        <div class="flex flex-wrap gap-2 items-center">
          <BpButton size="xs">XS</BpButton>
          <BpButton size="sm">SM</BpButton>
          <BpButton size="md">MD</BpButton>
          <BpButton size="lg">LG</BpButton>
          <BpButton size="xl">XL</BpButton>
        </div>
      </div>
      
      <!-- Modifiers -->
      <div>
        <h3 class="text-lg font-medium mb-3">Modifiers (btnModifierMap)</h3>
        <div class="flex flex-wrap gap-2">
          <BpButton wide>Wide Button</BpButton>
          <BpButton block>Block Button</BpButton>
          <BpButton square>Square</BpButton>
          <BpButton circle>Circle</BpButton>
        </div>
      </div>
      
      <!-- States -->
      <div>
        <h3 class="text-lg font-medium mb-3">States</h3>
        <div class="flex flex-wrap gap-2">
          <BpButton loading>Loading</BpButton>
          <BpButton disabled>Disabled</BpButton>
          <BpButton active>Active</BpButton>
          <BpButton glass>Glass</BpButton>
        </div>
      </div>
      
      <!-- With Icons -->
      <div>
        <h3 class="text-lg font-medium mb-3">With Icons</h3>
        <div class="flex flex-wrap gap-2">
          <BpButton iconLeft="heart">Like</BpButton>
          <BpButton iconRight="arrow-right">Continue</BpButton>
          <BpButton iconLeft="download" iconRight="external-link">Download</BpButton>
          <BpButton circle iconLeft="settings" />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
// The Button component is auto-imported as BpButton
</script>
