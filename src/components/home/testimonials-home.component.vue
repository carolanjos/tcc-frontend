<template>
  <div class="testimonials">
    <h2>Nossos valores</h2>
    <div class="cards">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="card">
        <img :src="testimonial.image" alt="Testimonial Image">
        <p>{{ testimonial.message }}</p>
        <p><strong>{{ testimonial.author }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Testimonials extends Vue {
  testimonials = [
    { id: 1, message: 'Compromisso com a Saúde', author: 'Nosso compromisso é proporcionar cuidados de saúde de qualidade para todos os nossos pacientes.', image: require('@/assets/carousel/medico.jpg') },
    { id: 2, message: 'Segurança e Confidencialidade', author: 'Garantimos a segurança e confidencialidade de todas as informações dos nossos pacientes, clínicas e médicos', image: require('@/assets/carousel/secury.jpg') },
    { id: 3, message: 'Tecnologia de Ponta', author: 'Utilizamos da tecnologia mais atual para proporcionar facilidade no agendamento de consultas médicas', image: require('@/assets/carousel/tecnology.jpeg')},
  ];
}
</script>

<style scoped>
.testimonials {
  padding: 2rem;
  background-color: #f9f9f9;
  text-align: center;
}
.testimonials h2 {
  color: #2e312e;
  margin-bottom: 2rem;
}
.cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 27%;
}
.card img {
  max-width: 100%;
  height: 70%;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.card p {
  font-size: 1rem;
  color: #555;
}
.card p strong {
  display: block;
  margin-top: 1rem;
  color: #333;
}
</style>