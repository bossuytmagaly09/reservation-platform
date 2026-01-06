// src/stores/bookingStore.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase' // Pas het pad aan indien nodig

export const useBookingStore = defineStore('booking', {
    // 1. STATE: Hier bewaren we de data
    state: () => ({
        resources: [],
        reservations: [],
        loading: false,
        error: null
    }),

    // 2. ACTIONS: Hier halen we de data op
    actions: {
        // Haal resources (kamers/spullen) op
        async fetchResources() {
            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('resources') // Zorg dat deze tabelnaam klopt in Supabase
                    .select('*')

                if (error) throw error
                this.resources = data
            } catch (err) {
                this.error = err.message
                console.error('Error fetching resources:', err)
            } finally {
                this.loading = false
            }
        },

        // Haal reservations (boekingen) op
        async fetchReservations() {
            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('reservations') // Zorg dat deze tabelnaam klopt in Supabase
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

        // Een hulpfunctie om alles tegelijk op te halen
        async fetchAllData() {
            await Promise.all([this.fetchResources(), this.fetchReservations()])
        }
    }
})