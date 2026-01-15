<script setup>
import { ref, onMounted } from 'vue'

// Dark mode state
const isDark = ref(false)

// Load saved preference
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

// Toggle theme
const toggleTheme = () => {
  isDark.value = !isDark.value

  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <nav class="w-full border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
    <div class="container mx-auto px-6 h-16 flex items-center justify-between">

      <!-- Left: Navigation Links -->
      <div class="flex items-center gap-2">

        <NuxtLink
            to="/resources"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            active-class="bg-slate-800 text-white shadow-sm"
        >
          Resources
        </NuxtLink>

        <NuxtLink
            to="/reservations"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            active-class="bg-slate-800 text-white shadow-sm"
        >
          Reservations
        </NuxtLink>

       <NuxtLink
            to="/kalender"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            active-class="bg-slate-800 text-white shadow-sm"
        >
          Kalender
        </NuxtLink>


      </div>

      <!-- Right: Theme Toggle -->
      <div class="flex items-center gap-4">
        <button
            @click="toggleTheme"
            class="relative w-11 h-6 bg-slate-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span
              class="absolute top-1 w-4 h-4 bg-teal-400 rounded-full shadow-sm transition-all"
              :class="isDark ? 'left-1' : 'right-1'"
          ></span>
        </button>
      </div>

    </div>
  </nav>
</template>





