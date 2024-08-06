<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/navbar.png" alt="Logo" />
    </div>
    <div class="nav-links">
      <button @click="homeButton" class="nav-button">Home</button>
      <button @click="scheduleButton" class="nav-button">Agendamento</button>
      <button @click="contactButton" class="nav-button">Contato</button>
    </div>
    <div class="auth-buttons">
      <button class="login-button" @click="loginButton">Login</button>
      <div class="dropdown" @click="toggleDropdown">
        <button class="signup-button">Cadastro</button>
        <div v-if="dropdownVisible" class="dropdown-content">
          <button @click="doctorRegister">Médico</button>
          <button @click="registerPatient">Paciente</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  dropdownVisible = false;

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  loginButton(): void {
    this.$router.push('/login');
  }

  homeButton(): void {
    this.$router.push('/home');
  }

  contactButton(): void {
    this.$router.push('/contact');
  }

  doctorRegister(): void {
    this.$router.push('/register-doctor');
  }

  registerPatient(): void {
    this.$router.push('/register');
  }

  scheduleButton(): void {
    this.$router.push('/schedule');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2EACB2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat';
  padding: 10px 10px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 80px;
  margin-right: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-button:hover {
  color: #fff;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  border: 2px solid #fff;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.login-button {
  background-color: transparent;
  color: #fff;
}

.login-button:hover {
  background-color: #fff;
  color: #2EACB2;
}

.signup-button {
  background-color: #fff;
  color: #2EACB2;
}

.signup-button:hover {
  background-color: #fff;
  color: #2EACB2;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.dropdown-content button {
  background: none;
  border: none;
  padding: 10px 20px;
  text-align: center;
  width: 100%;
  font-size: 1rem;
  color: #2EACB2;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-bottom: 1px solid #ccc;
}

.dropdown-content button:last-child {
  border-bottom: none;
}

.dropdown-content button:hover {
  background-color: #2EACB2;
  color: #fff;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
  .nav-links {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
  }
  .auth-buttons {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>