<template>
  <!--
    Outer Wrapper:
    - w-full: Forces full width
    - border-b: The border runs edge-to-edge here
    - bg-slate-950: Background color
  -->
  <nav class="w-full border-b border-slate-800 bg-slate-950 sticky top-0 z-50">

    <!--
      Inner Container:
      - container mx-auto: Keeps the buttons aligned with your page content
      - px-6: Adds side padding matching your page layout
      - h-16: Fixed height for consistency
    -->
    <div class="container mx-auto px-6 h-16 flex items-center justify-between">

      <!-- Left: Navigation Links -->
      <div class="flex items-center gap-2">
        <NuxtLink
            to="/"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            active-class="bg-slate-800 text-white shadow-sm"
            class-active="text-slate-400 hover:text-slate-200"
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
      </div>

      <!-- Right: Theme Toggle -->
      <div class="flex items-center gap-4">

        <button class="relative w-11 h-6 bg-slate-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900">
          <span class="absolute right-1 top-1 w-4 h-4 bg-teal-400 rounded-full shadow-sm"></span>
        </button>
      </div>

    </div>
  </nav>
</template>



<!--<template>-->
<!--  <nav class="w-full bg-slate-900 border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">-->

<!--    &lt;!&ndash; Linkerkant: Logo / Titel (alleen op grote schermen) &ndash;&gt;-->
<!--    <div class="hidden lg:flex items-center gap-2 text-slate-200 font-semibold text-lg">-->
<!--      <i class="ph ph-globe-hemisphere-west text-xl text-cyan-400"></i>-->
<!--      <span>Locaties</span>-->
<!--    </div>-->

<!--    &lt;!&ndash; Middensectie: iconen afhankelijk van schermgrootte &ndash;&gt;-->
<!--    <div class="flex items-center gap-4">-->

<!--      &lt;!&ndash; Globe: altijd zichtbaar &ndash;&gt;-->
<!--      <button-->
<!--          @click="toggleMenu"-->
<!--          class="text-slate-200 hover:text-cyan-400 transition"-->
<!--      >-->
<!--        <i class="ph ph-globe-hemisphere-west text-2xl"></i>-->
<!--      </button>-->

<!--      &lt;!&ndash; Treasure Map: zichtbaar vanaf md &ndash;&gt;-->
<!--      <button-->
<!--          class="hidden md:block text-slate-200 hover:text-cyan-400 transition"-->
<!--      >-->
<!--        <i class="ph ph-map-trifold text-2xl"></i>-->
<!--      </button>-->

<!--      &lt;!&ndash; Tekstlabels: alleen op grote schermen &ndash;&gt;-->
<!--      <div class="hidden lg:flex items-center gap-6 text-slate-300">-->
<!--        <NuxtLink to="/reservations" class="hover:text-cyan-400 transition">Reservations</NuxtLink>-->
<!--        <NuxtLink to="/resources" class="hover:text-cyan-400 transition">Resources</NuxtLink>-->
<!--        <NuxtLink to="/test" class="hover:text-cyan-400 transition">test</NuxtLink>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Dropdownmenu (alleen mobile) &ndash;&gt;-->
<!--    <transition name="fade">-->
<!--      <div-->
<!--          v-if="menuOpen"-->
<!--          class="absolute top-14 right-4 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-3 flex flex-col gap-2 md:hidden"-->
<!--      >-->
<!--        <NuxtLink @click="closeMenu" to="/reservations" class="text-slate-200 hover:text-cyan-400">reservations</NuxtLink>-->
<!--        <NuxtLink @click="closeMenu" to="/resources" class="text-slate-200 hover:text-cyan-400">resources</NuxtLink>-->
<!--        <NuxtLink @click="closeMenu" to="/test" class="text-slate-200 hover:text-cyan-400">test</NuxtLink>-->
<!--      </div>-->
<!--    </transition>-->

<!--  </nav>-->
<!--</template>-->

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
