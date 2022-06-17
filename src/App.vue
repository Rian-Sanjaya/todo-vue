<template>
  <div>
    <todo />
  </div>
</template>

<script>
import Todo from './components/Todo.vue';

export default {
  name: 'App',
  components: {
    Todo,
  },
};
</script>

<style>
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
