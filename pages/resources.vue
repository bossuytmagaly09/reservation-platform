<template>
  <div class="max-w-6xl mx-auto px-6 py-10">

    <!-- PAGINA TITEL -->
    <h1 class="text-4xl font-bold mb-6 text-[var(--color-primary)]"
        style="font-family: var(--font-title);">
      Resources
    </h1>

    <!-- LOADING STATE -->
    <div v-if="loading" class="text-center py-20 text-[var(--color-text-muted)]">
      ⏳ Resources laden...
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="text-center py-20 text-red-500 font-medium">
      ❌ {{ error }}
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="resources.length === 0" class="text-center py-20 text-[var(--color-text-muted)]">
      Geen resources gevonden.
    </div>

    <!-- RESOURCE GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
</template>

<script setup>
/*
  Dit is de pagina die alle resources ophaalt uit Supabase
  en ze toont in een grid van ResourceCards.
*/

import { ref, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ResourceCard from '~/components/ResourceCard.vue'

// Reactive variabelen
const resources = ref([])
const loading = ref(true)
const error = ref(null)

// Supabase client ophalen
const supabase = useSupabase()

// Data ophalen bij het laden van de pagina
onMounted(async () => {
  try {
    /*
      Query naar Supabase:
      We halen alle velden op uit de tabel "resources".
      Later kunnen we hier ook joins toevoegen voor reservaties.
    */
    const { data, error: supaError } = await supabase
        .from('resources')
        .select('*')

    if (supaError) {
      error.value = 'Kon resources niet ophalen: ' + supaError.message
      return
    }

    // Voorlopig zetten we reservation_count op 0
    resources.value = data.map(r => ({
      ...r,
      reservation_count: 0
    }))

  } catch (err) {
    error.value = 'Onverwachte fout: ' + err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Subtiele fade-in animatie */
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
