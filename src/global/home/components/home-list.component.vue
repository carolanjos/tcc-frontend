<template>
  <div class="scheduling-system">
    <div class="content">
      <h2>POR QUE TER UM SISTEMA DE AGENDAMENTO ONLINE EM SUA CLÍNICA?</h2>
      <p>
        Um sistema de agendamento online traz muitas vantagens para clínicas.
        Seguem alguns motivos:
      </p>
      <ul>
        <li>
          <v-icon color="#2EACB2" left>mdi-check-circle-outline</v-icon>
          Facilidade para pacientes agendarem consultas de qualquer lugar, a qualquer hora.
        </li>
        <li>
          <v-icon color="#2EACB2" left>mdi-check-circle-outline</v-icon>
          Redução de chamadas telefônicas, permitindo que a equipe se concentre em outras tarefas.
        </li>
        <li>
          <v-icon color="#2EACB2" left>mdi-check-circle-outline</v-icon>
          Agendamento em tempo real, evitando sobreposição de horários ou erros manuais.
        </li>
        <li>
          <v-icon color="#2EACB2" left>mdi-check-circle-outline</v-icon>
          Envio automático de lembretes para reduzir faltas e atrasos.
        </li>
        <li>
          <v-icon color="#2EACB2" left>mdi-check-circle-outline</v-icon>
          Possibilidade de visualização de horários disponíveis pelos próprios pacientes.
        </li>
        <li>
          <v-icon color="#2EACB2" left>mdi-check-circle-outline</v-icon>
          Centralização das informações dos pacientes e histórico de consultas.
        </li>
      </ul>
    </div>
    <div class="image">
      <img src="@/assets/system.jpg" alt="Consultation Image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeList extends Vue {}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.scheduling-system {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  padding: 50px;
  background-color: #f7f7f7;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  transition: transform 0.3s ease-in-out;
}

.scheduling-system:hover {
  transform: translateY(-10px);
}

.content {
  flex: 1;
  padding-right: 20px;
}

.scheduling-system h2 {
  font-size: 30px;
  color: #149393;
  margin-bottom: 15px;
  font-weight: bold;
}

.scheduling-system p {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.scheduling-system ul {
  list-style: none;
  padding: 0;
}

.scheduling-system li {
  font-size: 18px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  color: #333;
  transition: color 0.3s ease-in-out;
}

.scheduling-system li:hover {
  color: #2EACB2;
}

.image {
  flex: 0 0 auto;
  width: 400px;
  display: flex;
  align-items: stretch;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .scheduling-system {
    flex-direction: column;
    padding: 20px;
  }

  .content {
    padding-right: 0;
  }

  .image {
    margin-top: 20px;
    width: 100%;
  }
}
</style>