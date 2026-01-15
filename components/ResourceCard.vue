<template>
  <!-- Hoofdcontainer van de kaart -->
  <div
      class="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer p-6"
  >
    <!-- Achtergrond glow effect bij hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />

    <!-- Content wrapper -->
    <div class="relative z-10">
      <!-- Top section: Icon + Naam + Badge -->
      <div class="flex items-start gap-4 mb-4">
        <!-- Linkerzijde: pictogram -->
        <div
            class="icon-wrapper text-cyan-400 w-14 h-14 flex items-center justify-center bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/40 transition-all duration-300 flex-shrink-0"
            v-html="icon"
        />

        <!-- Rechterzijde: Naam + Type Badge -->
        <div class="flex-grow">
          <div class="flex items-center justify-between gap-2 mb-1">
            <!-- Naam van de resource -->
            <h3 class="text-slate-100 font-bold text-lg truncate group-hover:text-white transition-colors duration-300">
              {{ name }}
            </h3>
          </div>

          <!-- Type badge -->
          <span
              class="inline-block text-[11px] px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider font-semibold group-hover:bg-cyan-500/25 group-hover:text-cyan-200 transition-all duration-300"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <!-- Beschrijving -->
      <p class="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2 group-hover:text-slate-200 transition-colors duration-300">
        {{ description }}
      </p>

      <!-- Bottom section: Reservatie-info + Kalender knop -->
      <div class="flex items-center gap-3 pt-3 border-t border-slate-700/40">
        <div class="flex items-center gap-2 text-sm text-slate-400 group-hover:text-cyan-300 transition-colors duration-300">
          <!-- Kalendericoon -->
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V76H48V48ZM48,208V100H208v108Z"></path>
          </svg>

          <!-- Aantal reservaties -->
          <span class="font-medium">
            {{ reservation_count }} {{ reservation_count === 1 ? 'reservatie' : 'reservaties' }}
          </span>
        </div>

        <!-- Status indicator + Kalender knop -->
        <div class="ml-auto flex items-center gap-2">
          <!-- Status indicator -->
          <span v-if="reservation_count > 0" class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/15 text-green-300 border border-green-500/30">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Beschikbaar
          </span>
          <span v-else class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
            <span class="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
            Vrij
          </span>

          <!-- Kalender knop -->
          <button
              @click="openCalendarForResource"
              class="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-cyan-200 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 font-semibold text-xs uppercase tracking-wide transition-all duration-300"
              title="Toon reservaties voor deze resource"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,80a48,48,0,1,0,48,48A48,48,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm96-48A112,112,0,1,1,112,16a112,112,0,0,1,112,112ZM224,128a96,96,0,1,0-96,96A96,96,0,0,0,224,128Z"></path>
            </svg>
            Kalender
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

/**
 * Props worden meegegeven door de oudercomponent.
 * Ze bevatten de data van één resource-item.
 */
const props = defineProps({
  id: [Number, String],           // Unieke ID van de resource
  name: String,                   // Naam van de resource
  type: String,                   // Type (bv. ruimte, materiaal)
  description: String,           // Korte beschrijving
  icon: String,                   // URL naar afbeelding of pictogram
  reservation_count: Number      // Aantal reservaties
})

// Emit voor parent component
const emit = defineEmits(['openCalendar'])

// Kalender openen voor deze resource
const openCalendarForResource = () => {
  emit('openCalendar', {
    resourceId: props.id,
    resourceName: props.name
  })
}
</script>

<style scoped>
/* Fade-in en stijgende animatie bij laden */
div {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Icon hover animatie */
.icon-wrapper {
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
