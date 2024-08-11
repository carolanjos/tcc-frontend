<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-row align="center" justify="center">
          <v-col xs="12" sm="6" md="8" class="text-section">
            <h1>Fale com um consultor hoje!</h1>
            <p>
              Entre em contato agora mesmo e descubra como impulsionar o sucesso da sua clínica.
            </p>
            <p class="note">
              Horário de atendimento: 09h às 18h de segunda a sexta-feira. Nos comprometemos a não divulgar suas informações.
            </p>
          </v-col>
          <v-col xs="12" sm="6" md="4">
            <div class="form-section">
              <h2>Fale com um consultor</h2>
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="contactForm.name"
                  label="Nome"
                  outlined
                  hide-details
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  v-model="contactForm.email"
                  label="E-mail"
                  type="email"
                  outlined
                  hide-details
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  v-model="contactForm.phone"
                  label="Telefone"
                  type="tel"
                  outlined
                  hide-details
                  class="input-field"
                ></v-text-field>
                <v-btn type="submit" block class="submit-button">
                  Quero falar com um consultor
                </v-btn>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import contactService from '@/modules/Contact/services/contact.service';
import ContactForm from '@/modules/Contact/entities/contact.entity';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Contact extends Vue {
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  async submitForm() {
    try {
      await contactService.sendContactForm(this.contactForm);
      alert('Sua mensagem foi enviada com sucesso!');
      this.contactForm = {
        name: '',
        email: '',
        phone: '',
        message: '',
      };
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      alert('Houve um erro. Por favor, tente novamente.');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  background-color: #F9FAFB;
  padding: 40px;
  font-family: 'Montserrat'
}

.form-section {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat'
}

.form-section h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1c7e83;
  font-family: 'Montserrat';
}

.input-field {
  margin-bottom: 15px;
  font-family: 'Montserrat'
}

.submit-button {
  background-color: #1c7e83;
  color: #1c7e83;
  font-weight: bold;
  padding: 100px;
  font-size: 16px;
  text-transform: none;
  font-family: 'Montserrat'
}

.submit-button:hover {
  background-color: #1c7e83;
  font-family: 'Montserrat';
  color: #fff;
}

.text-section {
  padding-left: 40px;
  font-family: 'Montserrat'
}

.text-section h1 {
  font-size: 32px;
  font-weight: 700;
  color: #008c7a;
  margin-bottom: 20px;
  font-family: 'Montserrat'
}

.text-section p {
  font-size: 18px;
  color: #555555;
  font-family: 'Montserrat'
}

.note {
  margin-top: 20px;
  font-size: 14px;
  color: #777777;
  font-family: 'Montserrat'
}
</style>
