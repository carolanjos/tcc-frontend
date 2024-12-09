<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 reset-password-card">
              <v-title class="reset-password-title">Esqueceu a Senha</v-title>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <div class="input-title">Email:</div>
                  <v-text-field
                    v-model="email"
                    prepend-inner-icon="mdi-email"
                    placeholder="Email"
                    type="email"
                    required
                    outlined
                  ></v-text-field>
                  <v-btn type="submit" color="#2EACB2" block class="reset-password-button">
                    Enviar Link de Redefinição
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="back-to-login-actions">
                <v-btn key="login" text @click="$router.push('/login')" color="#2EACB2">
                  Voltar para Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import PasswordRecoveryService from '@/modules/Login/ForgotPassword/services/forgot-password.service';
import ForgotPasswordRequest from '@/modules/Login/ForgotPassword/entities/forgost-pasword.entity';
import axios from 'axios';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class ForgotPassword extends Vue {
  private email = '';
  private timeout = 5000;
  
  private async submit() {
    const data: ForgotPasswordRequest = {
      email: this.email,
    };
    console.log('data: AQUUUUUUUUUI', data);
    // try {

    await PasswordRecoveryService.sendResetPasswordLink(data);
    alert('Um link de redefinição de senha foi enviado ao e-mail cadastrado.');
    this.$router.push('/login');
    // } catch (error) {
    //   console.error('Erro ao enviar o email:', error);
    // }
  }

  private async someFunction() {
    setTimeout(() => {
      console.log('Timeout reached');
    }, this.timeout);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.container {
  padding: 60px 20px;
}

.reset-password-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.reset-password-button {
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
}

.back-to-login-actions {
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
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #1c7e83;
  color: #fff !important;
}

.reset-password-title {
  margin-top: 5px;
  font-weight: bold;
  color: #1c7e83;
  justify-content: center;
  font-size: 25px;
}

.input-title {
  text-align: left;
  margin: 5px 0 5px 0;
  font-weight: bold;
  color: #1c7e83;
  font-size: 18px;
}

@media (max-width: 768px) {
  .reset-password-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
