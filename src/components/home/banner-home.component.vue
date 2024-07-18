<template>
  <div class="banner">
    <div class="overlay"></div>
    <div class="text">
      <h1>MedicalTime - Sistema de Agendamento de Consultas Médicas</h1>
      <p>Tempo Bem Agendado, Saúde Bem Cuidada</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {}
</script>

<style scoped>
.banner {
  position: relative;
  text-align: center;
  padding: 12rem 0;
  background-image: url('@/assets/banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  overflow: hidden;
  width: 100%;
  opacity: 0.75rem;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor preta com 50% de opacidade */
  z-index: 1;
  opacity : 0.75;
}
.banner h1, .banner p {
  position: relative;
  z-index: 2;
}
.banner h1 {
  font-size: 2.8rem;
  color: inherit;
  color: #edf9ed;
}
.banner p {
  font-size: 1.25rem;
  color: inherit;
}
</style>
