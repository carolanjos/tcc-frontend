<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container class="container">
        <v-card class="edit-card elevation-12">
          <v-card-title class="edit-title">Editar Perfil</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="userProfile.name"
                label="Nome"
                class="input-title"
                outlined
              />

              <v-text-field
                v-model="userProfile.email"
                label="Email"
                class="input-title"
                outlined
              />

              <v-text-field
                v-model="userProfile.phone"
                label="Telefone"
                class="input-title"
                outlined
              />
              
              <v-text-field
                v-model="userProfile.date_birth"
                label="Data de Nascimento"
                class="input-title"
                outlined
              />

              <v-text-field
                v-model="userProfile.document"
                label="Documento"
                class="input-title"
                outlined
              />

              <template v-if="isDoctor">
                <v-text-field
                  v-model="userProfile.crm"
                  label="CRM"
                  class="input-title"
                  outlined
                />
                <v-select
                  v-model="userProfile.specialties"
                  :items="specialties"
                  placeholder="Especialidades"
                  item-text="name"
                  item-value="id"
                  :deletable-chips="userProfile.specialties.length>1"
                  multiple
                  chips
                  class="input-title"
                  outlined
                />
              </template>
            </v-form>
          </v-card-text>

          <v-card-actions class="edit-actions">
            <v-btn class="edit-button" color="#2EACB2" @click="updateProfile">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import EditProfileService from '@/modules/Register/EditProfile/services/edit-profile.service';
import AuthService from '@/services/auth.service';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class EditProfile extends Vue {
  valid = false;
  isDoctor = false;
  specialties: Array<{ id: number; name: string }> = []; 
  userProfile: any = {}; 
  originalProfile: any = {}; 

  async created() {
  try {
      const role = await AuthService.getRole();
      this.isDoctor = role === 'medico';

      this.userProfile = await EditProfileService.fetchUserProfile();

      if (this.isDoctor) {
        const specialtiesFromList = await EditProfileService.listSpecialties();
        this.specialties = specialtiesFromList;
      }
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  }

  async updateProfile() {
    try {
      // const updatedProfile: any = {};

      // for (const key in this.userProfile) {
      //   if (JSON.stringify(this.userProfile[key]) !== JSON.stringify(this.originalProfile[key])) {
      //     updatedProfile[key] = this.userProfile[key];
      //   }
      // }

      // if (this.isDoctor) {
      //   if (this.userProfile.crm !== this.originalProfile.crm) {
      //     updatedProfile.crm = this.userProfile.crm;
      //   }
      //   if (JSON.stringify(this.userProfile.specialties) !== JSON.stringify(this.originalProfile.specialties)) {
      //     updatedProfile.specialties = this.userProfile.specialties;
      //   }
      // }

      // if (Object.keys(updatedProfile).length === 0) {
      //   alert('Nenhuma alteração foi feita.');
      //   return;
      // }

      await EditProfileService.updateUserProfile(this.userProfile);
      this.$router.push('/edit-profile');
      alert('Perfil atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      if (error.response && error.response.status === 403) {
        alert('Você não tem permissão para editar este perfil.');
      } else if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        let errorMessage = 'Erro ao atualizar o perfil:\n';
        for (const field in errors) {
          errorMessage += `${field}: ${errors[field].join(', ')}\n`;
        }
        alert(errorMessage);
      } else {
        alert('Erro ao atualizar o perfil. Tente novamente.');
      }
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  * {
    font-family: 'Poppins', sans-serif;
  }
  
  .container {
    padding: 40px 20px;
  }
  .edit-title {
    color: #1c7e83;
    font-family: 'Montserrat';
    font-size: 35px;
    justify-content: center;
  }
  .edit-card {
    padding: 40px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }
  
  .edit-button {
    font-weight: bold;
    font-size: 15px;
    color: #fff;
    background-color: #2EACB2;
    width: 100%;
  }
  
  .edit-actions {
    justify-content: center;
    margin-top: 5px;
  }
  
  .v-text-field input,
  .v-select input {
    background: #f9f9f9;
  }
  
  .v-text-field input::placeholder,
  .v-select input::placeholder {
    color: #a0a0a0;
  }
  
  .v-btn {
    background-color: #2EACB2;
  }
  
  .v-btn:hover {
    background-color: #1c7e83;
    color: #fff !important;
  }
  
  .input-title {
    text-align: left;
    margin: 5px 0;
    font-weight: bold;
    color: #1c7e83;
    font-size: 18px;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  @media (max-width: 768px) {
    .edit-card {
      width: 100%;
      margin: 0 10px;
    }
  }
</style>