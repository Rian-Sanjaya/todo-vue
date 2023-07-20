import Vue from 'vue';
import App from './App.vue';
import todoStorage from './store';
import router from './router/index';

Vue.config.productionTip = false;

window.todoStorage = todoStorage;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
