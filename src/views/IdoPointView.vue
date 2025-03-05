<template>
    <div>
        <h1>Időpont foglalás</h1>
        <div>
            <label for="time">Szabad időpontok:</label>
            <select id="time" v-model="selectedTime">
                <option v-for="time in availableTimes" :value="time">{{ time }}</option>
            </select>
        </div>
        <button @click="bookAppointment">Book Appointment</button>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
    data() {
        return {
            selectedDate: '',
            selectedTime: '',
            availableTimes: ['10:00 ', '11:00 ', '12:00 ', '13:00 ', '14:00 ', '15:00 ']
        };
    },
    methods: {
        bookAppointment() {

            console.log('Appointment booked:', this.selectedDate, this.selectedTime);
        }
    }
};
</script>

<style scoped>

</style>