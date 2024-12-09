<template>
    <v-container fluid class="pa-0"> <!-- Remover o padding e tornar o container fluido -->
      <v-carousel
        cycle
        height="450"
        hide-delimiters
        class="carousel-background"
        show-arrows
      >
    
        <!-- Testimonial 1 -->
        <v-carousel-item>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <v-avatar size="170" class="mx-auto">
                <v-img src="@/assets/users/user3.jpeg"></v-img>
              </v-avatar>
              <p class="testimonial-text">
                Colocar o MedicalTime na minha clínica foi a melhor decisão que tomei. O sistema é completo e fácil de usar.
              </p>
              <p class="author">ROSANGELA MARTINS<br />Clínica Mais Saúde - SP</p>
            </v-col>
          </v-row>
        </v-carousel-item>
  
        <!-- Testimonial 2 -->
        <v-carousel-item>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <v-avatar size="170" class="mx-auto">
                <v-img src="@/assets/users/user4.jpeg"></v-img>
              </v-avatar>
              <p class="testimonial-text">
                Depois que comecei a usar o MedicalTime, a gestão da minha clínica ficou muito mais organizada e eficiente. Os clientes estão elogiando pela facilidade de agendamento e os nossos funcionários estão mais satisfeitos.
              </p>
              <p class="author">JOSÉ SILVA<br />Rede Grupo Saúde de Qualidade - SP</p>
            </v-col>
          </v-row>
        </v-carousel-item>
  
        <v-carousel-item>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <v-avatar size="170" class="mx-auto">
                <v-img src="@/assets/users/user1.jpeg"></v-img>
              </v-avatar>
              <p class="testimonial-text">
                O agendamento da minha clínica melhorou muito depois que comecei a usar o MedicalTime. Recomendo!
              </p>
              <p class="author">ADRIANA SILVA<br />Consultório CardioBem - SP</p>
            </v-col>
          </v-row>
        </v-carousel-item>

        <v-carousel-item>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <v-avatar size="170" class="mx-auto">
                <v-img src="@/assets/users/user2.jpeg"></v-img>
              </v-avatar>
              <p class="testimonial-text">
                Como gestor de uma clínica, posso dizer que o MedicalTime é a melhor solução para a gestão de consultórios.
              </p>
              <p class="author">EDUARDO SANTOS<br />Consultório Medicina Completa - RJ</p>
            </v-col>
          </v-row>
        </v-carousel-item>
  
      </v-carousel>
    </v-container>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class HomeIndical extends Vue {}
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

  .carousel-background {
    background: linear-gradient(230deg, #0C8B8B, #2EACB2);
    padding: 20px;
    width: 100%;
  }
  
  .testimonial-text {
    font-size: 19px;
    color: white;
    margin: 40px 80px;
    font-family: 'Montserrat';
    line-height: 1.6;
  }
  
  .quote-symbol {
    font-size: 45px;
    color: #FFD700;
  }
  
  .author {
    font-weight: 600;
    color: #fff;
    margin-top: 40px;
    margin-bottom: 20px;
    line-height: 1.75;
    font-family: 'Montserrat';
  }
  
  v-avatar {
    margin-bottom: 15px;
  }
  
  /* Removendo padding do v-container */
  .v-container {
    padding: 0;
  }

  .banner {
    font-size: 2.5rem;
    margin-bottom: 10rem;
    max-width: 23rem;
    color: #fff;
    font-family: Aller Bold;
  }
  
  </style>
  