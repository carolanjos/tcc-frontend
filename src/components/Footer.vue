<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2 class="logo-text"><span>Medical</span>Time</h2>
        <p>
          MedicalTime é dedicada a você que busca facilidade na hora de agendar consultas médicas.
        </p>
        <div class="contact">
          <span><i class="fas fa-phone"></i> &nbsp; (11) 2444-4444</span>
          <span><i class="fas fa-envelope"></i> &nbsp; atendimento@medicaltime.com</span>
        </div>
        <div class="socials">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div class="footer-section links">
        <h2 class="logo-text">Navegação Rápida</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Agendamento</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; medicaltime.com
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.footer {
  background-color: #2EACB2;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

.footer .footer-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0.5rem;
}

.footer .footer-section {
  padding: 1rem;
  min-width: 200px;
}

.footer .logo-text span {
  font-weight: bold;
}

.footer .contact span {
  display: block;
  margin: 0.5rem 0;
}

.footer .socials a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
  font-size: 1.2rem;
}

.footer .socials a:hover {
  color: #2EACB2;
}

.footer .links ul {
  list-style: none;
  padding: 0;
}

.footer .links ul a {
  display: block;
  text-decoration: none;
  color: #fff;
  margin: 0.5rem 0;
  transition: color 0.3s;
  border: 1px solid #fff;
  text-align: center;
  width: 100%;
  border-radius: 10px;
}

.logo-text {
  font-size: 20px;
  display: block;
  margin: 0.5rem 0;
}

.footer .links ul a:hover {
  color: #2de6f0;
}

.footer .contact-form .btn {
  background-color: #34d3db;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.footer .contact-form .btn:hover {
  background-color: #45a049;
}

.footer .footer-bottom {
  background-color: #2EACB2;
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.footer .footer-bottom a {
  color: #1ee9f0;
  text-decoration: none;
}

.footer .footer-bottom a:hover {
  text-decoration: underline;
}
</style>
