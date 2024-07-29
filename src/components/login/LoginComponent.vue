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
                <v-form>
                  <div class="input-title">Selecione o tipo de usuário</div>
                  <v-select
                    required
                    placeholder="Selecione o tipo de usuário"
                    :items="['Admin', 'Paciente', 'Médico']"
                    outlined
                  ></v-select>
                  <div class="input-title">Email</div>
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    placeholder="Email"
                    type="email"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Senha</div>
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    placeholder="Senha"
                    type="password"
                    required
                    outlined
                  ></v-text-field>
                  <v-btn type="submit" color="#2EACB2" block class="login-button" @click="$router.push('/dashboard-patient')">Login</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="register-actions">
                <v-btn key="register" text @click="$router.push('/register')" color="#2EACB2">Não possui conta? Cadastre-se</v-btn>
              </v-card-actions>
              <v-card-actions class="login-actions">
                <v-btn text color="#2EACB2" @click="$router.push('/forgot-password')">Esqueceu a senha?</v-btn>
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
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Login extends Vue {
}
</script>

<style scoped>
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

.v-text-field input, .v-select input {
  background: #f9f9f9;
}

.v-text-field input::placeholder, .v-select input::placeholder {
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
  font-size: 30px;
  text-align: center;
  padding: 10px 10px;
  justify-content: center;
}

.input-title {
  text-align: left;
  margin: 10px 0 5px 0;
  font-weight: bold;
  color: #1c7e83;
}

@media (max-width: 768px) {
  .login-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
