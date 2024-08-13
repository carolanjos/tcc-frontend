<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="container">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12 reset-password-card">
                <v-title class="reset-password-title">Redefinir Senha</v-title>
                <v-card-text>
                  <v-form @submit.prevent="submit">
                    <div class="input-title">Nova Senha:</div>
                    <v-text-field
                      v-model="password"
                      prepend-inner-icon="mdi-lock"
                      placeholder="Nova Senha"
                      type="password"
                      required
                      outlined
                    ></v-text-field>
  
                    <div class="input-title">Confirme a Nova Senha:</div>
                    <v-text-field
                      v-model="password2"
                      prepend-inner-icon="mdi-lock"
                      placeholder="Confirme a Nova Senha"
                      type="password"
                      required
                      outlined
                    ></v-text-field>
  
                    <v-btn type="submit" color="#2EACB2" block class="reset-password-button">
                      Redefinir Senha
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
  import { Vue, Component } from 'vue-property-decorator';
  import PasswordRecoveryService from '@/modules/Login/ForgotPassword/services/forgot-password.service';
  import ResetPasswordRequest from '@/modules/Login/ResetPassword/entities/reset-password.entity';
  import Footer from '@/global/footer/footer.component.vue';
  import NavBar from '@/global/navbar/navbar.component.vue';
  
  @Component({
    components: {
      Footer,
      NavBar,
    },
  })
  export default class ResetPassword extends Vue {
    private uidb64 = ''; // UID base64 do usuário, capturado da rota
    private token = '';  // Token de redefinição de senha, capturado da rota
    private password = ''; // Nova senha
    private password2 = ''; // Confirmação da nova senha
  
    private async submit() {
      if (this.password !== this.password2) {
        alert("As senhas não coincidem.");
        return;
      }
  
      const data: ResetPasswordRequest = {
        password: this.password,
        password2: this.password2,
      };
  
      try {
        await PasswordRecoveryService.resetPassword(this.uidb64, this.token, data);
        alert("Senha redefinida com sucesso!");
        this.$router.push('/login');
      } catch (error) {
        alert("Erro ao redefinir senha. Tente novamente mais tarde.");
      }
    }
  
    mounted() {
      // Captura os parâmetros da URL para uidb64 e token
      this.uidb64 = this.$route.params.uidb64;
      this.token = this.$route.params.token;
    }
  }
  </script>
  
  <style>
  .reset-password-card {
    padding: 20px;
  }
  
  .reset-password-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #2EACB2;
  }
  
  .input-title {
    font-weight: bold;
    margin-bottom: 14px;
    color: #2EACB2;
  }
  
  .reset-password-button {
    margin-top: 20px;
    color: #fff;
  }
  
  .back-to-login-actions {
    justify-content: center;
  }
  </style>
  