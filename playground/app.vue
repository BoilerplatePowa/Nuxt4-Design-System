<template>
<NuxtLayout>
    <NuxtPage />
</NuxtLayout>
</template>

<script setup lang="ts">
// This is the main app entry point
// The layout and pages will handle the content
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--b2));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--p));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--pf));
}

/* Smooth transitions */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--s)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
