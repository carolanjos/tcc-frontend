<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-layout row wrap>
              <v-flex xs12 md6 class="mb-4">
                <v-card class="elevation-4 contact-card">
                  <v-card-title class="contact-title">Contato</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        label="Nome"
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
                        prepend-inner-icon="mdi-phone"
                        label="Telefone"
                        type="tel"
                        required
                        outlined
                      ></v-text-field>
                      <v-textarea
                        prepend-inner-icon="mdi-message"
                        label="Mensagem"
                        rows="5"
                        required
                        outlined
                      ></v-textarea>
                      <v-btn type="submit" color="#2EACB2" block class="contact-button">Enviar</v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 md6>
                <v-card class="elevation-4 social-card">
                  <v-card-title class="social-title">Nossas Redes Sociais</v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="#25D366">mdi-whatsapp</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>(11) 99999-9999</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="#4267B2">mdi-facebook</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>facebook.com/medicaltime</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>@medical_time</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="#E1306C">mdi-instagram</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>@medical_time</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="#0A66C2">mdi-linkedin</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>linkedin.com/in/medical-time</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="#000000">mdi-email</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>contato@medicaltime.com</v-list-item-title>
                          <v-list-item-title>atendimento@medicaltime.com</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
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
export default class Contact extends Vue {}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  background: linear-gradient(45deg, #2EACB2, #26d0ce);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
}

.contact-card, .social-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.contact-card:hover, .social-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.contact-button {
  margin-top: 10px;
  font-weight: bold;
  color: #fff;
  background-color: #2EACB2;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.contact-button:hover {
  background-color: #1c7e83;
  color: #fff !important;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.contact-title, .social-title {
  font-size: 30px;
  text-align: center;
  padding: 10px 10px;
  justify-content: center;
  color: #2EACB2;
}

.v-text-field input, .v-textarea textarea {
  background: #f9f9f9;
  border-radius: 5px;
}

.v-text-field input::placeholder, .v-textarea textarea::placeholder {
  color: #a0a0a0;
}

.v-text-field input:focus, .v-textarea textarea:focus {
  border-color: #2EACB2 !important;
  box-shadow: 0 0 5px rgba(46, 172, 178, 0.5);
}

.v-list-item-icon .v-icon {
  transition: transform 0.3s ease;
}

.v-list-item:hover .v-icon {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .contact-card, .social-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
