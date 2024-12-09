<template>
  <footer class="footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="footer-section">
          <v-img src="@/assets/navbar3.png" alt="Logo" max-width="250"/>
          <p class="company-info">
            <br />
            Tempo Bem Agendado, Saúde Bem Cuidada.<br />
          </p>
          <div class="socials">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
          <v-btn @click="btnContact" color="#fff" outlined class="contact-button">Fale com a gente</v-btn>
        </v-col>

        <v-col cols="12" md="2" class="footer-section">
          <h3 class="footer-title">MedicalTime</h3>
          <ul>
            <li @click="btnAgenda"><a href="#">Agendamento de consultas</a></li>
            <li @click="btnList"><a href="#">Listagem de consultas</a></li>
            <li @click="btnDoctor"><a href="#">Agenda médica</a></li>
          </ul>
        </v-col>

        <v-col cols="12" md="2" class="footer-section">
          <h3 class="footer-title">Conteúdo</h3>
          <ul>
            <li @click="btnInfos"><a href="#">Informações</a></li>
            <li @click="btnValue"><a href="#">Nossos valores</a></li>
          </ul>
        </v-col>

        <v-col cols="12" md="2" class="footer-section">
          <h3 class="footer-title">Contato</h3>
          <ul>
            <li>Tel: 4002-5858</li>
            <li><a href="">atendimento@medicaltime.com</a></li>
            <li><a href="#">WhatsApp: (11) 95712-4349</a></li>
          </ul>
        </v-col>
      </v-row>

    </v-container>

    <div class="footer-bottom">
      <p>&copy; 2024 - MedicalTime. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private btnContact() {
    this.$router.push('/contact');
  }

  private btnAgenda() {
    this.$router.push('/schedule');
  }

  private btnList() {
    this.$router.push('/list-consult');
  }

  private btnDoctor() {
    this.$router.push('/create-agenda');
  }

  private btnInfos() {
    this.$router.push('/home-infos');
  }

  private btnValue() {
    this.$router.push('/home-value');
  }

}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.footer {
  background: linear-gradient(200deg, #2EACB2, #0C8B8B);
  color: #fff;
  font-family: 'Montserrat';
  padding: 25px 0;
  border-top: 1px solid #e0e0e0;
}

.footer-title {
  font-size: 1.3rem;
  margin-bottom: 15px; /* Aumentei o margin-bottom */
  color: #fff;
  font-family: 'Montserrat';
}

.footer-section {
  margin-bottom: 40px; /* Aumentei o margin-bottom */
  padding: 0 20px; /* Adicionei padding para aumentar o espaçamento lateral */
  font-family: 'Montserrat';
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 10px 0; /* Aumentei o margin */
  color: #fff;
}

.footer-section ul li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #fff;
}

.contact-button {
  margin-top: 20px;
  color: #fff;
  border-color: #fff;
}

.footer-bottom {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
  text-align: center;
  color: #fff;
  font-size: 0.875rem;
}

.footer-bottom p {
  margin: 0;
}

.footer-bottom a {
  color: #fff;
  text-decoration: none;
}

.footer-bottom a:hover {
  text-decoration: underline;
}

.socials a {
  color: #fff;
  margin-right: 1.3rem;
  text-decoration: none;
  font-size: 1.5rem;
}

.socials a:hover {
  color: #2EACB2;
}
</style>
