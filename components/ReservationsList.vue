<script setup>
import { computed } from 'vue'
import ReservationsCard from '~/components/ReservationsCard.vue'

// Props van parent component (reservations.vue)
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

// Props gebruiken - geen dubbele data fetching meer
const sortedReservations = computed(() => {
  return [...props.items].sort((a, b) => {
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
    <div v-else class="space-y-2">
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
