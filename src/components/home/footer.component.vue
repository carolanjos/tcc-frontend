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
        <h2>Navegação Rápida</h2>
        <br>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Serviços</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>

      <div class="footer-section contact-form">
        <h2>Contato</h2>
        <br>
        <form action="#" method="post">
          <input type="email" name="email" class="text-input contact-input" placeholder="Seu email...">
          <textarea rows="4" name="message" class="text-input contact-input" placeholder="Sua mensagem..."></textarea>
          <button type="submit" class="btn btn-big">
            <i class="fas fa-envelope"></i>
            Enviar
          </button>
        </form>
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
  padding: 2rem 0;
  font-family: 'Roboto', sans-serif;
}

.footer .footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer .footer-section {
  flex: 1;
  padding: 1rem;
  min-width: 250px;
}

.footer .logo-text span {
  color: #155872;
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
  color: #4CAF50;
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
}

.footer .links ul a:hover {
  color: #4CAF50;
}

.footer .contact-form .contact-input {
  background-color: #444;
  border: none;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #fff;
  width: 100%;
  border-radius: 4px;
}

.footer .contact-form .btn {
  background-color: #4CAF50;
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
  background-color: #222;
  color: #aaa;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
}

.footer .footer-bottom a {
  color: #4CAF50;
  text-decoration: none;
}

.footer .footer-bottom a:hover {
  text-decoration: underline;
}
</style>
