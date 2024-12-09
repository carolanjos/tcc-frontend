<template>
  <v-app>
    <NavBar />
    <h1 class="main-title">FUNCIONALIDADES DO SISTEMA</h1>

    <v-container>
      <v-row class="features" justify="space-around">
        <!-- EMPRESA -->
        <v-col cols="12" md="4" class="feature-item">
          <v-card class="elevation-3">
            <v-img class="feature-image" src="@/assets/features/business.jpeg"></v-img>
            <v-card-text>
              <h2 class="feature-title">EMPRESA</h2>
              <p class="feature-text">
                Sistema de agendamento de consultas integrado, gerenciando especialidades e horários disponíveis.
              </p>
              <v-btn color="#2EACB2" class="action-btn" @click="goToContact">Saiba mais</v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- MÉDICO -->
        <v-col cols="12" md="4" class="feature-item">
          <v-card class="elevation-3">
            <v-img class="feature-image" src="@/assets/features/doctors.jpg"></v-img>
            <v-card-text>
              <h2 class="feature-title">MÉDICO</h2>
              <p class="feature-text">
                Acesso fácil ao gerenciamento de consultas e notificações de novos agendamentos.
              </p>
              <v-btn color="#2EACB2" class="action-btn" @click="goToContact">Saiba mais</v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- PACIENTE -->
        <v-col cols="12" md="4" class="feature-item">
          <v-card class="elevation-3">
            <v-img class="feature-image" src="@/assets/features/patients.jpg"></v-img>
            <v-card-text>
              <h2 class="feature-title">PACIENTE</h2>
              <p class="feature-text">
                Agendamento rápido e prático de consultas com especialidades e médicos disponíveis.
              </p>
              <v-btn color="#2EACB2" class="action-btn" @click="goToContact">Saiba mais</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Icon Features -->
      <v-row class="feature-icons" justify="center">
        <v-col cols="12" md="12">
          <v-card class="elevation-12 features-card">
            <v-card-text>
              <v-row justify="center">
                <v-col v-for="(feature, index) in features" :key="index" cols="12" sm="6" md="4" class="text-center">
                  <v-card class="icon-card">
                    <v-icon size="40">{{ feature.icon }}</v-icon>
                    <div class="feature-text">{{ feature.title }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '../navbar/navbar.component.vue';
import Footer from '../footer/footer.component.vue';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class HomeList extends Vue {
  features = [
    { title: 'Cadastro de pacientes', icon: 'mdi-account-plus' },
    { title: 'Agendamento de consultas', icon: 'mdi-calendar-check' },
    { title: 'Visualização de consultas', icon: 'mdi-eye' },
    { title: 'Cancelamento de consultas', icon: 'mdi-calendar-remove' },
    { title: 'Gerenciamento de escalas', icon: 'mdi-timetable' },
    { title: 'Cadastro de médicos', icon: 'mdi-doctor' },
  ];

  funcionalidades = [
    { id: 1, nome: 'Agendamento de Consultas', descricao: 'Permite que o paciente agende consultas com os médicos.' },
    { id: 2, nome: 'Consulta de Exames', descricao: 'Permite que o paciente consulte os resultados de exames.' },
    { id: 3, nome: 'Consulta de Receitas', descricao: 'Permite que o paciente consulte as receitas médicas.' },
    { id: 4, nome: 'Consulta de Prontuários', descricao: 'Permite que o paciente consulte os prontuários médicos.' },
    { id: 5, nome: 'Consulta de Agendas', descricao: 'Permite que o paciente consulte as agendas dos médicos.' },
  ];

  private goToContact() {
    this.$router.push('/contact');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

* {
  font-family: 'Montserrat';
}

.main-title {
  text-align: center;
  color: #149393;
  font-size: 2rem;
  font-weight: bold;
  margin: 40px;
  font-family: 'Montserrat';
}

.features {
  margin-bottom: 10px;
  
}

.feature-item {
  display: flex;
  justify-content: center;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-10px);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00a2a1;
  margin-bottom: 10px;
}

.feature-text {
  font-size: 1rem;
  color: #555;
}

.action-btn {
  margin-top: 10px;
  background-color: #00a2a1;
  color: white;
}

.feature-icons .icon-card {
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.3s;
}

.features-card:hover {
  transform: scale(0.95);
}

.icon-card:hover {
  transform: scale(1.05);
}

.features-card {
  padding: 40px;
  border-radius: 2px;
  margin-bottom: 50px;
}

.funcionalidades-title {
  font-size: 1.75rem;
  margin-bottom: 10px;
}

.funcionalidades-list {
  padding: 0;
  list-style: none;
}

.funcionalidades-list li {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.feature-image {
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.v-icon {
  color: #2eacb2
}

@media (max-width: 768px) {
  .feature-item {
    margin-bottom: 20px;
  }
}
</style>
