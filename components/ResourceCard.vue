<template>
  <div
      class="group bg-slate-800 rounded-xl border border-slate-700/60 shadow-md hover:shadow-xl hover:border-slate-600 transition-all duration-300 cursor-pointer p-5 flex items-center justify-between gap-4"
  >

    <div class="flex items-center gap-4 overflow-hidden">

      <div
          class="shrink-0 w-16 h-16 rounded-lg bg-slate-700/80 flex items-center justify-center text-slate-400 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors"
      >
        <div
            v-html="icon"
            class="force-icon-color w-8 h-8 flex items-center justify-center"
        />
      </div>

      <div class="flex flex-col min-w-0">
        <h3 class="text-white font-semibold text-lg truncate leading-tight mb-1">
          {{ name }}
        </h3>

        <p class="text-sm text-slate-400 leading-snug line-clamp-2">
          {{ description }}
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center pl-6 border-l border-slate-700/50 shrink-0 min-w-[90px]">
      <span class="text-3xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
        {{ reservation_count }}
      </span>
      <span class="text-[10px] uppercase tracking-wider text-slate-500 font-medium mt-1">
        Reservations
      </span>
    </div>

  </div>
</template>

<script setup>
defineProps({
  id: [Number, String],
  name: String,
  type: String,
  description: String,
  icon: String,
  reservation_count: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
/* Forceer de kleur van de SVG naar de tekstkleur */
.force-icon-color :deep(svg),
.force-icon-color :deep(path) {
  fill: currentColor !important;
  stroke: none !important;
}
</style>