<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12 login-card">
                <v-card-title class="login-title">Login</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="login">
                    <div class="input-title">Email:</div>
                    <v-text-field
                      v-model="email"
                      prepend-inner-icon="mdi-account"
                      placeholder="Email"
                      type="email"
                      required
                      outlined
                    ></v-text-field>
                    <div class="input-title">Senha:</div>
                    <v-text-field
                      v-model="password"
                      prepend-inner-icon="mdi-lock"
                      placeholder="Senha"
                      type="password"
                      required
                      outlined
                    ></v-text-field>
                    <v-btn
                      type="submit"
                      color="#2EACB2"
                      block
                      class="login-button"
                    >
                      Login
                    </v-btn>
                  </v-form>
                  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                </v-card-text>
                <v-card-actions class="register-actions">
                  <v-btn
                    key="register"
                    text
                    @click="$router.push('/register')"
                    color="#2EACB2"
                  >
                    Não possui conta? Cadastre-se
                  </v-btn>
                </v-card-actions>
                <v-card-actions class="login-actions">
                  <v-btn text color="#2EACB2" @click="$router.push('/forgot-password')">
                    Esqueceu a senha?
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
  import { defineComponent } from 'vue';
  import { Component, Vue } from 'vue-property-decorator';
  import LoginService from '@/modules/Login/services/login.service';
  import NavBar from '@/global/navbar/navbar.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  
  @Component({
    components: {
      NavBar,
      Footer
    }
  })
  export default class Login extends Vue {
  email = '';
  password = '';
  errorMessage = '';

  async login() {
    try {
      const tokenData = await LoginService.login(this.email, this.password);
      const { access, role } = tokenData;

      localStorage.setItem('token', access);
      localStorage.setItem('role', role);

      let targetRoute = '';
      switch (role) {
        case 'medico':
          targetRoute = '/dashboard-doctor';
          break;
        case 'paciente':
          targetRoute = '/dashboard-patient';
          break;
        case 'admin':
          targetRoute = '/dashboard-admin';
          break;
        default:
          this.errorMessage = 'Role desconhecido. Contate o suporte.';
          return;
      }

      if (this.$route.path !== targetRoute) {
        this.$router.push(targetRoute);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      this.errorMessage = 'Falha no login. Verifique suas credenciais e tente novamente.';
    }
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
  
  .login-card {
    padding: 40px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }
  
  .login-button {
    margin-top: 20px;
    font-weight: bold;
    color: #fff;
    
  }
  
  .login-actions {
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
  
  .register-actions {
    margin-top: 5px;
    font-weight: bold;
    color: #1c7e83;
    justify-content: center;
  }
  
  .login-title {
    margin-top: 5px;
    font-weight: bold;
    color: #1c7e83;
    justify-content: center;
    font-size: 35px;
    font-family: 'Montserrat';
  }
  
  .input-title {
    text-align: left;
    margin: 5px 0;
    font-weight: bold;
    color: #1c7e83;
    font-size: 18px;
    font-family: 'Montserrat';
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  @media (max-width: 768px) {
    .login-card {
      width: 100%;
      margin: 0 10px;
    }
  }
  </style>
  