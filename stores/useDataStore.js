// src/stores/bookingStore.js
import { defineStore } from 'pinia'
// LET OP: Geen import meer van supabase hierboven!

export const useBookingStore = defineStore('booking', {
    state: () => ({
        resources: [],
        reservations: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchResources() {
            // 1. Haal de supabase client op via de composable van je collega
            const supabase = useSupabase()

            if (!supabase) {
                this.error = "Supabase niet beschikbaar"
                return
            }

            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('resources')
                    .select(`
                        *,
                        resources ( name ),
                        users ( first_name, last_name )
                    `)

                if (error) throw error
                this.resources = data.map(res => ({
                    ...res,
                    // Als er reservaties zijn, pak de count, anders 0
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
            const supabase = useSupabase() // <--- Hier ook toevoegen

            if (!supabase) return

            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('reservations')
                    .select('*')

                if (error) throw error
                this.reservations = data
            } catch (err) {
                this.error = err.message
                console.error('Error fetching reservations:', err)
            } finally {
                this.loading = false
            }
        },

        async fetchAllData() {
            await Promise.all([this.fetchResources(), this.fetchReservations()])
        }
    }
})