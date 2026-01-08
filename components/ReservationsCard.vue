<template>
  <div
      class="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700/50 hover:bg-slate-700/40 transition-colors duration-200"
  >
    <!-- Nummering links -->
    <div
        class="w-12 h-12 flex items-center justify-center bg-slate-700/40 rounded-md text-slate-200 font-semibold text-lg"
    >
      {{ index }}
    </div>

    <!-- Midden: titel + info -->
    <div class="flex flex-col justify-center ml-4 flex-grow">
      <h3 class="text-slate-100 font-medium text-sm truncate">
        {{ title }}
      </h3>
      <p class="text-xs text-slate-400 truncate">
        {{ resources?.name }} · {{ users?.first_name }} {{ users?.last_name }}
      </p>
    </div>

    <!-- Rechterzijde: tijd -->
    <div class="text-right text-xs text-slate-400 font-mono whitespace-nowrap ml-4">
      {{ formattedTime }}
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
  index: Number
})

const formattedTime = computed(() => {
  const date = new Date(props.start_time)
  return date.toLocaleTimeString('nl-BE', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
