<script setup lang="ts">
// No logic changes needed
</script>

<template>
  <nav class="w-full border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
    <div class="container mx-auto px-6 h-16 flex items-center justify-between">

      <!-- Left: Navigation Links -->
      <div class="flex items-center gap-2">

        <NuxtLink
            to="/"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            active-class="bg-slate-800 text-white shadow-sm"
        >
          Resources
        </NuxtLink>

        <!-- Reservations Link  -->
        <NuxtLink
            to="/reservations"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            active-class="bg-slate-800 text-white shadow-sm"
        >
          Reservations
        </NuxtLink>
      </div>

      <!-- Right: Theme Toggle -->
      <button class="relative w-11 h-6 bg-slate-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900">
        <span class="absolute right-1 top-1 w-4 h-4 bg-teal-400 rounded-full shadow-sm"></span>
      </button>


    </div>
  </nav>
</template>