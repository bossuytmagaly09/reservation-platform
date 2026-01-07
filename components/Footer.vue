<template>
  <!--
    FOOTER WRAPPER
    - bg-gradient-to-r: zelfde stijl als de hero, maar subtieler
    - from/to: gebruikt jullie kleurvariabelen
    - text-white: consistent met de hero
    - backdrop-blur-sm: glaseffect
    - py-6: mooie verticale spacing
  -->
  <footer
      class="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
           text-white backdrop-blur-sm py-6 mt-auto shadow-inner"
  >
    <div class="max-w-4xl mx-auto px-6 text-center">

      <!-- COPYRIGHT -->
      <p class="text-sm md:text-base font-light tracking-wide"
         style="font-family: var(--font-base);">
        &copy; 2026 — Made with 💚 by
        <span class="underline decoration-2 decoration-white/50">
          Nikita, Magaly & Friedel
        </span>
      </p>

    </div>
  </footer>
</template>

<script setup>
// Geen script nodig — dit is een puur presentational component
</script>

<style scoped>
/* Subtiele fade-in animatie voor consistentie */
footer {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
