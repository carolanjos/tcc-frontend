<template>
    <div>
      <NavBar />
      <HomeImage />
      <HomeInfos />
      <HomeValue />
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import NavBar from '@/global/navbar/navbar.component.vue';
  import HomeImage from '@/global/home/components/home-image.component.vue';
  import HomeInfos from '@/global/home/components/home-infos.component.vue';
  import HomeValue from '@/global/home/components/home-value.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  
  @Component({
    components: {
      NavBar,
      HomeImage,
      HomeInfos,
      HomeValue,
      Footer,
    },
  })
  export default class Home extends Vue {}
  </script>
  
  <style scoped>
  /* Adicione estilos específicos da página Home, se necessário */
  </style>
  