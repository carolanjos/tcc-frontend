<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12 dashboard-card">
                <v-title class="dashboard-title">Você está logado(a)</v-title>
                <v-card-text>
                  <v-subtitle class="dashboard-subtitle">Escolha a opção que deseja</v-subtitle>
                  <v-btn block color="#2EACB2" class="dashboard-button" @click="agendarConsulta">Agendar consulta</v-btn>
                  <v-btn block color="#2EACB2" class="dashboard-button" @click="reagendarConsulta">Reagendar consulta</v-btn>
                  <v-btn block color="#2EACB2" class="dashboard-button" @click="listarConsultas">Listar consultas</v-btn>
                  <v-btn block color="#2EACB2" class="dashboard-button" @click="alterarInformacoes">Alterar informações</v-btn>
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
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  import Vue from 'vue';
  
  @Component({
    components: {
      NavBar,
      Footer
    }
  })
  export default class PacienteDashboard extends Vue {
    agendarConsulta() {
      this.$router.push('/agendar-consulta');
    }
  
    reagendarConsulta() {
      this.$router.push('/reagendar-consulta');
    }
  
    listarConsultas() {
      this.$router.push('/listar-consultas');
    }
  
    alterarInformacoes() {
      this.$router.push('/alterar-informacoes');
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 80px 10px;
  }
  
  .dashboard-card {
    padding: 80px 80px;
    border-radius: 18px;
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }
  
  .dashboard-button {
    margin-top: 20px;
    font-weight: bold;
    color: #fff;
  }
  
  .dashboard-title {
    font-size: 25px;
    text-align: center;
    padding: 25px 15px;
  }
  
  .dashboard-subtitle {
    font-size: 20px;
    text-align: center;
    padding: 20px 10px;
  }
  
  @media (max-width: 768px) {
    .dashboard-card {
      width: 100%;
      margin: 0 10px;
    }
  }
  </style>
  