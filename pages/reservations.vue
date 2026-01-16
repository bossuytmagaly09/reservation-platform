<template>
  <div class="space-y-8">

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
      <div>
        <h1 class="text-2xl font-semibold text-white">Reservations</h1>
        <p class="text-slate-400 text-sm mt-1">Beheer hier alle reservaties.</p>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg relative">

        <div class="flex items-center gap-2 text-slate-400 border-r border-slate-700 pr-4 mr-1 hidden sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span class="font-semibold text-sm uppercase tracking-wider">Filters</span>
        </div>

        <div class="flex gap-3 w-full sm:w-auto">
          <div class="flex flex-col">
            <label class="text-[10px] uppercase font-bold text-slate-500 mb-1 ml-1">Kies Datum</label>
            <input
                v-model="filterDate"
                type="date"
                class="bg-slate-900 border border-slate-600 text-white text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 block w-full dark-calendar"
            >
          </div>

          <div class="flex flex-col min-w-[160px]">
            <label class="text-[10px] uppercase font-bold text-slate-500 mb-1 ml-1">Filter op Resource</label>
            <select
                v-model="filterResourceId"
                class="bg-slate-900 border border-slate-600 text-white text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 block w-full cursor-pointer"
            >
              <option value="" class="bg-slate-800 text-slate-300">Alle Resources</option>
              <option
                  v-for="res in resourcesList"
                  :key="res.id"
                  :value="res.id"
                  class="bg-slate-800 text-white"
              >
                {{ res.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex items-end h-full pb-0.5" v-if="filterDate || filterResourceId">
          <button
              @click="resetFilters"
              class="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors flex items-center gap-1 h-[38px] mt-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            Wis
          </button>
        </div>
      </div>
    </div>

    <div v-if="filterDate || filterResourceId" class="w-full animate-fade-in-down">

      <div v-if="filteredReservations.length === 0" class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between text-red-200">
        <div class="flex items-center gap-3">
          <div class="bg-red-500/20 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <span class="font-semibold block text-white">Geen resultaten gevonden</span>
            <span class="text-sm text-red-300">Er zijn geen reservaties die voldoen aan je zoekopdracht.</span>
          </div>
        </div>
        <button @click="resetFilters" class="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors shadow-lg">
          Wis Filters
        </button>
      </div>

      <div v-else class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-center gap-3 text-blue-200">
        <div class="bg-blue-500/20 p-1.5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <span class="text-sm">
           Gefilterd resultaat: <strong class="text-white">{{ filteredReservations.length }}</strong> reservatie(s) gevonden.
         </span>
      </div>

    </div>

    <div class="w-full">
      <CalenderCard :events="filteredReservations" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <div class="lg:col-span-1">
        <div class="sticky top-6">
          <NewReservations @success="handleSuccess" />
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">

        <div v-if="loading" class="text-center py-20 text-slate-400 bg-slate-800/30 rounded-lg border border-slate-700/50">
          ⏳ Reservaties laden...
        </div>

        <div v-else-if="error" class="text-center py-20 text-red-500 font-medium bg-red-900/10 rounded-lg border border-red-500/20">
          ❌ {{ error }}
        </div>

        <div v-else>
          <ReservationsList :items="filteredReservations" />
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
const resourcesList = ref([])
const loading = ref(true)
const error = ref(null)

// FILTER STATE
const filterDate = ref('')
const filterResourceId = ref('')

const supabase = useSupabase()

// DATA OPHALEN
const fetchReservations = async () => {
  if (!supabase) {
    error.value = "Database connectie mislukt"
    return
  }

  loading.value = true
  try {
    const { data: resData, error: resError } = await supabase
        .from('reservations')
        .select(`*, resources ( name ), users ( first_name, last_name )`)

    if (resError) throw resError
    reservations.value = resData || []

    const { data: resourceData, error: resourceError } = await supabase
        .from('resources')
        .select('id, name')

    if (!resourceError) {
      resourcesList.value = resourceData || []
    }
    error.value = null
  } catch (err) {
    error.value = 'Fout: ' + err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSuccess = () => {
  fetchReservations()
}

const resetFilters = () => {
  filterDate.value = ''
  filterResourceId.value = ''
}

onMounted(() => {
  fetchReservations()
})

// FILTER & SORTEER LOGICA
const filteredReservations = computed(() => {
  let items = [...reservations.value]

  // Filter 1: Datum (SUPER ROBUUST)
  if (filterDate.value) {
    items = items.filter(res => {
      if (!res.start_time || !res.end_time) return false

      const filterDag = filterDate.value
      // We gebruiken substring om puur de datum (YYYY-MM-DD) te pakken
      const startDag = res.start_time.substring(0, 10)
      const eindDag = res.end_time.substring(0, 10)

      return filterDag >= startDag && filterDag <= eindDag
    })
  }

  // Filter 2: Resource
  if (filterResourceId.value) {
    items = items.filter(res => {
      // Check op zowel resources_id als resource_id voor de zekerheid
      const resId = res.resources_id || res.resource_id
      return resId == filterResourceId.value
    })
  }

  // Sorteren
  return items.sort((a, b) => {
    return new Date(a.start_time) - new Date(b.start_time)
  })
})
</script>

<style scoped>
/* ... animaties ... */
.grid > div, .space-y-8 > div {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- KALENDER STIJL --- */

.dark-calendar {
  /* Zorgt voor de donkere popup */
  color-scheme: dark;
}

/* Pas het icoontje aan */
.dark-calendar::-webkit-calendar-picker-indicator {
  /* GEEN invert meer nodig, want in dark mode is hij al wit! */
  opacity: 0.6; /* Iets minder fel */
  cursor: pointer;
}
.dark-calendar::-webkit-calendar-picker-indicator:hover {
  opacity: 1; /* Feller als je erover muist */
}
</style>