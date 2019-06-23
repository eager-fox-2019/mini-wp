<template>
  <div>
    <h1>{{ message }}</h1>
    <login />
  </div>
</template>

<script>
import login from "./components/login";

export default {
  components: {
    login
  },
  data() {
    return {
      message: "Hello world"
    };
  },
  

};
</script>

<style scoped>
</style>