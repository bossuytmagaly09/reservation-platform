<template>
  <div class="space-y-6 page-anim">

    <div class="max-w-7xl mx-auto px-6 pt-10">
      <h1 class="text-2xl font-semibold text-white">Reservations</h1>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <div class="lg:col-span-2 space-y-8">
        <CalenderCard />

        <div v-if="loading" class="text-center py-20 text-[var(--color-text-muted)]">
          ⏳ Reservaties laden...
        </div>

        <div v-else-if="error" class="text-center py-20 text-red-500 font-medium">
          ❌ {{ error }}
        </div>

        <div v-else-if="sortedReservations.length === 0"
             class="text-center py-20 text-[var(--color-text-muted)]">
          Geen reservaties gevonden.
        </div>

        <ReservationsList
            v-else
            :items="sortedReservations"
        />
      </div>

      <div class="lg:col-span-1">
        <div class="sticky top-6">
          <NewReservations @success="fetchReservations" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Reservations - App' })

import { ref, onMounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
// Controleer of deze bestandsnaam EXACT klopt in je map:
import ReservationsList from '~/components/ReservationsList.vue'
import NewReservations from '~/components/NewReservations.vue'

const reservations = ref([])
const loading = ref(true)
const error = ref(null)
const supabase = useSupabase()

const fetchReservations = async () => {
  loading.value = true
  try {
    const { data, error: supaError } = await supabase
        .from('reservations')
        .select(`
        id, title, start_time, end_time, resources_id, users_id,
        resources ( name ),
        users:users ( first_name, last_name )
      `)

    if (supaError) throw supaError
    reservations.value = data || []
    error.value = null
  } catch (err) {
    console.error("Supabase Error:", err) // Log naar console zodat je het ziet
    error.value = 'Fout: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReservations()
})

const sortedReservations = computed(() => {
  return [...reservations.value].sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
})
</script>

<style scoped>
.page-anim {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>