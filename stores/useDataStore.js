import { defineStore } from 'pinia'
// BELANGRIJK: We importeren jouw custom composable hier expliciet
import { useSupabase } from '@/composables/useSupabase'

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        resources: [],
        types: [],
        loading: false,
        error: null
    }),

    actions: {
        // 1. Resources ophalen
        async fetchResources() {
            // We gebruiken JOUW versie van useSupabase
            const supabase = useSupabase()

            if (!supabase) return

            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('resources')
                    .select('*, reservations(count)')

                if (error) throw error

                this.resources = data.map(res => ({
                    ...res,
                    reservation_count: res.reservations?.[0]?.count || 0
                }))
            } catch (err) {
                console.error('Error fetching resources:', err)
            } finally {
                this.loading = false
            }
        },

        // 2. Types ophalen
        async fetchTypes() {
            const supabase = useSupabase() // Aangepast naar jouw composable

            if (!supabase) return

            const { data, error } = await supabase
                .from('resources_types')
                .select('*')

            if (!error) {
                this.types = data
            }
        },

        // 3. Resource aanmaken
        async createResource(payload) {
            const supabase = useSupabase() // Aangepast naar jouw composable

            if (!supabase) return { success: false, error: { message: "Geen database verbinding" } }

            // Standaard icoon (zwart vierkantje/placeholder)
            const defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,115.55V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0l.11.11,80,75.48A16,16,0,0,1,224,115.55Z"></path></svg>`

            const finalPayload = {
                ...payload,
                icon: defaultIcon
            }

            const { error } = await supabase
                .from('resources')
                .insert([finalPayload])

            if (error) return { success: false, error }

            // Ververs de lijsten
            await this.fetchResources()
            return { success: true }
        },

        // 4. Reservatie aanmaken
        async createReservation(payload) {
            const supabase = useSupabase() // Aangepast naar jouw composable

            if (!supabase) return { success: false, error: { message: "Geen database verbinding" } }

            const { error } = await supabase.from('reservations').insert([payload])

            if (error) return { success: false, error }

            await this.fetchResources()
            return { success: true }
        }
    }
})