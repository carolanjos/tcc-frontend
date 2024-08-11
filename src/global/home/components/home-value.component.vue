<template>
  <v-container fluid class="container-test">
    <v-row class="mt-1 justify-center">
      <v-col cols="12" md="8">
        <v-card-text>
          <p class="section-title">Nossos valores</p>
        </v-card-text>
        <v-row>
          <v-col cols="12" md="12" v-for="(value, index) in values" :key="index">
            <v-card class="mb-4 value-card">
              <v-row no-gutters>
                <v-col cols="12" md="4">
                  <v-img :src="getImage(value.img)" height="200px" class="img-card"></v-img>
                </v-col>
                <v-col cols="12" md="8" class="card-content">
                  <v-card-text class="title">
                    <p>{{ value.title }}</p>
                  </v-card-text>
                  <v-card-text class="card-text">
                    <p>{{ value.text }}</p>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface Value {
  title: string;
  text: string;
  img: string;
}

@Component
export default class CardLayout extends Vue {
  values: Value[] = [
    {
      title: 'Comprometimento com a Saúde',
      text: 'Nosso foco é melhorar o acesso aos cuidados de saúde, ajudando os pacientes a encontrar e agendar consultas de maneira mais rápida e fácil.',
      img: 'list/medico.jpg',
    },
    {
      title: 'Confiabilidade',
      text: 'Garantir que o sistema seja confiável e que os dados dos pacientes estejam sempre seguros, com alta disponibilidade e precisão nas informações.',
      img: 'list/secury.jpg',
    },
    {
      title: 'Inovação',
      text: 'Buscando constantemente novas tecnologias e métodos para melhorar o serviço oferecido, mantendo-se atualizado com as tendências do setor de saúde e tecnologia.',
      img: 'list/inovation.jpg',
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

.container-test {
  background: linear-gradient(135deg, #2EACB2, #0C8B8B);
  min-height: 60vh;
  width: 100vw;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.value-card {
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.img-card {
  object-fit: cover;
  border-radius: 12px 0 0 12px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.title {
  font-size: 1.6rem;
  color: #2EACB2;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  color: #555;
  font-family: 'Montserrat', sans-serif;
}

@media (max-width: 768px) {
  .value-card {
    border-radius: 12px;
  }
  .img-card {
    border-radius: 12px 12px 0 0;
  }
  .card-content {
    text-align: center;
    padding: 1rem 0.5rem;
  }
  .title {
    font-size: 1.4rem;
  }
  .card-text {
    font-size: 0.9rem;
  }
}
</style>
