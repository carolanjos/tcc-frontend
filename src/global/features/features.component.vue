<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-row justify="center" align="center">
            <v-col cols="12" md="8">
              <v-card class="elevation-12 features-card">
                <v-card-title class="justify-center">
                  <span class="features-title">Funcionalidades do MedicalTime</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col
                      v-for="(feature, index) in features"
                      :key="index"
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-card class="feature-item" elevation="2">
                        <v-card-text class="text-center">
                          <v-icon size="40" color="#2EACB2">{{ feature.icon }}</v-icon>
                          <div class="feature-text">{{ feature.title }}</div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="#2EACB2" class="action-button" @click="voltar">
                    Voltar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script lang="ts">
  import Component from 'vue-class-component';
  import NavBar from '@/global/navbar/navbar.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  import Vue from 'vue';
  
  interface Feature {
    title: string;
    icon: string;
  }
  
  @Component({
    components: {
      NavBar,
      Footer,
    },
  })
  export default class Features extends Vue {
    features: Feature[] = [
      { title: 'Cadastro de pacientes', icon: 'mdi-account-plus' },
      { title: 'Agendamento de consultas', icon: 'mdi-calendar-check' },
      { title: 'Visualização de consultas', icon: 'mdi-eye' },
      { title: 'Cancelamento de consultas', icon: 'mdi-calendar-remove' },
      { title: 'Gerenciamento de escalas', icon: 'mdi-timetable' },
    ];
  
    voltar() {
      this.$router.push('/dashboard');
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  .container {
    padding-top: 10px;
    background-color: #f0f4f8;
    margin-bottom: 100px;
  }
  
  .features-card {
    border-radius: 16px;
    background-color: white;
    padding: 20px;
  }
  
  .features-title {
    font-size: 32px;
    color: #2EACB2;
    font-family: 'Montserrat';
    margin-bottom: 20px;
  }
  
  .feature-item {
    transition: transform 0.3s;
    cursor: pointer;
    background-color: #f9f9f9;
    border-radius: 12px;
  }
  
  .feature-item:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .feature-text {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
    color: #424242;
    font-family: 'Montserrat';
  }
  
  .action-button {
    margin-top: 20px;
    font-weight: bold;
    color: #fff;
  }
  
  @media (max-width: 600px) {
    .feature-text {
      font-size: 14px;
    }
  }
  </style>
  