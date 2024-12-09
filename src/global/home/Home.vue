<template>
    <div>
      <NavBar />
      <HomeImage />
      <HomePage />
      <HomeList />
      <HomeIndical />
      <HomeValue />
      <HomeWay />
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import NavBar from '@/global/navbar/navbar.component.vue';
  import HomeImage from '@/global/home/components/home-image.component.vue';
  import HomePage from '@/global/home/components/home-page.component.vue';
  import HomeValue from '@/global/home/components/home-value.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  import HomeIndical from '@/global/home/components/home-indical.component.vue';
  import HomeList from '@/global/home/components/home-list.component.vue';
  import HomeWay from '@/global/home/components/home-way.component.vue';
  
  @Component({
    components: {
      NavBar,
      HomeImage,
      HomePage,
      HomeValue,
      HomeIndical,
      HomeList,
      HomeWay,
      Footer,
    },
  })
  export default class Home extends Vue {}
  </script>
  
  <style scoped>
  /* Adicione estilos específicos da página Home, se necessário */
  </style>
  