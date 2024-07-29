<!-- src/components/RegisterComponent.vue -->
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
                  <v-form>
                    <v-text-field
                      prepend-inner-icon="mdi-account"
                      label="Nome Completo"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-email"
                      label="Email"
                      type="email"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-calendar"
                      label="Data de Nascimento"
                      type="date"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-id-card"
                      label="CPF"
                      required
                      outlined
                      v-mask="'###.###.###-##'"
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-phone"
                      label="Telefone"
                      required
                      outlined
                      v-mask="'(##) #####-####'"
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-lock"
                      label="Senha"
                      type="password"
                      required
                      outlined
                    ></v-text-field>
                    <v-btn type="submit" color="#2EACB2" @click="$router.push('/login')" block class="register-button">Cadastrar</v-btn>
                  </v-form>
                </v-card-text>
                <v-card-actions class="login-actions">
                  <v-btn key="login" text @click="$router.push('/login')" color="#2EACB2">Já possui conta? Faça seu login</v-btn>
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
import Component from "vue-class-component";
import NavBar from '@/components/NavBar.vue';
import Footer from '../Footer.vue';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Register extends Vue {
}
</script>

  <style scoped>
  .container {
    padding: 60px 20px;
    width: 100%;
  }

  .register-card {
    padding: 30px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }
  
  .register-button {
    margin-top: 0px;
    font-weight: bold;
    color: #fff;
  }
  
  .login-actions {
    justify-content: center;
    margin-top: 5px;
  }
  
  .v-text-field input {
    background: #f9f9f9;
  }
  
  .v-text-field input::placeholder {
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
    font-size: 30px;
    text-align: center;
    padding: 10px 10px;
    justify-content: center;
    font-family: 'Popins', sans-serif;
  }
  
  @media (max-width: 768px) {
    .register-card {
      width: 100%;
      margin: 0 10px;
    }
  }
  </style>
  