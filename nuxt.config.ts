// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
      '@pinia/nuxt',
      '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
  },
  css: [
//  globale Tailwind / CSS imports
    '~/assets/css/tailwind.css',
    "@phosphor-icons/core"

],

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})


