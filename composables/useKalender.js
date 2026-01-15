import { ref, computed } from 'vue'

export const useKalender = () => {
  const currentDate = ref(new Date())

  const month = computed(() => currentDate.value.getMonth())
  const year = computed(() => currentDate.value.getFullYear())

  // Generate days for the current month
  const days = computed(() => {
    const firstDay = new Date(year.value, month.value, 1)
    const lastDay = new Date(year.value, month.value + 1, 0)
    
    // Get the starting weekday (0 = Sunday)
    const startingDayOfWeek = firstDay.getDay()
    
    // Create array of days
    const daysArray = []
    
    // Add empty days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year.value, month.value, -i)
      daysArray.push({
        date: new Date(prevDate),
        label: prevDate.getDate(),
        isCurrentMonth: false
      })
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year.value, month.value, i)
      daysArray.push({
        date: new Date(date),
        label: i,
        isCurrentMonth: true
      })
    }
    
    // Add empty days from next month
    const remainingDays = 42 - daysArray.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year.value, month.value + 1, i)
      daysArray.push({
        date: new Date(nextDate),
        label: nextDate.getDate(),
        isCurrentMonth: false
      })
    }
    
    return daysArray
  })

  const prevMonth = () => {
    currentDate.value = new Date(year.value, month.value - 1, 1)
  }

  const nextMonth = () => {
    currentDate.value = new Date(year.value, month.value + 1, 1)
  }

  const goToToday = () => {
    currentDate.value = new Date()
  }

  return {
    month,
    year,
    days,
    prevMonth,
    nextMonth,
    goToToday,
    currentDate
  }
}
