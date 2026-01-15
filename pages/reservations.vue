<template>
  <div class="space-y-6">
    <!-- TITEL -->
    <div>
      <h1 class="text-2xl font-semibold text-white">Reservations</h1>
      <!--
      <p class="text-slate-400 text-sm mt-1">Het kader hieronder is een tijdelijke placeholder ter illustratie.</p>
      -->
    </div>


    <div class="max-w-6xl mx-auto px-6 py-10">

    <CalenderCard />

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-20 text-[var(--color-text-muted)]">
      ⏳ Reservaties laden...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="text-center py-20 text-red-500 font-medium">
      ❌ {{ error }}
    </div>

    <!-- EMPTY -->
    <div v-else-if="sortedReservations.length === 0"
         class="text-center py-20 text-[var(--color-text-muted)]">
      Geen reservaties gevonden.
    </div>

    <!-- LIST COMPONENT -->
    <ReservationsList
        v-else
        :items="sortedReservations"
    />
  </div>
  </div>

</template>


<script setup>
useHead({
  title: 'Reservations - App',
})
/*
  Reservations Page
  ------------------
  Haalt alle reservaties op uit Supabase en geeft ze door aan
  ReservationsList.vue voor weergave.
  
  Real-time updates zijn ingeschakeld via Supabase subscriptions.
*/

import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ReservationsList from '~/components/ReservationsList.vue'

// Reactive variabelen
const reservations = ref([])
const loading = ref(true)
const error = ref(null)
let subscription = null

// Supabase client
const supabase = useSupabase()

// Data ophalen
onMounted(async () => {
  if (!supabase) {
    error.value = 'Supabase is niet geconfigureerd'
    loading.value = false
    return
  }

  try {
    // Initiale data laden
    const { data, error: supaError } = await supabase
        .from('reservations')
        .select(`
          id,
          title,
          start_time,
          end_time,
          resources_id,
          users_id,
          resources ( name ),
          users:users ( first_name, last_name )
        `)

    if (supaError) {
      error.value = 'Kon reservaties niet ophalen: ' + supaError.message
      console.error('Supabase Error:', supaError)
      return
    }

    reservations.value = data
    console.log('✓ Reservaties succesvol geladen:', data.length, 'items')

    // Real-time subscription inschakelen
    setupRealtimeSubscription()

  } catch (err) {
    error.value = 'Onverwachte fout: ' + err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})

// Real-time updates opzetten
const setupRealtimeSubscription = () => {
  subscription = supabase
    .channel('reservations-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reservations'
      },
      async (payload) => {
        console.log('📡 Real-time update ontvangen:', payload.eventType)
        
        // Data opnieuw laden bij wijzigingen
        const { data, error: supaError } = await supabase
            .from('reservations')
            .select(`
              id,
              title,
              start_time,
              end_time,
              resources_id,
              users_id,
              resources ( name ),
              users:users ( first_name, last_name )
            `)

        if (!supaError) {
          reservations.value = data
          console.log('✓ Data vernieuwd:', data.length, 'items')
        }
      }
    )
    .subscribe()
}

// Cleanup bij unload
onUnmounted(() => {
  if (subscription) {
    supabase.removeChannel(subscription)
    console.log('🔌 Real-time subscription beëindigd')
  }
})

// Sorteren op start_time
const sortedReservations = computed(() => {
  return [...reservations.value].sort((a, b) => {
    return new Date(a.start_time) - new Date(b.start_time)
  })
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
