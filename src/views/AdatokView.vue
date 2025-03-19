<template>
    <div class="container mt-4">
      <h1 class="mb-4">Személyes adatok megadása</h1>
  
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <form @submit.prevent="submitForm">
        <div class="form-group mb-3">
          <label for="nev" id="nev">Név</label>
          <input type="text" id="nev" v-model="nev" class="form-control" required />
          <div v-if="errors.nev" class="text-danger">{{ errors.nev }}</div>
        </div>
  
        <div class="form-group mb-3">
          <label for="telefonszam">Telefonszám</label>
          <input type="text" id="telefonszam" v-model="telefonszam" class="form-control" required />
          <div v-if="errors.telefonszam" class="text-danger">{{ errors.telefonszam }}</div>
        </div>
  
        <button type="submit" class="btn btn-primary mt-3" :disabled="isSubmitting">
          {{ isSubmitting ? 'Feldolgozás...' : 'Foglalás megerősítése' }}
        </button>
        <button type="button" class="btn btn-secondary mt-3 ms-2" @click="goBack">Vissza</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { useToast } from 'vue-toastification';
  const toast=useToast();
  const nev = ref('');
  const telefonszam = ref('');
  const error = ref(null);
  const isSubmitting = ref(false);
  const errors = ref({});
  const selectedDate = ref('');
  const selectedTime = ref('');
  
  onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    selectedDate.value = params.get('date') || sessionStorage.getItem('selectedDate') || '';
    selectedTime.value = params.get('time') || sessionStorage.getItem('selectedTime') || '';
    if (!selectedDate.value || !selectedTime.value) window.location.href = '/';
  });
  
  const validateForm = () => {
    errors.value = {};
    if (!nev.value.trim()) errors.value.nev = 'A név megadása kötelező!';
    if (!telefonszam.value.trim()) errors.value.telefonszam = 'A telefonszám megadása kötelező!';
    else if (!/^\+36\d{9}$/.test(telefonszam.value))
    {
      errors.value.telefonszam = 'Érvénytelen telefonszám formátum! (pl: +36301234567)';
    toast.error("Érvénytelen telefonszám formátum! (pl: +36301234567)")
    }

    return Object.keys(errors.value).length === 0;
  };
  
  const submitForm = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;
  error.value = null;

  try {
    await axios.post('http://localhost:3000/idopont', {
      datum: selectedDate.value,
      ora: parseInt(selectedTime.value.split(':')[0]),
      telefonszam: telefonszam.value,
      nev: nev.value,
    });

    sessionStorage.setItem('toastMessage', 'Sikeres időpontfoglalás!'); 
    clearFormAndStorage();
    window.location.href = '/'; 
  } catch (err) {
    error.value = `Hiba történt: ${err.message}`;
  } finally {
    isSubmitting.value = false;
  }
};

  const clearFormAndStorage = () => {
    nev.value = telefonszam.value = '';
    sessionStorage.removeItem('selectedDate');
    sessionStorage.removeItem('selectedTime');
  };
  
  const goBack = () => (window.location.href = '/idopont');
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  </style>
  