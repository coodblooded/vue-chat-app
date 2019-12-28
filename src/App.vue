<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Home from './components/home.vue';

export default {
    name: 'app'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* background-image: url('./assets/back.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
height: 700px; */
}

</style>
