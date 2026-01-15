<template>
  <div class="space-y-8">

    <div class="flex justify-between items-end px-1">
      <div>
        <h1 class="text-2xl font-semibold text-white">Reservations</h1>
        <p class="text-slate-400 text-sm mt-1">Beheer hier alle reservaties.</p>
      </div>
    </div>

    <div class="w-full">
      <CalenderCard />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <div class="lg:col-span-1">
        <div class="sticky top-6">
          <NewReservations @success="fetchReservations" />
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">

        <div v-if="loading" class="text-center py-20 text-slate-400 bg-slate-800/30 rounded-lg border border-slate-700/50">
          ⏳ Reservaties laden...
        </div>

        <div v-else-if="error" class="text-center py-20 text-red-500 font-medium bg-red-900/10 rounded-lg border border-red-500/20">
          ❌ {{ error }}
        </div>

        <div v-else-if="sortedReservations.length === 0" class="text-center py-20 text-slate-500 bg-slate-800/30 rounded-lg border border-slate-700/50">
          Geen reservaties gevonden.
        </div>

        <div v-else>
          <ReservationsList :items="sortedReservations" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

// IMPORTS
import ReservationsList from '~/components/ReservationsList.vue'
import NewReservations from '~/components/NewReservations.vue'
import CalenderCard from '~/components/CalenderCard.vue'

useHead({ title: 'Reservations - App' })

// STATE
const reservations = ref([])
const loading = ref(true)
const error = ref(null)

const supabase = useSupabase()

// DATA OPHALEN
const fetchReservations = async () => {
  if (!supabase) {
    error.value = "Database connectie mislukt"
    return
  }

  loading.value = true
  try {
    const { data, error: supaError } = await supabase
        .from('reservations')
        .select(`
        *,
        resources ( name ),
        users ( first_name, last_name )
      `)

    if (supaError) throw supaError

    reservations.value = data || []
    error.value = null

  } catch (err) {
    error.value = 'Fout: ' + err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReservations()
})

// SORTEREN
const sortedReservations = computed(() => {
  return [...reservations.value].sort((a, b) => {
    return new Date(a.start_time) - new Date(b.start_time)
  })
})
</script>

<style scoped>
/* Kleine toevoeging: animation ook toepassen op grid items voor soepele inlaad ervaring */
.grid > div, .space-y-8 > div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>