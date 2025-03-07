<template>
  <div class="container mt-4">
    <h1 class="mb-4">Időpont foglalás</h1>
    <div v-if="idoStore.error" class="alert alert-danger">{{ idoStore.error }}</div>

    <div v-else>
      <div class="form-group">
        <label for="date">Válasszon dátumot:</label>
        <input type="date" id="date" class="form-control"
          :value="idoStore.selectedDate" @change="handleDateChange"
          :min="idoStore.minDate" :max="idoStore.maxDate">
      </div>

      <div v-if="dateError" class="alert alert-danger mt-2">{{ dateError }}</div>

      <div class="form-group mt-3">
        <label for="time">Szabad időpontok:</label>
        <select id="time" class="form-control" :disabled="!validDate || !idoStore.availableTimes.length"
          :value="idoStore.selectedTime" @change="e => idoStore.setSelectedTime(e.target.value)">
          <option value="">Válasszon időpontot</option>
          <option v-for="time in idoStore.availableTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>

      <div v-if="validDate && !idoStore.availableTimes.length" class="alert alert-warning mt-3">
        Nem elérhető időpont a kiválasztott napon.
      </div>

      <button class="btn btn-primary mt-3" :disabled="!validDate || !idoStore.selectedTime" @click="bookAppointment">
        Időpont foglalása
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useIdoStore } from '../stores/ido'
import 'bootstrap/dist/css/bootstrap.min.css'

const idoStore = useIdoStore()
const dateError = ref('')

const validDate = computed(() => idoStore.selectedDate && !dateError.value)

const handleDateChange = (e) => {
  const date = e.target.value
  idoStore.setSelectedDate(date)
  dateError.value = !date ? '' 
    : !idoStore.isWeekday(date) ? 'Csak hétköznapra foglalhat időpontot (hétfőtől péntekig).'
    : (new Date(date) < new Date(idoStore.minDate) || new Date(date) > new Date(idoStore.maxDate)) 
      ? 'Az időpont csak a mai naptól számított 1 héten belül foglalható.' : ''
}

const fetchAppointments = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/idopont')
    idoStore.setBookedAppointments(data)
  } catch (err) {
    idoStore.setError(`Hiba történt: ${err.message}`)
  }
}

const bookAppointment = () => {
  window.location.href = `http://localhost:5173/adatok?date=${idoStore.selectedDate}&time=${idoStore.selectedTime}`
}

onMounted(fetchAppointments)
</script>

<style scoped>
.container { max-width: 500px; }
</style>
