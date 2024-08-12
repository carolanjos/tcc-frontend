<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container class="container">
        <v-card class="elevation-12">
          <v-card-title class="headline">Editar Perfil</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="userProfile.name"
                label="Nome"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="userProfile.email"
                label="Email"
                :rules="[rules.required, rules.email]"
              />
              <v-alert v-if="error" type="error">{{ error }}</v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :loading="loading" color="primary" @click="updateProfile">Salvar</v-btn>
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
import UserProfile from '@/modules/Register/EditProfile/entities/edit-profile.entity';
import EditProfileService from '@/modules/Register/EditProfile/services/edit-profile.service';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class EditProfile extends Vue {
  valid = false;
  loading = false;  // New loading state
  error: string | null = null;  // New error state
  userProfile: UserProfile = new UserProfile(0, '', '');

  rules = {
    required: (value: string) => !!value || 'Campo obrigatório.',
    email: (value: string) => {
      const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      return pattern.test(value) || 'Email inválido.';
    },
  };

  async mounted() {
    this.loading = true;  // Start loading
    try {
      this.userProfile = await EditProfileService.fetchUserProfile();
    } catch (error) {
      this.error = 'Erro ao buscar perfil do usuário.';  // Set error message
      console.error('Erro ao buscar perfil do usuário:', error);
    } finally {
      this.loading = false;  // End loading
    }
  }

  async updateProfile() {
    this.error = null;  // Reset error message
    try {
      if (this.$refs.form && (this.$refs.form as any).validate()) {
        this.loading = true;  // Start loading
        await EditProfileService.updateUserProfile(this.userProfile);
        this.$router.push('/dashboard');
      }
    } catch (error) {
      this.error = 'Erro ao atualizar perfil do usuário.';  // Set error message
      console.error('Erro ao atualizar perfil do usuário:', error);
    } finally {
      this.loading = false;  // End loading
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 40px;
}

.headline {
  font-size: 24px;
}

.elevation-12 {
  padding: 20px;
}

.v-btn {
  margin-left: auto;
}
</style>
