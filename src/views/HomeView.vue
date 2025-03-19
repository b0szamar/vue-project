<template>
    <div class="container text-center">
      <h1 class="mt-5 mb-4">Üdvözöllek a fodrásznál!</h1>
      <button @click="goToAppointments" class="btn btn-primary btn-lg">Foglalj időpontot</button>
    </div>
  </template>
  <script>
  import { onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  export default {
    setup() {
      const toast = useToast();
  
      onMounted(() => {
        const message = sessionStorage.getItem('toastMessage');
        if (message) {
          toast.success(message);
          sessionStorage.removeItem('toastMessage'); 
        }
      });
  
      return {
        goToAppointments: () => window.location.href = '/idopont',
      };
    }
  };
  </script>
  