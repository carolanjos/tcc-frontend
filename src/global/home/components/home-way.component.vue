<template>
    <div class="scheduling-system">
      <div class="image">
        <img src="@/assets/negociacao.jpg" alt="Consultation Image" />
      </div>
      <div class="content">
        <h2>ENTRE EM CONTATO</h2>
        <p class="description">
          Buscamos fazer o melhor desde o primeiro contato:
        </p>
        <ul>
          <li>
            <v-icon class="icon-circle">mdi-phone</v-icon>
            <div>
              <p class="title">Contato Inicial</p>
              <p>Entre em contato através dos nossos canais de comunicação.</p>
            </div>
          </li>
          <li>
            <v-icon class="icon-circle">mdi-file-document-outline</v-icon>
            <div>
              <p class="title">Levantamento de Necessidades</p>
              <p>Vamos realizar uma reunião para entender as necessidades da clínica.</p>
            </div>
          </li>
          <li>
            <v-icon class="icon-circle">mdi-wrench</v-icon>
            <div>
              <p class="title">Customização do Sistema</p>
              <p>Vamos adaptar o sistema para atender às especificações da clínica.</p>
            </div>
          </li>
          <li>
            <v-icon class="icon-circle">mdi-school-outline</v-icon>
            <div>
              <p class="title">Treinamento e Onboarding</p>
              <p>Oferecemos treinamento para a equipe da clínica sobre como utilizar o sistema de agendamento de forma eficaz.</p>
            </div>
          </li>
          <li>
            <v-icon class="icon-circle">mdi-comment-question-outline</v-icon>
            <div>
              <p class="title">Feedback e Suporte</p>
              <p>Após realizar os cadastros, coletamos feedback e oferecemos suporte técnico.</p>
            </div>
          </li>
        </ul>
        <v-btn class="contact-button" color="#fff" large @click="goContact">
          Fale Conosco
        </v-btn>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class HomeWay extends Vue {
    private goContact() {
        this.$router.push('/contact');
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
  
  .scheduling-system {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 20px;
    padding: 10px 50px 50px;
    background-color: #f9fafb;
    border-radius: 12px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    transition: transform 0.3s ease-in-out, background-color 0.3s;
  }
  
  .scheduling-system:hover {
    transform: translateY(-8px);
    background-color: #eef2f6;
  }
  
  .content {
    flex: 1;
    padding-left: 20px;
  }
  
  .scheduling-system h2 {
    font-size: 32px;
    color: #2eacb2;
    font-weight: 700;
    text-align: left;
    transition: color 0.3s;
  }
  
  .scheduling-system:hover h2 {
    color: #1a8a93;
  }
  
  .scheduling-system .description {
    font-size: 18px;
    color: #555;
  }
  
  .scheduling-system ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .scheduling-system li {
    display: flex;
    align-items: center;
    transition: color 0.3s;
  }
  
  .scheduling-system li:hover {
    color: #1a8a93;
  }
  
  /* Estilo para os ícones com o círculo */
  .icon-circle {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px; /* Tamanho do círculo */
    height: 50px; /* Tamanho do círculo */
    border-radius: 50%; /* Torna o círculo perfeito */
    font-size: 24px; /* Tamanho do ícone */
    color: #2eacb2; /* Cor do ícone */
    border: 2px solid #2eacb2; /* Borda azul ao redor do círculo */
    margin-right: 20px;
    transition: background-color 0.3s, color 0.3s;
    margin-bottom: 10px;
  }
  
  .scheduling-system li:hover .icon-circle {
    background-color: #2eacb2;
    color: #fff; /* Cor do ícone muda quando hover */
  }
  
  .scheduling-system li div {
    display: flex;
    flex-direction: column;
  }
  
  .scheduling-system .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #2eacb2;
  }
  
  .scheduling-system .description {
    font-size: 16px;
    color: #777;
  }
  
  .contact-button {
    margin-top: 20px;
    align-self: center;
    transition: transform 0.3s;
    color: #2eacb2;
    font-weight: bold;
    font-size: 20px;
    border: 2px solid #2eacb2;
    border-radius: 20px;
  }
  
  .contact-button:hover {
    transform: translateY(-4px);
  }
  
  .image {
    flex: 0 0 auto;
    width: 350px;
    display: flex;
    align-items: stretch;
  }
  
  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    .scheduling-system {
      flex-direction: column;
      padding: 20px;
    }
  
    .content {
      padding-left: 0;
    }
  
    .image {
      margin-bottom: 20px;
      width: 100%;
    }
  
    .contact-button {
      width: 100%;
      justify-content: center;
    }
  }
  </style>
  