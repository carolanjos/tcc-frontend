<template>
  <v-app>
    <NavBar />
    <div class="patient-dashboard">
      <div class="image">
        <img src="@/assets/person.png" alt="Patient Image" />
      </div>
      <div class="content">
        <h2>Bem-vindo(a) <span class="user-name">{{ name }}!</span></h2>
        <p class="description" style="color: black; font-size: 20px;">
          Escolha o que deseja fazer:
        </p>
        <div class="button-group">
          <div class="button-row">
            <div class="button-item">
              <v-btn class="icon-circle" style="height: 100px; width: 100px;" @click="goToSchedule">
                <v-icon>mdi-calendar-check</v-icon>
              </v-btn>
              <p>Agendar Consulta</p>
            </div>
            <div class="button-item">
              <v-btn class="icon-circle" style="height: 100px; width: 100px;" @click="goToListAppointments">
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
              <p>Listar Consultas</p>
            </div>
          </div>
          <div class="button-row">
            <div class="button-item">
              <v-btn class="icon-circle" style="height: 100px; width: 100px;" @click="goToEditInfo">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <p>Editar Informações</p>
            </div>
            <div class="button-item">
              <v-btn class="icon-circle" style="height: 100px; width: 100px;" @click="goToContact">
                <v-icon>mdi-phone</v-icon>
              </v-btn>
              <p>Fale Conosco</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import localStorageService from '@/services/localStorage.service';
import EditProfileService from '@/modules/Register/EditProfile/services/edit-profile.service'; // ajuste o caminho se necessário
import NavBar from '../navbar/navbar.component.vue';
import Footer from '../footer/footer.component.vue';
import { VApp, VIcon, VBtn } from 'vuetify/lib';

@Component({
  components: {
    NavBar,
    Footer,
    VApp,
    VIcon,
    VBtn,
  },
})
export default class PatientDashboard extends Vue {
  name = '';

  mounted() {
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    try {
      const profile = await EditProfileService.fetchUserProfile();
      this.name = profile.name; // ou o caminho correto para acessar o nome na resposta
      // Opcionalmente, você pode salvar o nome no localStorage se quiser
      localStorageService.setItem('name', this.name);
    } catch (error) {
      console.error('Erro ao buscar o perfil do usuário:', error);
    }
  }

  goToSchedule() {
    this.$router.push('/schedule');
  }

  goToListAppointments() {
    this.$router.push('/list-patient');
  }

  goToEditInfo() {
    this.$router.push('/edit-profile');
  }

  goToContact() {
    this.$router.push('/contact');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.patient-dashboard {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  padding: 50px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat';
  transition: transform 0.3s ease-in-out, background-color 0.3s;
}

.patient-dashboard:hover {
  transform: translateY(-8px);
  background-color: #eef2f6;
}

.content {
  flex: 1;
  padding-left: 50px;
}

.patient-dashboard h2 {
  font-size: 32px;
  color: #2eacb2;
  text-align: center;
}

.user-name {
  color: #2EACB2;
  font-family: 'Montserrat';
  font-size: 32px;
  text-align: center;
}

.description {
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-top: 10px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  transition: transform 0.3s ease-in-out, background-color 0.3s;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  transition: transform 0.3s ease-in-out, background-color 0.3s;
}

.button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, background-color 0.3s;
}

.icon-circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  color: #fff;
  border: 2px solid #2EACB2;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 10px;
  background: linear-gradient(200deg, #2EACB2, #83b5bc);
}

.icon-circle:hover {
  background-color: #1c7e83;
  color: #1c7e83;
}

.image {
  flex: 0 0 auto;
  width: 600px;
  display: flex;
  align-items: stretch;
}

.image img {
  width: 100%;
  height: 100%;
  margin-left: 10px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out, background-color 0.3s;
  margin-left: 10px;
}

.v-application p {
  margin-top: 9px;
  color: #1c7e83;
  font-family: 'Montserrat';
  font-size: 17px;
  margin-bottom: 9px;
  font-weight: 700;
}

.v-icon {
  font-size: 50px;
}

@media (max-width: 768px) {
  .patient-dashboard {
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

  .button-row {
    flex-direction: column;
    align-items: center;
  }

  .button-item {
    width: 100%;
    justify-content: center;
  }
}
</style>
