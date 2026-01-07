<template>
  <!--
    HEADER / NAVBAR
    - Sticky bovenaan
    - Gradient in dezelfde stijl als de hero/footer
    - Subtiele shadow voor diepte
  -->
  <header
      class="w-full sticky top-0 z-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
           text-white shadow-md backdrop-blur-sm"
  >
    <nav class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- LOGO / TITLE -->
      <div class="flex items-center gap-2">
        <!-- Kleine cirkel als “logo” -->
        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
          R
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-lg font-semibold" style="font-family: var(--font-title);">
            Reservations App
          </span>
          <span class="text-xs text-white/70" style="font-family: var(--font-base);">
            Nuxt 4 · Supabase · Team NM&F
          </span>
        </div>
      </div>

      <!-- NAV LINKS -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium"
           style="font-family: var(--font-base);">
        <NuxtLink
            to="/app"
            class="hover:text-[var(--color-bg)] transition"
        >
          Home
        </NuxtLink>
        <NuxtLink
            to="/reservations"
            class="hover:text-[var(--color-bg)] transition"
        >
          Reservaties
        </NuxtLink>
        <NuxtLink
            to="/profile"
            class="hover:text-[var(--color-bg)] transition"
        >
          Profiel
        </NuxtLink>
        <NuxtLink
            to="/settings"
            class="hover:text-[var(--color-bg)] transition"
        >
          Instellingen
        </NuxtLink>
      </div>

      <!-- MOBILE PLACEHOLDER (optioneel later uitwerken) -->
      <div class="md:hidden text-xs text-white/70">
        Menu
      </div>
    </nav>
  </header>
</template>

<script setup>
// Geen script nodig voorlopig – puur presentational component
</script>

<style scoped>
/* Subtiele fade-in van de header */
header {
  animation: fadeDown 0.4s ease-out;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
