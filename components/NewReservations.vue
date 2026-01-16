<script setup>
// 1. IMPORTS
import { useSupabase } from '~/composables/useSupabase'
// Let op: Verwijs naar de map 'stores', niet 'composables' voor de dataStore
import { useDataStore } from '@/stores/useDataStore'
import { computed, reactive, ref, onMounted } from 'vue'

const emit = defineEmits(['success'])

// 2. INITIALISATIE
const supabase = useSupabase()   // Voor het opslaan (submit)
const dataStore = useDataStore() // Voor de dropdown lijst (resources)

// --- STATE ---
const showResourceMenu = ref(false)
const showStartMenu = ref(false)
const showEndMenu = ref(false)

const form = reactive({
  title: '',
  description: '',
  resourceId: null,
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: ''
})

const isSubmitting = ref(false)
const timeSlots = ref([])

// --- COMPUTED VALIDATIE (NIEUW) ---
// Geeft true terug als alle verplichte velden gevuld zijn
const isFormValid = computed(() => {
  return (
      form.title.trim() !== '' &&
      form.resourceId !== null &&
      form.startDate !== '' &&
      form.endDate !== '' &&
      form.startTime !== '' &&
      form.endTime !== ''
  )
})

const selectedResource = computed(() => {
  if (!dataStore.resources) return null
  return dataStore.resources.find(r => r.id === form.resourceId)
})

// --- INITIALISATIE ---
const generateTimeSlots = () => {
  const slots = []
  for (let i = 7; i <= 22; i++) {
    const hour = i.toString().padStart(2, '0')
    slots.push(`${hour}:00`)
    if (i !== 22) slots.push(`${hour}:30`)
  }
  timeSlots.value = slots
}

onMounted(async () => {
  generateTimeSlots()
  // We gebruiken de STORE om de lijst op te halen
  await dataStore.fetchResources()
})

// --- ACTIONS ---
const selectResource = (id) => {
  form.resourceId = id
  showResourceMenu.value = false
}

const selectStartTime = (time) => {
  form.startTime = time
  showStartMenu.value = false
}

const selectEndTime = (time) => {
  form.endTime = time
  showEndMenu.value = false
}

const closeAllMenus = () => {
  showResourceMenu.value = false
  showStartMenu.value = false
  showEndMenu.value = false
}

const openDatePicker = (event) => {
  try {
    if (event.target && typeof event.target.showPicker === 'function') {
      event.target.showPicker()
    }
  } catch (error) {
    console.log("Browser ondersteunt showPicker niet.")
  }
}

// --- SUBMIT ---
const handleSubmit = async () => {
  // 1. Validatie check
  if (!isFormValid.value) {
    alert('Vul alle verplichte velden in.')
    return
  }

  // 2. Datum logica check
  const startFull = new Date(`${form.startDate}T${form.startTime}`)
  const endFull = new Date(`${form.endDate}T${form.endTime}`)

  if (endFull <= startFull) {
    alert('Het eindmoment moet later zijn dan het startmoment.')
    return
  }

  isSubmitting.value = true

  const payload = {
    title: form.title,
    resource_id: form.resourceId,
    start_time: startFull.toISOString(),
    end_time: endFull.toISOString(),
  }

  // HIER GEBRUIKEN WE SUPABASE DIRECT (Zoals in je originele code)
  const { error } = await supabase
      .from('reservations')
      .insert([payload])

  if (!error) {
    // Reset formulier
    form.title = ''
    form.description = ''
    form.startDate = ''
    form.endDate = ''
    form.startTime = ''
    form.endTime = ''
    form.resourceId = null

    // Vertel de store dat er data is veranderd
    await dataStore.fetchResources() // Update de counts
    if (dataStore.fetchReservations) await dataStore.fetchReservations() // Update de lijst

    emit('success')
  } else {
    alert('Fout bij opslaan: ' + (error.message || 'Onbekende fout'))
  }
  isSubmitting.value = false
}
</script>

<template>
  <div>
    <div
        v-if="showResourceMenu || showStartMenu || showEndMenu"
        @click="closeAllMenus"
        class="fixed inset-0 z-30 bg-transparent w-full h-full cursor-default"
    ></div>

    <div class="bg-slate-800 p-6 rounded-2xl shadow-xl text-white max-w-lg w-full border border-slate-700 relative">
      <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
        <span class="text-blue-500 text-2xl">+</span> Nieuwe Reservatie
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">

        <div>
          <label class="block text-sm text-slate-300 mb-1">Titel <span class="text-red-400">*</span></label>
          <input
              v-model="form.title"
              type="text"
              placeholder="Bijv. Project Meeting"
              class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600 text-white"
          />
        </div>

        <div class="relative" :class="showResourceMenu ? 'z-50' : 'z-20'">
          <label class="block text-sm text-slate-300 mb-2">Kies Resource <span class="text-red-400">*</span></label>
          <div class="flex gap-3 items-center">
            <div class="relative w-full">
              <div
                  @click="showResourceMenu = !showResourceMenu; showStartMenu = false; showEndMenu = false"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 cursor-pointer flex justify-between items-center hover:border-slate-500 transition"
                  :class="{'border-blue-500 ring-1 ring-blue-500': showResourceMenu}"
              >
                <span class="truncate">
                  {{ selectedResource ? `${selectedResource.name} (${selectedResource.type || 'Item'})` : 'Selecteer een optie...' }}
                </span>
                <svg class="h-4 w-4 fill-slate-400 flex-shrink-0 ml-2" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>

              <div
                  v-if="showResourceMenu"
                  class="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
              >
                <div
                    v-for="res in dataStore.resources"
                    :key="res.id"
                    @click="selectResource(res.id)"
                    class="p-3 cursor-pointer transition-colors border-b border-slate-700/50 last:border-0 hover:bg-blue-600 group"
                    :class="{'bg-slate-700': form.resourceId === res.id}"
                >
                  <div class="font-medium text-slate-200 group-hover:text-white">{{ res.name }}</div>
                  <div class="text-xs text-slate-400 group-hover:text-blue-100 mt-0.5">
                    {{ res.description || res.type || 'Geen info' }}
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedResource" class="flex-shrink-0 w-12 h-11 bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center text-blue-400 transition-all">
              <div v-html="selectedResource.icon" class="w-6 h-6 [&>svg]:w-full [&>svg]:h-full fill-current"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 relative" :class="showStartMenu ? 'z-50' : 'z-10'">
          <div class="col-span-1 cursor-pointer">
            <label class="block text-sm text-slate-300 mb-1">Start Datum <span class="text-red-400">*</span></label>
            <input v-model="form.startDate" type="date" @click="openDatePicker" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 text-slate-200 [color-scheme:dark] cursor-pointer" />
          </div>
          <div class="col-span-1 relative">
            <label class="block text-sm text-slate-300 mb-1">Start Tijd <span class="text-red-400">*</span></label>
            <div @click="showStartMenu = !showStartMenu; showEndMenu = false; showResourceMenu = false" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 cursor-pointer flex justify-between items-center hover:border-slate-500 transition" :class="{'border-blue-500 ring-1 ring-blue-500': showStartMenu}">
              <span>{{ form.startTime || '--:--' }}</span>
              <svg class="h-3 w-3 fill-slate-400" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
            <div v-if="showStartMenu" class="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
              <div v-for="time in timeSlots" :key="time" @click="selectStartTime(time)" class="p-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors" :class="{'bg-slate-700 text-white': form.startTime === time}">{{ time }}</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 relative" :class="showEndMenu ? 'z-50' : 'z-0'">
          <div class="col-span-1 cursor-pointer">
            <label class="block text-sm text-slate-300 mb-1">Eind Datum <span class="text-red-400">*</span></label>
            <input v-model="form.endDate" type="date" @click="openDatePicker" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 text-slate-200 [color-scheme:dark] cursor-pointer" />
          </div>
          <div class="col-span-1 relative">
            <label class="block text-sm text-slate-300 mb-1">Eind Tijd <span class="text-red-400">*</span></label>
            <div @click="showEndMenu = !showEndMenu; showStartMenu = false; showResourceMenu = false" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 cursor-pointer flex justify-between items-center hover:border-slate-500 transition" :class="{'border-blue-500 ring-1 ring-blue-500': showEndMenu}">
              <span>{{ form.endTime || '--:--' }}</span>
              <svg class="h-3 w-3 fill-slate-400" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
            <div v-if="showEndMenu" class="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
              <div v-for="time in timeSlots" :key="time" @click="selectEndTime(time)" class="p-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors" :class="{'bg-slate-700 text-white': form.endTime === time}">{{ time }}</div>
            </div>
          </div>
        </div>

        <button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            class="w-full font-medium py-3 rounded-lg transition-all mt-2 shadow-lg
               text-white
               disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none
               bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
        >
          <span v-if="isSubmitting">Bezig met opslaan...</span>
          <span v-else-if="!isFormValid">Vul alle velden in</span>
          <span v-else>Bevestig Reservatie</span>
        </button>

      </form>
    </div>
  </div>
</template>