<template>
  <div class="welcome-section">
    <v-container fluid color="#f7f7f7">
      <v-row class="align-center justify-space-between" color="#f7f7f7">

        <v-col cols="12" md="6" class="text-section" color="#f7f7f7">
          <h1 class="title">SISTEMA DE AGENDAMENTO ONLINE</h1>
          <h2 class="subtitle">PARA CONSULTAS MÉDICAS</h2>
          <v-divider class="divider"></v-divider>
          <p class="description">
            Estamos comprometidos em oferecer uma experiência eficiente e prática para você e seus pacientes. Explore nossas funcionalidades e veja como podemos ajudar a otimizar seu tempo e melhorar a organização do seu consultório. Se precisar de qualquer assistência, estamos à disposição!
          </p>
          <v-btn color="#2EACB2" class="cta-button" @click="goFeatures">Saiba mais</v-btn>
        </v-col>

        <v-col cols="12" md="6" class="image-section" color="#f7f7f7">
          <v-img src="@/assets/imghome.png" alt="Imagem" class="main-image"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component()
export default class HomePage {
  goFeatures() {
    this.$router.push('/features');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* { 
  background-color: #f7f7f7;
  font-family: 'Montserrat';
}
.welcome-section {
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  padding: 50px;
  transition: transform 0.3s ease-in-out;
}

.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    width: 100%;
    padding: 0px;
}

.container--fluid {
    max-width: 100%;
    width: 100%;
}

.title {
  color: #00274D;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Montserrat';
}

.subtitle {
  color: #149393;
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  font-family: 'Montserrat';
}

.v-application .title {
  font-family: 'Montserrat';
}

.divider {
  width: 60px;
  height: 4px;
  background-color: #2EACB2;
  margin: 1rem 0;
}

.description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
  max-width: 500px;
}

.cta-button {
  background-color: #2EACB2;
  color: white;
  font-weight: bold;
  margin-top: 1.5rem;
  border-radius: 20px;
  width: 30%;
}

.image-section {
  display: flex;
  justify-content: center;
}

.main-image {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 48px;
  min-width: 64px;
  padding: 0 16px;
}

.theme--light.v-application {
  background: #FFFFFF;
  color: rgba(0, 0, 0, 0.87);
  background-color: #f7f7f7;
}
</style>
