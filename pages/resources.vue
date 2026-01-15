<template>
  <div class="space-y-6">

    <div class="flex justify-between items-end px-1">
      <div>
        <h1 class="text-2xl font-semibold text-white">Resources</h1>
      </div>

      <button
          class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-lg shadow-blue-500/20 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Nieuwe Resource
      </button>
    </div>

    <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl min-h-[400px]">

      <div v-if="loading" class="text-center py-20 text-slate-400">
        ⏳ Resources laden...
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500 font-medium">
        ❌ {{ error }}
      </div>

      <div v-else-if="resources.length === 0" class="text-center py-20 text-slate-500">
        Geen resources gevonden.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResourceCard
            v-for="resource in resources"
            :key="resource.id"
            :id="resource.id"
            :name="resource.name"
            :type="resource.type"
            :description="resource.description"
            :icon="resource.icon"
            :reservation_count="resource.reservation_count"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Resources - App',
})

import { ref, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ResourceCard from '~/components/ResourceCard.vue'

const resources = ref([])
const loading = ref(true)
const error = ref(null)
const supabase = useSupabase()

onMounted(async () => {
  try {
    const { data, error: supaError } = await supabase
        .from('resources')
        .select(`
          *,
          reservations(count)
        `)

    if (supaError) {
      error.value = 'Kon resources niet ophalen: ' + supaError.message
      return
    }

    resources.value = data.map(r => ({
      ...r,
      reservation_count: r.reservations?.[0]?.count || 0
    }))

  } catch (err) {
    error.value = 'Onverwachte fout: ' + err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
div {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>