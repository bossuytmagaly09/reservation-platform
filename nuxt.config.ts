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
    '~/assets/css/colors.css',
    '~/assets/css/fonts.css'
  ],

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})


