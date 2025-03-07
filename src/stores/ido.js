import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIdoStore = defineStore('ido', () => {
  const selectedDate = ref('')
  const selectedTime = ref('')
  const bookedAppointments = ref([])
  const error = ref(null)

  const allPossibleTimes = ['08:00','09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

  const availableTimes = computed(() => 
    selectedDate.value ? allPossibleTimes.filter(time => 
      !bookedAppointments.value.some(({ datum, ora }) => datum === selectedDate.value && ora === parseInt(time))) : []
  )

  const minDate = computed(() => {
    let today = new Date()
    if (today.getDay() === 6) today.setDate(today.getDate() + 2)
    if (today.getDay() === 0) today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  })

  const maxDate = computed(() => {
    let maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 7)
    return maxDate.toISOString().split('T')[0]
  })

  const isWeekday = date => ![0, 6].includes(new Date(date).getDay())

  return { 
    selectedDate, selectedTime, bookedAppointments, error, availableTimes, minDate, maxDate, isWeekday,
    setSelectedDate: date => { selectedDate.value = date; selectedTime.value = '' },
    setSelectedTime: time => selectedTime.value = time,
    setBookedAppointments: appointments => bookedAppointments.value = appointments,
    setError: err => error.value = err
  }
})
