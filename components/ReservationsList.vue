<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ReservationsCard from '~/components/ReservationsCard.vue'

// Reactive variabelen
const reservations = ref([])
const loading = ref(true)
const error = ref(null)

// Supabase client ophalen
const supabase = useSupabase()

// Data ophalen bij het laden van de pagina
onMounted(async () => {
  try {
    const { data, error: supaError } = await supabase
        .from('reservations') .select(` id, title, start_time, end_time, resources_id, users_id, resources ( name ), users:users ( first_name, last_name ) `)

    if (supaError) {
      error.value = 'Kon reservaties niet ophalen: ' + supaError.message
      return
    }

    reservations.value = data

  } catch (err) {
    error.value = 'Onverwachte fout: ' + err.message
  } finally {
    loading.value = false
  }
})

// Sorteren op start_time
const sortedReservations = computed(() => {
  return [...reservations.value].sort((a, b) => {
    return new Date(a.start_time) - new Date(b.start_time)
  })
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-10">
    <!-- LOADING -->
    <div v-if="loading" class="text-center py-20 text-[var(--color-text-muted)]">
      ⏳ Reservaties laden...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="text-center py-20 text-red-500 font-medium">
      ❌ {{ error }}
    </div>

    <!-- EMPTY -->
    <div v-else-if="sortedReservations.length === 0" class="text-center py-20 text-[var(--color-text-muted)]">
      Geen reservaties gevonden.
    </div>

    <!-- LIST -->
    <div v-else class="space-y-1">
      <ReservationsCard
          v-for="(item, index) in sortedReservations"
          :key="item.id"
          :index="index + 1"
          :id="item.id"
          :title="item.title"
          :start_time="item.start_time"
          :end_time="item.end_time"
          :resources_id="item.resources_id"
          :users_id="item.users_id"
          :resources="item.resources"
          :users="item.users"
      />
    </div>

  </div>
</template>

<style scoped>
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
