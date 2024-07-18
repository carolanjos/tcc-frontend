<template>
  <div>
    <NavBar />
    <Banner />
    <Features />
    <Testimonials />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NavBar from '../components/home/navbar-home.component.vue';
import Banner from '../components/home/banner-home.component.vue';
import Features from '../components/home/features-home.component.vue';
import Testimonials from '../components/home/testimonials-home.component.vue';
import Footer from '../components/home/footer.component.vue';

@Component({
  components: {
    NavBar,
    Banner,
    Features,
    Testimonials,
    Footer,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
/* Adicione estilos específicos da página Home, se necessário */
</style>
