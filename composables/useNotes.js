import { ref } from 'vue'

// In-memory notes storage
const notesStore = ref(new Map())

export const useNotes = () => {
  // Get note for a specific date
  const getNote = (date) => {
    const key = date.toISOString().split('T')[0]
    return notesStore.value.get(key) || null
  }

  // Save note for a specific date
  const saveNote = (date, content) => {
    const key = date.toISOString().split('T')[0]
    if (content.trim()) {
      notesStore.value.set(key, content)
    } else {
      notesStore.value.delete(key)
    }
  }

  // Delete note for a specific date
  const deleteNote = (date) => {
    const key = date.toISOString().split('T')[0]
    notesStore.value.delete(key)
  }

  // Track which date modal is open for
  const selectedDate = ref(null)

  // Open note modal for a date
  const openNoteModal = (date) => {
    selectedDate.value = date
  }

  // Close note modal
  const closeNoteModal = () => {
    selectedDate.value = null
  }

  return {
    getNote,
    saveNote,
    deleteNote,
    selectedDate,
    openNoteModal,
    closeNoteModal
  }
}
