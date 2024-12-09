import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from '@/App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VTitle from './path/to/VTitle.vue';
import '@mdi/font/css/materialdesignicons.css';
import Carousel from 'vue-carousel'; // 
import Slide from 'vue-carousel';

Vue.use(VueTheMask);
Vue.component('Carousel');
Vue.component('Slide');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');