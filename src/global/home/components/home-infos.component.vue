<template>
  <div class="container">
    <v-container fluid>
      <v-row class="justify-center text-section">
        <v-col cols="12" md="8">
          <div class="text">
            <p>Sistema de Agendamento de Consultas Médicas</p>
          </div>
          <div class="text-description">
            <p>Somos a solução eficiente para a alta demanda de agendamento de consultas médicas,
              atendendo às solicitações dos pacientes em diferentes horários.</p>
          </div>
        </v-col>
      </v-row>
      <v-row class="feature-list">
        <v-col v-for="value in values" :key="value.title" cols="12" md="4" class="feature-item">
          <v-card class="feature-card">
            <v-img :src="getImage(value.img)" alt="Ícone" class="icon"></v-img>
            <v-card-title class="feature-title">{{ value.title }}</v-card-title>
            <v-card-text class="feature-description">{{ value.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class HomeInfos extends Vue {
  // Definindo as propriedades do componente
  values: Array<{ title: string; text: string; img: string }> = [
    {
      title: 'Organização',
      text: 'Suas consultas organizadas em um só lugar, facilitando o acesso e a visualização das informações.',
      img: 'icons/calendario.png',
    },
    {
      title: 'Facilidade',
      text: 'Acesse o sistema de qualquer lugar, a qualquer hora, sem precisar sair de casa ou esperar horas ao telefone.',
      img: 'icons/celular.png',
    },
    {
      title: 'Rapidez',
      text: 'Agende suas consultas de forma rápida, sem precisar esperar horas ao telefone ou na fila do consultório.',
      img: 'icons/relogio.png',
    },
  ];

  // Método para obter a imagem
  getImage(img: string) {
    return require(`@/assets/${img}`);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.container {
  background-color: #fff;
}

.text-section {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.text {
  text-align: center;
  padding: 10px;
}

.text p {
  color: #2eacb2;
  font-size: 2.5rem;
  font-family: 'Montserrat';
  padding: 5px;
  width: 100%;
}

.text-description {
  text-align: center;
  font-size: 1.3rem;
  font-family: 'Montserrat';
}

.icon {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon img {
  width: 60%;
  height: 60%;
}

.feature-list {
  display: flex;
  justify-content: center;
}

.feature-item {
  display: flex;
  justify-content: center;
}

.feature-card {
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.feature-title {
  font-size: 1.8rem;
  font-family: 'Montserrat';
  color: #2eacb2;
  margin-bottom: 1rem;
}

.feature-description {
  font-size: 1rem;
  font-family: 'Montserrat';
  color: #666666;
}

@media (max-width: 768px) {
  .text h2 {
    font-size: 2.2rem;
  }

  .text p {
    font-size: 1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .icon {
    width: 80px;
    height: 80px;
  }

  .feature-title {
    font-size: 1.4rem;
  }
}
</style>
