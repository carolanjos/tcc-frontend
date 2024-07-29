<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12 appointment-card">
                <v-title class="appointment-title">Agendamento</v-title>
                <v-card-text>
                  <v-form @submit.prevent="scheduleAppointment">
                    <v-select
                      v-model="specialty"
                      :items="specialties"
                      label="Especialidade"
                      required
                      outlined
                    ></v-select>
                    <v-text-field
                      v-model="date"
                      label="Data"
                      type="date"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="time"
                      label="Hora"
                      type="time"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="doctor"
                      label="Médico"
                      required
                      outlined
                    ></v-text-field>
                    <v-btn type="submit" color="#2EACB2" block class="appointment-button">Agendar</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  
  @Component({
    components: {
      NavBar,
      Footer
    }
  })
  export default class ScheduleAppointment extends Vue {
    specialty = '';
    date = '';
    time = '';
    doctor = '';
    specialties = [
      'Cardiologia',
      'Dermatologia',
      'Gastroenterologia',
      'Neurologia',
      'Ortopedia',
      'Pediatria',
      'Psiquiatria',
      'Urologia'
    ];
  
    scheduleAppointment() {
      // Lógica para agendar a consulta
      console.log(`Especialidade: ${this.specialty}`);
      console.log(`Data: ${this.date}`);
      console.log(`Hora: ${this.time}`);
      console.log(`Médico: ${this.doctor}`);
      alert('Consulta agendada com sucesso!');
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 60px 20px;
  }
  
  .appointment-card {
    padding: 40px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }
  
  .appointment-title {
    font-size: 30px;
    text-align: center;
    padding: 10px 10px;
    justify-content: center;
  }
  
  .appointment-button {
    margin-top: 20px;
    font-weight: bold;
    color: #fff;
  }
  
  .v-text-field input {
    background: #f9f9f9;
  }
  
  .v-text-field input::placeholder {
    color: #a0a0a0;
  }
  
  .v-btn {
    transition: background-color 0.3s ease;
  }
  
  .v-btn:hover {
    background-color: #1c7e83;
    color: #fff !important;
  }
  
  @media (max-width: 768px) {
    .appointment-card {
      width: 100%;
      margin: 0 10px;
    }
  }
  </style>
  