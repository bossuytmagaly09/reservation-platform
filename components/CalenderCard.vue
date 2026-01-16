<script setup>
import { computed, onMounted, ref } from 'vue'
import { useDataStore} from "~/stores/useDataStore.js";
import {useSupabase} from "~/composables/useSupabase.js";
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import nlLocale from '@fullcalendar/core/locales/nl'

// 1. NIEUW: We accepteren 'events' van buitenaf (uit de filter)
const props = defineProps({
  events: {
    type: Array,
    default: null
  }
})

const boardStore = useDataStore()
const calendarRef = ref(null)

// --- STATE MODAL ---
const showModal = ref(false)
const selectedEvent = ref(null)

onMounted(async () => {
  // We halen altijd resources op (voor de kleurtjes)
  await boardStore.fetchResources()

  // Alleen als er GEEN props zijn, halen we zelf de reservaties op
  if (!props.events) {
    await boardStore.fetchReservations()
  }
})

// --- 1. KLEUREN EN STIJL (GLASS LOOK) ---
const getResourceStyle = (resource) => {
  if (!resource) return { bg: 'rgba(148, 163, 184, 0.2)', border: 'rgba(148, 163, 184, 0.5)', text: '#cbd5e1' }

  const typeId = resource.resources_types_id
  const name = (resource.name || '').toLowerCase()

  // Meeting Rooms (Blauw)
  if (typeId === 1) {
    return { bg: 'rgba(14, 165, 233, 0.15)', border: 'rgba(14, 165, 233, 0.6)', text: '#0ea5e9' }
  }
  // Voertuigen (Amber)
  if (typeId === 2) {
    return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.6)', text: '#f59e0b' }
  }
  // Elektronica (Indigo & Roze)
  if (typeId === 3) {
    if (name.includes('macbook') || name.includes('laptop')) {
      return { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.6)', text: '#6366f1' }
    }
    return { bg: 'rgba(219, 39, 119, 0.15)', border: 'rgba(219, 39, 119, 0.6)', text: '#db2777' }
  }

  return { bg: 'rgba(100, 116, 139, 0.2)', border: 'rgba(100, 116, 139, 0.5)', text: '#cbd5e1' }
}

const formatDate = (dateObj) => {
  if (!dateObj) return ''
  return new Date(dateObj).toLocaleString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
  })
}

// --- 2. EVENTS MAPPEN ---
const calendarEvents = computed(() => {
  // HIER ZIT DE FIX:
  // Gebruik de props (gefilterde lijst) als die er is, anders de store (alles)
  const sourceData = props.events || boardStore.reservations

  if (!sourceData || !Array.isArray(sourceData)) {
    return []
  }

  return sourceData.map(res => {
    // Check op resources_id (zoals jij aangaf) OF resource_id (standaard) voor zekerheid
    const resId = res.resources_id || res.resource_id

    const linkedResource = boardStore.resources
        ? boardStore.resources.find(r => r.id === resId)
        : null

    const style = getResourceStyle(linkedResource)

    return {
      id: res.id,
      title: res.title,
      resourceName: linkedResource?.name || 'Onbekend',
      start: res.start_time,
      end: res.end_time,

      allDay: false,

      backgroundColor: style.bg,
      borderColor: style.border,
      textColor: '#ffffff',
      extendedProps: { description: res.title, style: style }
    }
  })
})

// --- 3. CUSTOM ACTIONS ---
const goToToday = () => {
  if (calendarRef.value) {
    const calendarApi = calendarRef.value.getApi()
    calendarApi.today()
    calendarApi.changeView('timeGridDay')
  }
}

// --- 4. KALENDER OPTIES ---
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  eventDisplay: 'block',
  locale: nlLocale,

  headerToolbar: {
    left: 'prev,next myCustomToday',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },

  customButtons: {
    myCustomToday: { text: 'Vandaag', click: goToToday }
  },

  buttonText: { month: 'Maand', week: 'Week', day: 'Dag' },

  // Koppel de events
  events: calendarEvents.value,

  slotMinTime: '06:00:00',
  slotMaxTime: '23:00:00',
  allDaySlot: false,
  height: 'auto',
  nowIndicator: true,

  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    meridiem: false
  },

  eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: false },

  eventClick: (info) => {
    selectedEvent.value = {
      title: info.event.title,
      resource: info.event.extendedProps.resourceName,
      start: info.event.start,
      end: info.event.end,
      style: info.event.extendedProps.style
    }
    showModal.value = true
  }
}))
</script>

<template>
  <div class="relative">
    <div class="bg-slate-800 p-5 rounded-2xl shadow-xl border border-slate-700">
      <FullCalendar ref="calendarRef" :options="calendarOptions" class="custom-calendar" />
    </div>

    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
        <div class="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
          <div class="h-2 w-full" :style="{ backgroundColor: selectedEvent?.style?.text || '#3b82f6' }"></div>
          <div class="p-6 space-y-4">
            <h3 class="text-xl font-bold text-white leading-tight">{{ selectedEvent?.title }}</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-slate-300">
                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <span class="text-sm font-medium">{{ selectedEvent?.resource }}</span>
              </div>
              <div class="flex items-start gap-3 text-slate-300">
                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700 mt-1">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div class="text-sm">
                  <p class="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Start</p>
                  <p>{{ formatDate(selectedEvent?.start) }}</p>
                  <p class="text-slate-400 text-xs uppercase font-bold tracking-wider mt-2 mb-1">Einde</p>
                  <p>{{ formatDate(selectedEvent?.end) }}</p>
                </div>
              </div>
            </div>
            <button @click="showModal = false" class="w-full mt-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">Sluiten</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

:deep(.custom-calendar) {
  --fc-page-bg-color: transparent;
  --fc-neutral-bg-color: transparent;
  --fc-border-color: rgba(255, 255, 255, 0.05);
  font-family: 'Inter', sans-serif;
  color: #94a3b8;
}

:deep(.fc-event) {
  border-radius: 4px !important;
  font-weight: 500;
  backdrop-filter: blur(4px);
  border-style: solid !important;
  border-width: 1px !important;
  overflow: hidden;
}

:deep(.fc-event-main) {
  display: flex !important;
  align-items: center !important;
  padding: 1px 4px !important;
  gap: 4px;
  overflow: hidden !important;
  width: 100%;
}

:deep(.fc-event-time) {
  font-weight: 700;
  color: #fff;
  font-size: 0.75rem;
  flex-shrink: 0 !important;
  white-space: nowrap !important;
}

:deep(.fc-event-title) {
  font-weight: 500;
  color: #fff;
  font-size: 0.8rem;
  opacity: 0.95;
  flex-grow: 1 !important;
  min-width: 0 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block !important;
}

:deep(.fc-timegrid-event) {
  border-radius: 6px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  margin: 0 4px !important;
  min-height: 25px !important;
}

:deep(.fc-timegrid-event .fc-event-main) {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0;
  padding: 4px 6px !important;
}

:deep(.fc-timegrid-event .fc-event-time) {
  font-size: 0.75rem;
  margin-bottom: 2px;
}

:deep(.fc-timegrid-event .fc-event-title) {
  white-space: normal !important;
  overflow: hidden !important;
  text-overflow: clip !important;
}

:deep(.fc-button) {
  background-color: rgba(30, 41, 59, 1) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #cbd5e1 !important;
  text-transform: capitalize;
  border-radius: 8px !important;
  font-size: 0.85rem !important;
  padding: 6px 14px !important;
  opacity: 1 !important;
  box-shadow: none !important;
}
:deep(.fc-button:hover) {
  background-color: rgba(51, 65, 85, 1) !important;
  color: #fff !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
:deep(.fc-button-active) {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: white !important;
}

:deep(.fc-toolbar-title) { color: #f1f5f9; font-size: 1.4rem !important; font-weight: 700; }
:deep(.fc-col-header-cell-cushion) { color: #64748b; text-transform: uppercase; font-size: 0.7rem; font-weight: 700; padding-bottom: 10px; letter-spacing: 0.05em; text-decoration: none !important; }
:deep(.fc-timegrid-slot-label-cushion) { color: #94a3b8; font-size: 0.8rem; font-weight: 500; }
:deep(.fc-daygrid-day-number) { color: #94a3b8; font-size: 0.9rem; padding: 8px; text-decoration: none !important; }
:deep(.fc-day-today .fc-daygrid-day-number) { background-color: rgba(59, 130, 246, 0.9); color: white; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; margin: 4px; }
:deep(.fc-day-today) { background: transparent !important; }
</style>