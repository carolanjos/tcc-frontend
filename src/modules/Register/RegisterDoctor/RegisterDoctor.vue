<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 register-card">
              <v-card-title class="register-title">Cadastro de Médico</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <div class="input-title">Nome Completo:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    placeholder="Nome Completo"
                    v-model="doctor.name"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Email:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    placeholder="Email"
                    type="email"
                    v-model="doctor.email"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Data de Nascimento:</div>
                  <v-text-field
                    placeholder="Data de Nascimento"
                    type="date"
                    v-model="doctor.birthdate"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">CPF:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-id-card"
                    placeholder="CPF"
                    v-model="doctor.document"
                    required
                    outlined
                    v-mask="'###.###.###-##'"
                  ></v-text-field>
                  <div class="input-title">Sexo:</div>
                  <v-select
                    :items="sexOptions"
                    v-model="doctor.sex"
                    placeholder="Sexo"
                    prepend-inner-icon="mdi-gender-male-female"
                    required
                    outlined
                  ></v-select>
                  <div class="input-title">Telefone:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-phone"
                    placeholder="Telefone"
                    v-model="doctor.phone"
                    required
                    outlined
                    v-mask="'(##) #####-####'"
                  ></v-text-field>
                  <div class="input-title">Senha:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    placeholder="Senha"
                    type="password"
                    v-model="doctor.password"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">CRM:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-identifier"
                    placeholder="CRM"
                    v-model="doctor.crm"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Especialidades:</div>
                  <v-select
                    :items="specialtyOptions"
                    v-model="doctor.specialties"
                    placeholder="Especialidades"
                    prepend-inner-icon="mdi-clipboard-list"
                    multiple
                    required
                    outlined
                  ></v-select>
                  <v-btn
                    color="#2EACB2"
                    block
                    class="register-button"
                    @click="registerDoctor"
                  >
                    Cadastrar
                  </v-btn>
                  <v-alert v-if="errorMessage" type="error" dismissible>
                    {{ errorMessage }}
                  </v-alert>
                  <v-alert v-if="successMessage" type="success" dismissible>
                    {{ successMessage }}
                  </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions class="register-actions">
                <v-btn key="login" text @click="submitRegister" color="#2EACB2">
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
import Doctor from '@/modules/Register/RegisterDoctor/entities/doctor.entity';
import RegisterDoctorService from '@/modules/Register/services/register-doctor.service';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class RegisterDoctor extends Vue {
  doctor: Doctor = new Doctor();
  errorMessage: string | null = null;
  successMessage: string | null = null;

  sexOptions = [
    { text: 'Masculino', value: 'M' },
    { text: 'Feminino', value: 'F' },
    { text: 'Outro', value: 'O' },
  ];

  specialtyOptions = [
    { text: 'Cardiologia', value: 1 },
    { text: 'Dermatologia', value: 2 },
    { text: 'Ginecologia', value: 3 },
    { text: 'Neurologia', value: 4 },
    { text: 'Pediatria', value: 5 },
    { text: 'Psiquiatria', value: 6 },
  ];

  async registerDoctor() {
    this.errorMessage = null;
    this.successMessage = null;

    if (
      !this.doctor.name ||
      !this.doctor.email ||
      !this.doctor.birthdate ||
      !this.doctor.document ||
      !this.doctor.sex ||
      !this.doctor.phone ||
      !this.doctor.password ||
      !this.doctor.crm ||
      !this.doctor.specialties.length
    ) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    try {
      await RegisterDoctorService.registerDoctor(this.doctor);
      this.successMessage = 'Médico cadastrado com sucesso!';
    } catch (error: any) {
      if (error.response) {
        this.errorMessage = `Erro ao registrar médico: ${error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        this.errorMessage = 'Erro na comunicação com o servidor. Por favor, tente novamente mais tarde.';
      } else {
        this.errorMessage = `Erro inesperado: ${error.message}`;
      }
    }
  }

  private submitRegister() {
    this.$router.push('/login');
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
  font-size: 25px;
}

.input-title {
  text-align: left;
  margin: 5px 0 5px 0;
  font-weight: bold;
  color: #1c7e83;
  font-size: 18px
}

@media (max-width: 768px) {
  .register-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
