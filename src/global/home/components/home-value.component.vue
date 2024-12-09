<template>
  <v-container fluid class="container-modern">
    <v-row class="mt-5 justify-center align-center">
      <div class="title-container">
        <p class="section-title">NOSSOS<br />VALORES</p>
      </div>
      <v-col cols="12" md="8">
        <v-row class="justify-space-between">
          <v-col cols="12" md="4" v-for="(value, index) in values" :key="index">
            <v-card class="mb-4 modern-card">
              <v-img :src="getImage(value.img)" height="180px" cover></v-img>
              <v-card-text class="content-container">
                <h3 class="title">{{ value.title }}</h3>
                <p class="card-text">{{ value.text }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CardLayout extends Vue {
  values = [
    {
      title: 'Comprometimento',
      text: 'O foco é melhorar o acesso aos cuidados de saúde de maneira rápida e fácil.',
      img: 'list/medico.jpg',
    },
    {
      title: 'Confiabilidade',
      text: 'Dados dos pacientes sempre seguros, com alta disponibilidade e precisão.',
      img: 'list/secury.jpg',
    },
    {
      title: 'Inovação',
      text: 'Novas tecnologias para melhorar os serviços e atualizar tendências do setor.',
      img: 'list/inovation.jpg',
    },
  ];

  getImage(img: string) {
    return require(`@/assets/${img}`);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.container-modern {
  background-color: #f7f7f7;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-card {
  background-color: #fff;
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
}

.section-title {
  color: #2EACB2;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 600;
  font-family: 'Montserrat';
  letter-spacing: 0.08em;
  word-wrap: break-word; /* Quebra de palavra */
  overflow-wrap: break-word;
  margin-right: 50px;
}

.modern-card {
  background: linear-gradient(230deg, #0C8B8B, #2EACB2);
  color: #333;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  position: relative;
}

.modern-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.v-img {
  width: 100%;
  border-bottom: 4px solid #2EACB2;
}

.content-container {
  padding: 1.2rem;
  text-align: left;
}

.title {
  font-size: 1.4rem;
  color: #fff;
  font-family: 'Montserrat';
  margin-bottom: 0.6rem;
}

.card-text {
  font-size: 0.85rem;
  color: #fff;
  font-family: 'Montserrat';
  line-height: 1.5;
}

.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  /* margin: -20px; */
  margin-bottom: 1px;
}

.container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem; /* Reduzir o tamanho da fonte em telas menores */
  }
}
</style>
