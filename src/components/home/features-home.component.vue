<template>
  <div class="features">
    <h2>Por que Escolher Nosso Sistema?</h2>
    <p>Nosso objetivo é agilizar o processo de agendamento de consultas médicas. Com nosso sistema, você pode agendar suas consultas de forma rápida e prática, sem precisar sair de casa ou esperar horas ao telefone.</p>
    <ul>
      <li v-for="feature in features" :key="feature.id">
        <img :src="feature.icon" alt="Ícone" class="icon">
        <span>{{ feature.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Features extends Vue {
  features = [
    { id: 1, name: 'Facilidade de Uso', icon: require('@/assets/icons/celular.png') },
    { id: 2, name: 'Acesso Rápido', icon: require('@/assets/icons/relogio.png') },
    { id: 3, name: 'Organização', icon: require('@/assets/icons/calendario.png') },
  ];
}
</script>

<style scoped>
.features {
  padding: 2rem;
  background-color: #fff;
}
.features h2 {
  text-align: center;
  color: #2e312e;
}
.features p {
  text-align: center;
  margin-bottom: 2rem;
  color: #2e312e;
  font-size: 1rem;
}
.features ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}
.features li {
  display: flex;
  align-items: center;
  margin: 0 1rem;
  font-size: 1.25rem;
  color: #333;
}
.features .icon {
  margin-right: 0.5rem;
  width: 40px;
  height: 40px;
}
</style>
