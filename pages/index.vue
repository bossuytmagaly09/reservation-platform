<script setup lang="ts">
useHead({
  title: 'Resources - App',
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-white">Resources</h1>
      <p class="text-slate-400 text-sm mt-1">Het kader hieronder is een tijdelijke placeholder ter illustratie.</p>
    </div>

    <!-- Empty State / Placeholder content -->
    <div class="border border-dashed border-slate-800 rounded-lg p-12 flex flex-col items-center justify-center text-slate-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256" class="mb-4 opacity-50">
        <path d="M224,176a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,176ZM104,80H40a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm112,0H136a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Zm-28.43,54.12L159.2,165.6a8,8,0,0,1-11.31-11.31l28.37-31.48a8,8,0,0,1,11.31,0l28.37,31.48a8,8,0,0,1-11.31,11.31Z"></path>
      </svg>
      <span>No resources found</span>
    </div>
  </div>
</template>