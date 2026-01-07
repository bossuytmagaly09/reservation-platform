<template>
  <!--
    RESOURCE CARD
    - Compacte kaart met afbeelding, titel, type, beschrijving en reservatiecount
    - Responsive en visueel consistent met de app
  -->
  <div
      class="bg-[var(--color-surface)] rounded-xl shadow-md overflow-hidden transition hover:shadow-lg hover:scale-[1.01]"
  >
    <!-- Afbeelding -->
    <img
        :src="image_url"
        :alt="name"
        class="w-full h-48 object-cover"
    />

    <!-- Content -->
    <div class="p-4 space-y-2 text-left">
      <!-- Titel + Type -->
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-[var(--color-text)]"
            style="font-family: var(--font-title);">
          {{ name }}
        </h3>
        <span class="text-xs px-2 py-1 rounded-full bg-[var(--color-primary-light)]/20 text-[var(--color-primary)]"
              style="font-family: var(--font-base);">
          {{ type }}
        </span>
      </div>

      <!-- Beschrijving -->
      <p class="text-sm text-[var(--color-text-muted)] leading-relaxed"
         style="font-family: var(--font-base);">
        {{ description }}
      </p>

      <!-- Reservatiecount -->
      <p class="text-xs text-[var(--color-text-muted)] mt-2"
         style="font-family: var(--font-base);">
        📅 {{ reservation_count }} reservatie{{ reservation_count === 1 ? '' : 's' }}
      </p>
    </div>
  </div>
</template>

<script setup>
/*
  Props:
  - id: unieke identificatie van de resource
  - name: naam van de resource
  - type: type (bv. lokaal, materiaal)
  - description: korte beschrijving
  - image_url: afbeelding van de resource
  - reservation_count: aantal gekoppelde reservaties
*/
defineProps({
  id: [Number, String],
  name: String,
  type: String,
  description: String,
  image_url: String,
  reservation_count: Number
})
</script>

<style scoped>
/* Subtiele fade-in animatie */
div {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
