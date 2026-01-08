<script setup lang="ts">
useHead({
  title: 'Reservations - App',
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-white">Reservations</h1>
      <p class="text-slate-400 text-sm mt-1">De cards hieronder zijn tijdelijke placeholders.</p>
    </div>

    <!-- Empty State / Placeholder content -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Dummy Card 1 -->
      <div class="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
        <div class="h-4 w-24 bg-slate-800 rounded mb-4"></div>
        <div class="h-8 w-full bg-slate-800/50 rounded mb-2"></div>
        <div class="h-8 w-2/3 bg-slate-800/50 rounded"></div>
      </div>

      <!-- Dummy Card 2 -->
      <div class="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
        <div class="h-4 w-24 bg-slate-800 rounded mb-4"></div>
        <div class="h-8 w-full bg-slate-800/50 rounded mb-2"></div>
        <div class="h-8 w-2/3 bg-slate-800/50 rounded"></div>
      </div>
    </div>
  </div>
</template>