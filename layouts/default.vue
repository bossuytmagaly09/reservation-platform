<template>
  <NavBar />
  <div class="min-h-screen bg-slate-950 text-slate-300 font-sans antialiased selection:bg-teal-500 selection:text-white">

    <!--
  Main Layout Container
  - bg-slate-950: Matches the deep dark background from the screenshot
  - text-slate-300: Default text color for good contrast
  - min-h-screen: Ensures full height
-->
    <main class="container mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
<script setup>

</script>

