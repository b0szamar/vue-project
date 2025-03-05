<template>
    <div class="container text-center">
        <h1 class="mt-5 mb-4">Üdvözöllek a Turbo Fodrásznál!</h1>
        <button @click="goToAppointments" class="btn btn-primary btn-lg">Foglalj időpontot</button>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
    methods: {
        goToAppointments() {
            this.$router.push('/idopont');
        }
    }
}
</script>

