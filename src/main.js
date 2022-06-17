import Vue from 'vue';
import App from './App.vue';
import todoStorage from './store';

Vue.config.productionTip = false;

window.todoStorage = todoStorage;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
