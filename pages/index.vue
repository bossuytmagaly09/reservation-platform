<template>
  <!--
    De volledige pagina is een flex container die verticaal gestapeld is.
    min-h-screen zorgt ervoor dat de pagina minstens de hoogte van het scherm heeft.
    De achtergrondkleur komt uit onze CSS-variabelen (colors.css).
    font-sans gebruikt het basisfont dat we in fonts.css hebben ingesteld.
  -->
  <div class="flex flex-col min-h-screen bg-[var(--color-bg)] font-sans">

    <!-- ──────────────────────────────────────────────────────────────── -->
    <!-- HERO SECTION: Introductie + Call to Action                       -->
    <!-- ──────────────────────────────────────────────────────────────── -->
    <section
        class="relative bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-20"
    >
      <!--
        max-w-3xl: beperkt de breedte zodat de tekst mooi gecentreerd blijft.
        mx-auto: centreert horizontaal.
        px-6: padding links/rechts voor mobiele toestellen.
        text-center: centreert alle tekst.
        text-white: maakt alle tekst wit.
        backdrop-blur-sm: subtiele blur voor een glaseffect.
      -->
      <div class="max-w-3xl mx-auto px-6 text-center text-white backdrop-blur-sm">

        <!--
          HOOFD TITEL
          - Grote, opvallende titel
          - tracking-tight: minder letterspatiëring voor een moderne look
          - drop-shadow-lg: subtiele schaduw voor extra diepte
          - font-family via CSS-variabele (fonts.css)
        -->
        <h1
            class="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg"
            style="font-family: var(--font-title);"
        >
          Reservations
        </h1>

        <!--
          SUBTITEL
          - Medium gewicht
          - underline met lichte decoratie
          - gebruikt het basisfont
        -->
        <h2
            class="text-2xl md:text-3xl font-medium mb-6"
            style="font-family: var(--font-base);"
        >
          Made with 💚 by
          <span class="underline decoration-2 decoration-white/50">
            Nikita, Magaly & Friedel
          </span>
        </h2>

        <!--
          BESCHRIJVING
          - font-light: zachtere typografie
          - leading-relaxed: meer regelafstand voor leesbaarheid
          - max-w-2xl: tekst blijft mooi compact
        -->
        <p
            class="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10"
            style="font-family: var(--font-base);"
        >
          Een moderne Nuxt 3‑app die met Supabase communiceert. Ontdek functionaliteit,
          eenvoud en een vleugje magie. Klik op de knop om de app te betreden.
        </p>

        <!--
          CTA BUTTON (NuxtLink)
          - bg-white/10: transparante witte achtergrond
          - backdrop-blur-sm: glaseffect
          - hover: scale, ring, en lichte achtergrondverandering
          - animate-pulse: subtiele animatie om aandacht te trekken
        -->
        <NuxtLink
            to="/app"
            class="inline-block px-8 py-3 rounded-lg font-semibold bg-white/10 backdrop-blur-sm
                 transition transform hover:scale-105 hover:bg-white/20 hover:ring-2 hover:ring-white/30
                 text-[var(--color-surface)] animate-pulse"
            style="font-family: var(--font-base);"
        >
          Ga naar de app
        </NuxtLink>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────────────────────── -->
    <!-- SUPABASE STATUS SECTION                                          -->
    <!-- ──────────────────────────────────────────────────────────────── -->
    <section class="py-12 bg-[var(--color-surface)] shadow-inner">
      <!--
        max-w-3xl: zelfde breedte als hero voor consistentie
        text-center: alles gecentreerd
      -->
      <div class="max-w-3xl mx-auto px-6 text-center">

        <!-- Titel van de status sectie -->
        <h2
            class="text-2xl font-semibold mb-3"
            style="color: var(--color-primary); font-family: var(--font-title);"
        >
          Supabase verbinding
        </h2>

        <!--
          De actuele status van de Supabase verbinding.
          Wordt dynamisch geüpdatet via Vue reactivity.
        -->
        <p
            class="text-md mb-2 tracking-wide"
            style="color: var(--color-text); font-family: var(--font-base);"
        >
          {{ connectionStatus }}
        </p>

        <!-- Extra uitleg -->
        <p
            class="text-sm"
            style="color: var(--color-text-muted); font-family: var(--font-base);"
        >
          De Supabase client is beschikbaar via
          <code class="font-medium bg-[var(--color-primary-light)]/20 rounded px-1">
            useSupabase()
          </code>.
        </p>
      </div>
    </section>

  </div>
</template>

<script setup>
/*
  SCRIPT SECTION
  --------------
  Hier gebeurt de logica voor het testen van de Supabase verbinding.
  We gebruiken Vue's Composition API (ref, onMounted) en onze eigen
  Supabase composable (useSupabase).
*/

import { ref, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

// Reactive variabele die de status van de verbinding toont
const connectionStatus = ref('Verbinding testen...')

// Haalt de Supabase client op via onze composable
const supabase = useSupabase()

// Wordt uitgevoerd zodra de component in de DOM staat
onMounted(async () => {

  // Als er geen Supabase client is, tonen we een foutmelding
  if (!supabase) {
    connectionStatus.value = '❌ Geen Supabase client beschikbaar'
    return
  }

  try {
    /*
      We proberen de huidige sessie op te halen.
      - Als er een error is → tonen we een waarschuwing
      - Als alles werkt → tonen we een succesmelding
    */
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      connectionStatus.value = `⚠️ Verbinding ok, maar auth error: ${error.message}`
    } else {
      connectionStatus.value = '✅ Supabase verbinding succesvol. Client is klaar voor gebruik.'
    }

  } catch (e) {
    // Algemene foutafhandeling
    connectionStatus.value = `❌ Fout: ${e.message}`
  }
})
</script>

<style scoped>
/*
  PAGE TRANSITION ANIMATIES
  -------------------------
  Deze animaties worden gebruikt wanneer de pagina in- of uitfade.
  Nuxt ondersteunt page transitions automatisch.
*/

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
