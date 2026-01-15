import { defineStore } from 'pinia'
// Als je useSupabase niet automatisch hebt via Nuxt, uncomment dan de volgende regel:
// import { useSupabase } from '@/composables/useSupabase'

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        resources: [],
        reservations: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchResources() {
            const supabase = useSupabase()

            if (!supabase) {
                this.error = "Supabase niet beschikbaar"
                return
            }

            this.loading = true
            try {
                // We halen resources op INCLUSIEF de count van de reservaties
                const { data, error } = await supabase
                    .from('resources')
                    .select('*, reservations(count)')

                if (error) throw error

                // Data mappen zodat 'reservation_count' beschikbaar is voor je kaartjes
                this.resources = data.map(res => ({
                    ...res,
                    reservation_count: res.reservations?.[0]?.count || 0
                }))

            } catch (err) {
                this.error = err.message
                console.error('Error fetching resources:', err)
            } finally {
                this.loading = false
            }
        },

        async fetchReservations() {
            const supabase = useSupabase()

            if (!supabase) return

            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('reservations')
                    .select('*, resources(name)')

                if (error) throw error
                this.reservations = data
            } catch (err) {
                this.error = err.message
                console.error('Error fetching reservations:', err)
            } finally {
                this.loading = false
            }
        },

        // DEZE FUNCTIE ZORGT DAT JE KAN OPSLAAN
        async createReservation(payload) {
            const supabase = useSupabase()

            if (!supabase) return { success: false, error: { message: "Geen database verbinding" } }

            const { error } = await supabase
                .from('reservations')
                .insert([payload])

            if (error) {
                return { success: false, error }
            }

            // Ververs meteen de data zodat je de nieuwe reservatie direct ziet
            await this.fetchReservations()
            await this.fetchResources()

            return { success: true }
        }
    }
})