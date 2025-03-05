<template>
    <div class="container mt-4">
        <h1 class="mb-4">Időpont foglalás</h1>
        
        <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Betöltés...</span>
            </div>
        </div>

        <div v-else-if="error" class="alert alert-danger">
            {{ error }}
        </div>

        <div v-else>
            <div class="form-group">
                <label for="date">Válasszon dátumot:</label>
                <input 
                    type="date" 
                    id="date" 
                    v-model="selectedDate" 
                    @change="updateAvailableTimes"
                    class="form-control"
                >
            </div>

            <div class="form-group">
                <label for="time">Szabad időpontok:</label>
                <select 
                    id="time" 
                    v-model="selectedTime" 
                    class="form-control"
                    :disabled="!selectedDate"
                >
                    <option 
                        v-for="time in availableTimes" 
                        :key="time" 
                        :value="time"
                    >
                        {{ time }}
                    </option>
                </select>
            </div>

            <div v-if="availableTimes.length === 0" class="alert alert-warning mt-3">
                Nem elérhető időpont a kiválasztott napon.
            </div>

            <button 
                @click="bookAppointment" 
                class="btn btn-primary mt-3"
                :disabled="!selectedDate || !selectedTime"
            >
                Időpont foglalása
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import router from '@/router'

const selectedDate = ref('')
const selectedTime = ref('')
const bookedAppointments = ref([])
const loading = ref(true)
const error = ref(null)
const allPossibleTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
]

const availableTimes = computed(() => {
    if (!selectedDate.value) return []

    const bookedTimesForDate = bookedAppointments.value
        .filter(appt => appt.datum === selectedDate.value)
        .map(appt => formatTime(appt.ora))

    return allPossibleTimes
        .filter(time => !bookedTimesForDate.includes(time))
})

const fetchAppointments = async () => {
    loading.value = true
    error.value = null

    try {
        const response = await axios.get('http://localhost:3000/idopont')
        bookedAppointments.value = response.data.idopont || []
    } catch (err) {
        bookedAppointments.value = []
    } finally {
        loading.value = false
    }
}
const formatTime = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`
}
const updateAvailableTimes = () => {
    selectedTime.value = ''
}

const bookAppointment = () => {
    if (!selectedDate.value || !selectedTime.value) {
        alert('Kérem válasszon dátumot és időpontot!')
        return
    }
    window.location.href = 'http://localhost:5173/adatok';
}

onMounted(fetchAppointments)
</script>

<style scoped>
.container {
    max-width: 500px;
}
</style>