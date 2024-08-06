<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 register-card">
              <v-title class="register-title">Cadastro</v-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <div class="input-title">Nome Completo:</div>
                  <v-text-field
                    v-model="form.name"
                    prepend-inner-icon="mdi-account"
                    placeholder="Nome Completo"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Email:</div>
                  <v-text-field
                    v-model="form.email"
                    prepend-inner-icon="mdi-email"
                    placeholder="Email"
                    type="email"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Data de Nascimento:</div>
                  <v-text-field
                    v-model="form.date_birth"
                    placeholder="Data de Nascimento"
                    type="date"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">CPF:</div>
                  <v-text-field
                    v-model="form.document"
                    prepend-inner-icon="mdi-id-card"
                    placeholder="000.000.000-00"
                    required
                    outlined
                    v-mask="'###.###.###-##'"
                  ></v-text-field>
                  <div class="input-title">Telefone:</div>
                  <v-text-field
                    v-model="form.phone"
                    prepend-inner-icon="mdi-phone"
                    placeholder="Telefone"
                    required
                    outlined
                    v-mask="'(##) #####-####'"
                  ></v-text-field>
                  <div class="input-title">Sexo:</div>
                  <v-select
                    v-model="form.sex"
                    :items="['M', 'F']"
                    placeholder="Sexo"
                    required
                    outlined
                  ></v-select>
                  <div class="input-title">Senha:</div>
                  <v-text-field
                    v-model="form.password"
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
                    class="register-button"
                  >
                    Cadastrar
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="register-actions">
                <v-btn key="login" text @click="$router.push('/login')" color="#2EACB2">
                  Já possui conta? Faça seu login
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
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from '@/utils/axios'; // Importando a instância do axios configurado
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class RegisterPatient extends Vue {
  form = {
    name: '',
    email: '',
    date_birth: '',
    document: '',
    phone: '',
    sex: '',
    password: ''
  };

  async register() {
    try {
      const response = await axios.post('patient-register', this.form);
      // Sucesso ao registrar
      this.$router.push('/login');
    } catch (error) {
      // Lidar com erros
      console.error(error);
    }
  }
}
</script>

<style scoped>
/* Seu CSS permanece o mesmo */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  padding: 60px 20px;
}

.register-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.register-button {
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
}

.register-actions {
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

.register-title {
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

@media (max-width: 768px) {
  .register-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
