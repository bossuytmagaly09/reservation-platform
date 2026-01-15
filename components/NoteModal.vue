<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="selectedDate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeNoteModal"></div>

        <!-- Modal content -->
        <div class="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl w-full max-w-md p-8">
          <!-- Header -->
          <div class="mb-6 pb-4 border-b border-purple-500/20">
            <h2 class="text-2xl font-bold text-white mb-2">Notitie voor</h2>
            <p class="text-purple-300 text-sm">
              {{ formatDate(selectedDate) }}
            </p>
          </div>

          <!-- Textarea -->
          <textarea
            v-model="noteContent"
            placeholder="Voeg je notitie in..."
            class="w-full h-32 p-4 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 resize-none"
          ></textarea>

          <!-- Buttons -->
          <div class="flex gap-3 mt-6">
            <button
              @click="closeNoteModal"
              class="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Annuleer
            </button>
            <button
              @click="saveAndClose"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all"
            >
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useNotes } from '~/composables/useNotes'

const { selectedDate, closeNoteModal, getNote, saveNote } = useNotes()
const noteContent = ref('')

// Watch for date changes and load note
watch(selectedDate, (newDate) => {
  if (newDate) {
    noteContent.value = getNote(newDate) || ''
  }
})

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('nl-BE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Save and close
const saveAndClose = () => {
  if (selectedDate.value) {
    saveNote(selectedDate.value, noteContent.value)
  }
  closeNoteModal()
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
