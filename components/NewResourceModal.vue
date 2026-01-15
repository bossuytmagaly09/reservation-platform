<script setup>
import { useDataStore } from '@/stores/useDataStore'
import { reactive, ref, onMounted, computed } from 'vue'

const props = defineProps(['show'])
const emit = defineEmits(['close', 'success'])
const dataStore = useDataStore()

const isSubmitting = ref(false)

const form = reactive({
  name: '',
  description: '',
  typeId: '' // Dit wordt het ID van resources_types
})

// Types ophalen zodra de popup opent
onMounted(async () => {
  await dataStore.fetchTypes()
})

// VALIDATIE: Check of alles is ingevuld
const isFormValid = computed(() => {
  return form.name.trim() !== '' &&
      form.description.trim() !== '' &&
      form.typeId !== ''
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true

  const payload = {
    name: form.name,
    description: form.description,
    resources_types_id: form.typeId // Foreign key naar types tabel
  }

  const result = await dataStore.createResource(payload)

  isSubmitting.value = false

  if (result.success) {
    // Reset form
    form.name = ''
    form.description = ''
    form.typeId = ''
    emit('success')
    emit('close')
  } else {
    alert('Er ging iets mis: ' + result.error.message)
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">

    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-md p-6 overflow-hidden">

      <h2 class="text-xl font-semibold text-white mb-6">Nieuwe Resource Toevoegen</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <div>
          <label class="block text-sm text-slate-400 mb-1">Naam Resource</label>
          <input
              v-model="form.name"
              type="text"
              placeholder="Bijv. MacBook Pro 2023"
              class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none placeholder-slate-600 transition"
          />
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-1">Type</label>
          <div class="relative">
            <select
                v-model="form.typeId"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled selected>Selecteer een type...</option>
              <option v-for="type in dataStore.types" :key="type.id" :value="type.id">
                {{ type.type }}
              </option>
            </select>
            <div class="absolute right-3 top-3.5 pointer-events-none text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-1">Omschrijving</label>
          <textarea
              v-model="form.description"
              rows="3"
              placeholder="Korte beschrijving van de resource..."
              class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none placeholder-slate-600 transition resize-none"
          ></textarea>
        </div>

        <div class="pt-2 flex gap-3">
          <button
              type="button"
              @click="$emit('close')"
              class="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 rounded-lg font-medium transition"
          >
            Annuleren
          </button>

          <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="flex-1 py-3 rounded-lg font-medium transition shadow-lg"
              :class="isFormValid && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
              : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'"
          >
            {{ isSubmitting ? 'Opslaan...' : 'Toevoegen' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>