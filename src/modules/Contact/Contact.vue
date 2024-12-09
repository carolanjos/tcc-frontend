<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-row justify="center">
          <!-- Seção de texto -->
          <v-col xs="12" sm="6" md="8" class="text-section">
            <h1>Fale com um consultor hoje!</h1>
            <p>
              Entre em contato agora mesmo e descubra como impulsionar o sucesso da sua clínica.
            </p>
            <p class="note">
              Horário de atendimento: 09h às 18h de segunda a sexta-feira.
            </p>
            <!-- Informações adicionais de contato -->
            <div class="contact-info">
              <p>
                <strong>Telefone:</strong> +55 (11) 1234-5678
              </p>
              <p>
                <strong>WhatsApp:</strong> +55 (11) 95712-4349
              </p>
              <p>
                <strong>E-mail:</strong> atendimento@medicaltime.com
              </p>
              <p>
                <strong>Endereço:</strong> Rua Souza Lima, 123, São Paulo, SP
              </p>
            </div>
          </v-col>

          <!-- Seção do formulário -->
          <v-col xs="12" sm="6" md="4">
            <div class="form-section">
              <h2>Informe seus dados</h2>
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
                  v-mask="'(##) #####-####'"
                ></v-text-field>
                <v-btn type="submit" block class="submit-button">
                  Quero falar com um consultor
                </v-btn>
              </v-form>

              <!-- Ícones de redes sociais -->
              <div class="social-media">
                <h3>Siga-nos nas redes sociais</h3>
                <v-icon color="#3b5998" class="social-icon">mdi-facebook</v-icon>
                <v-icon color="#00acee" class="social-icon">mdi-twitter</v-icon>
                <v-icon color="#E1306C" class="social-icon">mdi-instagram</v-icon>
                <v-icon color="#0e76a8" class="social-icon">mdi-linkedin</v-icon>
              </div>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap');

* {
  font-family: 'Montserrat';
}

.container {
  background-color: #F9FAFB;
  padding: 70px;
}

.form-section {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(2, 1, 1, 0.4);
  transition: transform 0.3s ease;
}

.form-section:hover {
  transform: scale(1.02);
}

.form-section h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2EACB2;
}

.input-field {
  margin-bottom: 15px;
  color: #2EACB2;
}

.submit-button {
  background-color: #2EACB2;
  font-weight: bold;
  font-size: 16px;
  text-transform: none;
  color: #fff;
}

.submit-button:hover {
  background-color: #006d6b;
}

.text-section {
  background-image: url('https://example.com/background.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 10px;
  color: black;
}

.text-section h1 {
  font-size: 32px;
  font-weight: 700;
  color: #2EACB2;
  margin-bottom: 20px;
}

.text-section p {
  font-size: 18px;
  color: black
}

.note {
  margin-top: 20px;
  font-size: 14px;
  color: #2EACB2;
}

.contact-info p {
  font-size: 18px;
  margin: 10px 0;
}

.contact-info {
  margin-top: 40px;
}

.social-media {
  margin-top: 20px;
  text-align: center;
}

.social-media h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2EACB2;
}

.social-icon {
  font-size: 36px;
  margin: 0 10px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #006d6b;
}

.theme--light.v-btn.v-btn--has-bg {
    background-color: #2EACB2;
    color: #fff;
    font-family: 'Montserrat';
}

b, strong {
    font-weight: bolder;
    color: #2EACB2;
}
</style>
