<template>
  <!-- Kaart container met hover effects -->
  <div
      class="group relative overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 shadow-md hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <!-- Achtergrond glow effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />

    <!-- Content -->
    <div class="relative z-10 flex items-center justify-between px-5 py-4">
      
      <!-- Linkerzijde: Nummering -->
      <div class="flex items-center gap-4">
        <div
            class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg border border-cyan-500/30 text-cyan-300 font-bold text-sm group-hover:from-cyan-500/30 group-hover:to-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300"
        >
          {{ index }}
        </div>

        <!-- Midden: Titel + Info -->
        <div class="flex flex-col justify-center flex-grow">
          <h3 class="text-slate-100 font-semibold text-sm truncate group-hover:text-white transition-colors duration-300">
            {{ title }}
          </h3>
          <p class="text-xs text-slate-400 truncate group-hover:text-slate-300 transition-colors duration-300">
            <span v-if="resources?.name" class="text-cyan-400 font-medium">{{ resources.name }}</span>
            <span v-if="resources?.name && users"> · </span>
            <span v-if="users">{{ users.first_name }} {{ users.last_name }}</span>
          </p>
        </div>
      </div>

      <!-- Rechterzijde: Datum & Tijden -->
      <div class="flex items-center gap-6 ml-4">
        <!-- Datum -->
        <div class="text-right">
          <div class="text-xs text-slate-500 uppercase tracking-wide font-semibold">
            Datum
          </div>
          <div class="text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
            {{ formattedDate }}
          </div>
        </div>

        <!-- Scheidingsteken -->
        <div class="text-slate-600 group-hover:text-slate-500 transition-colors duration-300">
          |
        </div>

        <!-- Start tijd -->
        <div class="text-right">
          <div class="text-xs text-slate-500 uppercase tracking-wide font-semibold">
            Start
          </div>
          <div class="text-sm font-mono text-slate-200 group-hover:text-white transition-colors duration-300">
            {{ formattedStartTime }}
          </div>
        </div>

        <!-- Scheidingsteken -->
        <div class="text-slate-600 group-hover:text-slate-500 transition-colors duration-300">
          →
        </div>

        <!-- End tijd -->
        <div class="text-right">
          <div class="text-xs text-slate-500 uppercase tracking-wide font-semibold">
            End
          </div>
          <div class="text-sm font-mono text-slate-200 group-hover:text-white transition-colors duration-300">
            {{ formattedEndTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: [Number, String],
  users_id: [Number, String],
  resources_id: [Number, String],
  title: String,
  start_time: String,
  end_time: String,
  index: Number,
  resources: Object,     // ✓ Props toegevoegd
  users: Object          // ✓ Props toegevoegd
})

// Format date
const formattedDate = computed(() => {
  if (!props.start_time) return 'N/A'
  const date = new Date(props.start_time)
  return date.toLocaleDateString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})

// Format start time
const formattedStartTime = computed(() => {
  if (!props.start_time) return 'N/A'
  const date = new Date(props.start_time)
  return date.toLocaleTimeString('nl-BE', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Format end time
const formattedEndTime = computed(() => {
  if (!props.end_time) return 'N/A'
  const date = new Date(props.end_time)
  return date.toLocaleTimeString('nl-BE', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<style scoped>
/* Fade-in en stijgende animatie */
div {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger effect voor multiple cards */
:nth-child(n) {
  animation-delay: calc(0.05s * var(--index));
}
</style>
