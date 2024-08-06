<template>
  <div>
    <NavBar />
    <PartOne />
    <PartTwo />
    <PartThree />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NavBar from '../components/NavBar.vue';
import PartOne from '../components/home/PartOne.component.vue';
import PartTwo from '../components/home/PartTwo.component.vue';
import PartThree from '../components/home/PartThree.component.vue';
import Footer from '../components/Footer.vue';

@Component({
  components: {
    NavBar,
    PartOne,
    PartTwo,
    PartThree,
    Footer,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
/* Adicione estilos específicos da página Home, se necessário */
</style>
