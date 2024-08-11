<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-layout align-center justify-center>
            <v-flex xs12 sm10 md8>
              <v-card class="elevation-12 success-card">
                <v-card-text>
                  <v-layout align-center justify-center column>
                    <h1 class="success-title">Agendamento realizado com sucesso!</h1>
                    <v-icon class="success-icon" size="80">mdi-check-circle</v-icon>
                    <v-layout row justify-center>
                      <v-btn class="success-button" @click="newAppointment">Novo Agendamento</v-btn>
                      <v-btn class="success-button" @click="myAppointments">Minhas Consultas</v-btn>
                    </v-layout>
                  </v-layout>
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
  import NavBar from '@/global/navbar/navbar.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  
  @Component({
    components: {
      NavBar,
      Footer
    }
  })
  export default class SuccessPage extends Vue {
    newAppointment() {
      // Navegar para a página de novo agendamento
      this.$router.push('/schedule-appointment');
    }
  
    myAppointments() {
      // Navegar para a página de minhas consultas
      this.$router.push('/list-consult');
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 60px 20px;
  }
  
  .success-card {
    padding: 40px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    background-color: #fff;
  }
  
  .success-title {
    font-size: 30px;
    text-align: center;
    padding: 10px 10px;
    justify-content: center;
    color: #333;
  }
  
  .success-icon {
    color: #4caf50;
    margin: 20px 0;
  }
  
  .success-button {
    margin: 20px;
    background-color: #487890;
    color:#040607;
    font-weight: bold;
    text-transform: none;
  }
  
  .success-button:hover {
    background-color: #2EACB2;
  }
  </style>
  