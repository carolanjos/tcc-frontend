<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/navbar3.png" alt="Logo" />
    </div>
    <div class="nav-links">
      <button @click="inicialButton" class="nav-button">Home</button>
      <button @click="featuresButton" class="nav-button">Funcionalidades</button>
      <button @click="contactButton" class="nav-button">Contato</button>
    </div>
    <div class="auth-buttons">
      <div v-if="!isAuthenticated">
        <div class="dropdown">
          <button @click="toggleDropdownLogin" class="login-button">Login</button>
        </div>
        <div class="dropdown">
          <button @click="toggleDropdownRegister" class="signup-button">Cadastro</button>
          <div v-if="dropdownVisible" class="dropdown-content">
            <button @click="doctorRegister">Médico</button>
            <button @click="registerPatient">Paciente</button>
          </div>
        </div>
      </div>
      <div v-else class="logged-in">
        <button @click="dashboard" class="signup-button">Painel</button>
        <button @click="editProfile" class="signup-button">Alterar Dados</button>
        <button @click="logout" class="signup-button">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LocalStorageService from '@/services/localStorage.service';

@Component
export default class NavBar extends Vue {
  dropdownVisible = false;
  dropdownVisibleLogin = false;

  get isAuthenticated(): boolean {
    return !!LocalStorageService.getItem('token');
  }

  toggleDropdownRegister(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleDropdownLogin(): void {
    this.dropdownVisibleLogin = !this.dropdownVisibleLogin;
    this.$router.push('/login');
  }

  inicialButton(): void {
    this.$router.push('/');
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

  featuresButton(): void {
    this.$router.push('/features');
  }

  editProfile(): void {
    this.$router.push('/edit-profile');
  }

  logout(): void {
    LocalStorageService.removeItem('token');
    LocalStorageService.removeItem('role');
    LocalStorageService.removeItem('authToken');
    this.$router.push('/');
  }

  dashboard(): void {
    const role = LocalStorageService.getItem('role');

    if (role === 'admin') {
      this.$router.push('/dashboard-admin');
    } else if (role === 'medico') {
      this.$router.push('/dashboard-doctor');
    } else if (role === 'paciente') {
      this.$router.push('/dashboard-patient');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(200deg, #2EACB2, #0C8B8B);
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
  margin-right: 10px;
  gap: 1rem;
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
  align-items: center;
  gap: 1rem;
}

.logged-in {
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
  margin-right: 15px;
}

.login-button:hover {
  background-color: #fff;
  color: #2EACB2;
}

.signup-button {
  background-color: transparent;
  color: #fff;
  margin-right: 10px;
  font-size: 1.1rem;
}

.signup-button:hover {
  background-color: #fff;
  color: #2EACB2;
}

.dropdown {
  display: inline-block;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.nav-links button:hover {
  background-color: #fff;
  color: #2EACB2;
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

  .logout-button {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .logout-button:hover {
    background-color: #fff;
    color: #2EACB2;
  }
}
</style>
