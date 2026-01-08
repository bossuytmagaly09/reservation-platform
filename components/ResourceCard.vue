<template>
  <!-- Hoofdcontainer van de kaart -->
  <div
      class="flex items-center gap-4 bg-slate-800 rounded-xl border border-slate-700/60 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-4"
  >
    <!-- Linkerzijde: pictogram of afbeelding -->
    <!-- Injecteer SVG en geef wit mee via CSS -->
    <div
        class="icon-wrapper text-white w-16 h-16 flex items-center justify-center bg-slate-700/40 rounded-md"
        v-html="icon"
    />


    <!-- Rechterzijde: inhoud van de kaart -->
    <div class="flex flex-col justify-between w-full space-y-2">

      <!-- Titel en type badge -->
      <div class="flex justify-between items-center">
        <!-- Naam van de resource -->
        <h3 class="text-slate-100 font-semibold text-base truncate">
          {{ name }}
        </h3>

        <!-- Type badge (bv. 'ruimte', 'materiaal') -->
        <span
            class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-600/10 text-cyan-400
                 border border-cyan-500/30 uppercase tracking-wide font-medium"
        >
          {{ type }}
        </span>
      </div>

      <!-- Beschrijving van de resource -->
      <p class="text-sm text-slate-400 leading-snug line-clamp-2">
        {{ description }}
      </p>

      <!-- Reservatie-info -->
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <!-- Kalendericoon -->
        <i class="ph ph-calendar text-cyan-400"></i>

        <!-- Aantal reservaties -->
        <span>
          {{ reservation_count }} reservatie{{ reservation_count === 1 ? '' : 's' }}
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * Props worden meegegeven door de oudercomponent.
 * Ze bevatten de data van één resource-item.
 */
defineProps({
  id: [Number, String],           // Unieke ID van de resource
  name: String,                   // Naam van de resource
  type: String,                   // Type (bv. ruimte, materiaal)
  description: String,           // Korte beschrijving
  icon: String,                   // URL naar afbeelding of pictogram
  reservation_count: Number      // Aantal reservaties
})
</script>

<style scoped>
/* Fade-in animatie bij laden van de kaart */
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
