<template>
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/logotipo.png" alt="Logo" />
      </div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
      <div class="auth-buttons">
        <button class="login-button">Login</button>
        <button class="signup-button">Cadastro</button>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  
  @Component
  export default class NavBar extends Vue {}
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2EACB2;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    transition: background-color 0.3s ease;
  }
  
  .navbar:hover {
    background-color: #4598a0;
  }
  
  .logo img {
    height: 70px;
    transition: transform 0.3s ease;
  }
  
  .logo img:hover {
    transform: scale(1.1);
  }
  
  ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
  }
  
  li {
    position: relative;
  }
  
  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: 20px;
  }
  
  a:hover {
    background-color: white;
    color: #1c6781;
  }
  
  a::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  a:hover::after {
    width: 100%;
  }
  
  .auth-buttons {
    display: flex;
    gap: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .login-button {
    background-color: white;
    color: #2EACB2;
  }
  
  .login-button:hover {
    background-color: #1c6781;
    color: white;
  }
  
  .signup-button {
    background-color: #1c6781;
    color: white;
  }
  
  .signup-button:hover {
    background-color: white;
    color: #1c6781;
  }
  
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
    }
    ul {
      flex-direction: column;
      gap: 1rem;
    }
    .auth-buttons {
      margin-top: 1rem;
    }
  }
  </style>
  