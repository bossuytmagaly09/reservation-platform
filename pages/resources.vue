<template>


  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-white">Resources</h1>
      <!--
      <p class="text-slate-400 text-sm mt-1">Het kader hieronder is een tijdelijke placeholder ter illustratie.</p>
      -->
    </div>

    <!-- Empty State / Placeholder content -->
<!--    <div class="border border-dashed border-slate-800 rounded-lg p-12 flex flex-col items-center justify-center text-slate-500">-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256" class="mb-4 opacity-50">-->
<!--        <path d="M224,176a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,176ZM104,80H40a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm112,0H136a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Zm-28.43,54.12L159.2,165.6a8,8,0,0,1-11.31-11.31l28.37-31.48a8,8,0,0,1,11.31,0l28.37,31.48a8,8,0,0,1-11.31,11.31Z"></path>-->
<!--      </svg>-->
<!--      <span>No resources found</span>-->
<!--    </div>-->
  </div>

  <div class="max-w-6xl mx-auto px-6 py-10">


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
useHead({
  title: 'Resources - App',
})
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
