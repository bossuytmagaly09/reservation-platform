<template>
  <nav class="w-full bg-slate-900 border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">

    <!-- Linkerkant: Logo / Titel (alleen op grote schermen) -->
    <div class="hidden lg:flex items-center gap-2 text-slate-200 font-semibold text-lg">
      <i class="ph ph-globe-hemisphere-west text-xl text-cyan-400"></i>
      <span>Locaties</span>
    </div>

    <!-- Middensectie: iconen afhankelijk van schermgrootte -->
    <div class="flex items-center gap-4">

      <!-- Globe: altijd zichtbaar -->
      <button
          @click="toggleMenu"
          class="text-slate-200 hover:text-cyan-400 transition"
      >
        <i class="ph ph-globe-hemisphere-west text-2xl"></i>
      </button>

      <!-- Treasure Map: zichtbaar vanaf md -->
      <button
          class="hidden md:block text-slate-200 hover:text-cyan-400 transition"
      >
        <i class="ph ph-map-trifold text-2xl"></i>
      </button>

      <!-- Tekstlabels: alleen op grote schermen -->
      <div class="hidden lg:flex items-center gap-6 text-slate-300">
        <NuxtLink to="/reservations" class="hover:text-cyan-400 transition">Reservations</NuxtLink>
        <NuxtLink to="/resources" class="hover:text-cyan-400 transition">Resources</NuxtLink>
        <NuxtLink to="/test" class="hover:text-cyan-400 transition">test</NuxtLink>
      </div>
    </div>

    <!-- Dropdownmenu (alleen mobile) -->
    <transition name="fade">
      <div
          v-if="menuOpen"
          class="absolute top-14 right-4 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-3 flex flex-col gap-2 md:hidden"
      >
        <NuxtLink @click="closeMenu" to="/reservations" class="text-slate-200 hover:text-cyan-400">reservations</NuxtLink>
        <NuxtLink @click="closeMenu" to="/resources" class="text-slate-200 hover:text-cyan-400">resources</NuxtLink>
        <NuxtLink @click="closeMenu" to="/test" class="text-slate-200 hover:text-cyan-400">test</NuxtLink>
      </div>
    </transition>

  </nav>
</template>

<script setup>
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
