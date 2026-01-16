<template>
  <div class="min-h-screen font-sans antialiased selection:bg-teal-500 selection:text-white transition-colors duration-300
              bg-slate-50 text-slate-900
              dark:bg-slate-950 dark:text-slate-300">

    <NavBar />

    <main class="container mx-auto px-6 py-8">
      <slot />
    </main>

  </div>
</template>

<script setup>
// Geen extra script nodig, de classes doen het werk via Tailwind
</script>