import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'todolist',
  },
  {
    path: '/:filter',
    name: 'todolistFilter',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
