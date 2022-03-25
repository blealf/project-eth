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
* {
  font-family: monospace, Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;
  margin-top: 20px;
}
</style>
