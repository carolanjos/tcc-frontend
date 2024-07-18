<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="4">
          <v-card>
            <v-card-title>
              <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  :rules="[rules.required]"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Login</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="$router.push('/register')">Don't have an account? Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import AuthService from '../services/AuthService';
  import User from '../entities/User';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value) || 'Invalid e-mail.';
          }
        }
      };
    },
    methods: {
      login() {
        const user = new User(this.email, this.password);
        AuthService.login(user).then(
          () => {
            this.$router.push('/home'); // Redireciona para a página inicial
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  };
  </script>
  
  <style scoped>
  .headline {
    font-size: 24px;
    font-weight: bold;
  }
  </style>  