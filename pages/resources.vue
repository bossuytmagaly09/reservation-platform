<template>

  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-white">Resources</h1>
    </div>

    <!-- Empty State / Placeholder content -->
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
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ResourceCard
            v-for="resource in resources"
            :key="resource.id"
            :id="resource.id"
            :name="resource.name"
            :type="resource.type"
            :description="resource.description"
            :icon="resource.icon"
            :reservation_count="resource.reservation_count"
            @openCalendar="handleOpenCalendar"
        />
      </div>

      <!-- Calendar Section -->
      <div v-if="showCalendar" class="mt-8" data-calendar>
        <CalenderCard
            :filteredResourceId="selectedResourceId"
            :filteredResourceName="selectedResourceName"
        />
      </div>
    </template>

  </div>
</template>

<script setup>
useHead({
  title: 'Resources - App',
})
/*
  Dit is de pagina die alle resources ophaalt uit Supabase
  en ze toont in een grid van ResourceCards.
  
  Hier kan je ook op een resource klikken om de kalender gefilterd
  op die resource te tonen.
*/

import { ref, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ResourceCard from '~/components/ResourceCard.vue'
import CalenderCard from '~/components/CalenderCard.vue'

// Reactive variabelen
const resources = ref([])
const loading = ref(true)
const error = ref(null)
const showCalendar = ref(false)
const selectedResourceId = ref(null)
const selectedResourceName = ref(null)

// Supabase client ophalen
const supabase = useSupabase()

// Handler voor kalender openen
const handleOpenCalendar = (data) => {
  selectedResourceId.value = data.resourceId
  selectedResourceName.value = data.resourceName
  showCalendar.value = true
  
  // Scroll naar kalender
  setTimeout(() => {
    document.querySelector('[data-calendar]')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// Data ophalen bij het laden van de pagina
onMounted(async () => {
  try {
    /*
      Query naar Supabase:
      We halen alle velden op uit de tabel "resources".
      Daarna halen we voor elke resource het aantal reservaties op.
    */
    const { data, error: supaError } = await supabase
        .from('resources')
        .select('*')

    if (supaError) {
      error.value = 'Kon resources niet ophalen: ' + supaError.message
      return
    }

    // Voor elke resource het aantal reservaties ophalen
    resources.value = await Promise.all(
      data.map(async (resource) => {
        // Count reservations for this resource
        const { count, error: countError, data: resData } = await supabase
          .from('reservations')
          .select('*', { count: 'exact', head: true })
          .eq('resource_id', resource.id)

        console.log(`🔍 Resource ID: ${resource.id}`)
        console.log(`   Count: ${count}`)
        console.log(`   Error: ${countError?.message || 'Geen error'}`)
        console.log(`   Data: `, resData)

        return {
          ...resource,
          reservation_count: !countError ? (count || 0) : 0
        }
      })
    )

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
