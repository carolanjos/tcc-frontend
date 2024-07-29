<template>
  <div class="banner">
    <div class="overlay"></div>
    <div class="text">
      <h1>
        <span class="medical">Medical</span><span class="time">Time</span>
      </h1>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.banner {
  position: relative;
  text-align: center;
  padding: 10rem 0;
  background-image: url('@/assets/tecnology.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  overflow: hidden;
  width: 100%;
  opacity: 1.0;
  margin-bottom: 15px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor preta com 50% de opacidade */
  z-index: 1;
  opacity: 0.75;
}

.banner h1, .banner p {
  position: relative;
  z-index: 50;
  font-family: 'Montserrat', sans-serif;
}

.banner h1 {
  font-size: 4rem;
  color: inherit;
  text-shadow: black 0.3em 0.1em 0.2em;
}

.banner p {
  font-size: 1.75rem;
  color: inherit;
  text-shadow: black 0.3em 0.2em 0.2em;
}

.medical {
  font-weight: 400; /* Regular */
}

.time {
  font-weight: 700; /* Bold */
}
</style>