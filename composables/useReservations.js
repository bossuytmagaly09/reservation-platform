import { ref, computed } from 'vue'

// In-memory storage voor reservaties (kan later naar Supabase)
const reservationsStore = ref([])
const resourcesStore = ref([])

export const useReservations = () => {
  
  // Get all reservations
  const getAllReservations = () => {
    return reservationsStore.value
  }

  // Check if a specific date is booked
  const isDateBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return reservationsStore.value.some(r => {
      const startStr = new Date(r.dateStart).toISOString().split('T')[0]
      const endStr = new Date(r.dateEnd).toISOString().split('T')[0]
      return dateStr >= startStr && dateStr <= endStr
    })
  }

  // Get reservations for a specific date
  const getReservationsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return reservationsStore.value.filter(r => {
      const startStr = new Date(r.dateStart).toISOString().split('T')[0]
      const endStr = new Date(r.dateEnd).toISOString().split('T')[0]
      return dateStr >= startStr && dateStr <= endStr
    })
  }

  // Add a reservation
  const addReservation = (reservation) => {
    const id = Date.now().toString()
    reservationsStore.value.push({
      id,
      ...reservation
    })
    return id
  }

  // Delete a reservation
  const deleteReservation = (id) => {
    const index = reservationsStore.value.findIndex(r => r.id === id)
    if (index !== -1) {
      reservationsStore.value.splice(index, 1)
      return true
    }
    return false
  }

  // Get resources
  const getResources = () => {
    return resourcesStore.value
  }

  // Add resource
  const addResource = (resource) => {
    resourcesStore.value.push(resource)
  }

  return {
    reservationsStore: computed(() => reservationsStore.value),
    resources: computed(() => resourcesStore.value),
    isDateBooked,
    getReservationsForDate,
    getAllReservations,
    addReservation,
    deleteReservation,
    getResources,
    addResource
  }
}
