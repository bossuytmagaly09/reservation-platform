// nuxt.config.ts
export default defineNuxtConfig({
  modules: [

  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
  },
  css: [
// jouw globale Tailwind / CSS imports
  ],

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})


