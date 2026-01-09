import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
    const supabase = useSupabaseClient()

    // --- STATE ---
    const resources = ref([])
    const isLoading = ref(false)

    // --- ACTIONS ---

    // 1. Resources ophalen
    const fetchResources = async () => {
        isLoading.value = true
        try {
            const { data, error } = await supabase
                .from('resources')
                .select('*')
                .order('id')

            if (error) throw error
            if (data) resources.value = data
        } catch (error) {
            console.error('Error fetching resources:', error.message)
        } finally {
            isLoading.value = false
        }
    }

    // 2. Nieuwe reservatie maken
    const createReservation = async (form) => {
        try {
            // Formaat samenstellen: YYYY-MM-DDTHH:MM:00
            const startIso = `${form.startDate}T${form.startTime}:00`
            const endIso = `${form.endDate}T${form.endTime}:00`

            const { data, error } = await supabase
                .from('reservations')
                .insert([
                    {
                        title: form.title,
                        resource_id: form.resourceId, // Let op: kolomnaam in DB moet kloppen
                        user_id: 1, // Tijdelijk hardcoded, later dynamisch maken
                        start_time: startIso,
                        end_time: endIso
                    }
                ])
                .select()

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error('Error creating reservation:', error.message)
            return { success: false, error }
        }
    }

    return {
        resources,
        isLoading,
        fetchResources,
        createReservation
    }
})