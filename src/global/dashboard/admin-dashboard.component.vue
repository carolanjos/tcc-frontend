<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12 dashboard-card">
                <v-title class="dashboard-title"><span class="user-name">{{ name }}Seja bem vindo(a)</span></v-title>
                <v-card-text>
                  <v-subtitle class="dashboard-subtitle">Escolha a opção que deseja</v-subtitle>
                    <v-btn block color="#2EACB2" class="dashboard-button" @click="listarUsuarios">Listar usuários</v-btn>
                    <v-btn block color="#2EACB2" class="dashboard-button" @click="consultarAgenda">Consultar agenda</v-btn>
                    <v-btn block color="#2EACB2" class="dashboard-button" @click="cadastrarMedico">Cadastrar médico</v-btn>
                    <v-btn block color="#2EACB2" class="dashboard-button" @click="criarAgenda">Criar agenda</v-btn>
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
  import NavBar from '@/global/navbar/navbar.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  import LocalStorageService from '@/services/localStorage.service';
  import Vue from 'vue';
  
  @Component({
    components: {
      NavBar,
      Footer
    }
  })
  export default class AdminDashboard extends Vue {
    name = ''; // Declare the 'name' property

    mounted() {
      this.name = LocalStorageService.getItem('userName') || '';
      console.log('Nome recuperado do LocalStorage:', this.name); // Verifique o nome recuperado
    }
  
    consultarAgenda() {
      this.$router.push('/list-consult');
    }
  
    listarUsuarios() {
      // Add your logic here for the 'listarUsuarios' method.
    }
  
    cadastrarMedico() {
      this.$router.push('/register-doctor');
    }
  
    criarAgenda() {
      this.$router.push('/create-agenda');
      console.log('Sucesso ao ir para a página de criar agenda');
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

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
    color: #1c7e83;
    font-family: 'Montserrat';
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
  