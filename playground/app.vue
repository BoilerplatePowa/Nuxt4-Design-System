<template>
  <div>
    Nuxt module playground!
    <BpTest/> 
    <BpButton
      variant="ghost"
      size="sm"
    > 
      Click me 
    </BpButton>
    <BpTestButton
      variant="error"
    > 
      Click me 
    </BpTestButton>
    <div class=" bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold underline text-gray-900 mb-4">
        Tailwind CSS v4.1 Test
      </h1>
      <p class="text-gray-600 mb-4">
        If you can see this styled content, Tailwind CSS v4.1 is working!
      </p>
      <button class="btn btn-secondary">
        Test Button
      </button>
    </div>
  </div>
  </div>
</template>

<script setup>
</script>
