<template>
  <ContractView />
</template>

<script>
import ContractView from "./components/ContractView.vue";

export default {
  name: "App",
  components: {
    ContractView,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  background-color: #433f56;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;
  margin-top: 20px;
}
</style>
