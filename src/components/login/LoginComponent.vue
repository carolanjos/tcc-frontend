<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 login-card">
              <v-title class="login-title">Login</v-title>
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
import Component from 'vue-class-component';
import Vue from 'vue';
import axios from '@/utils/axios';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

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
      const response = await axios.post('/api/token/', {
        email: this.email,
        password: this.password
      });
      const token = response.data.access;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken.role;

      // Armazenar o token e o papel do usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirecionar para a dashboard apropriada
      if (role === 'medico') {
        this.$router.push('/dashboard-medico');
      } else if (role === 'paciente') {
        this.$router.push('/dashboard-paciente');
      } else {
        // Redirecionar para uma página padrão se o papel do usuário não for reconhecido
        this.$router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Falha no login. Verifique suas credenciais e tente novamente.';
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
}

.input-title {
  text-align: left;
  margin: 5px 0 5px 0;
  font-weight: bold;
  color: #1c7e83;
  font-size: 18px;
  margin-top: 5px;
  font-weight: bold;
  color: #1c7e83;
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
