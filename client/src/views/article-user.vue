<template>
  <section>
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column">
        <div class="box">
          <tablearticle></tablearticle>
        </div>
      </div>
      <div class="column is-2"></div>
    </div>
  </section>
</template>
<script>
import tablearticle from "../components/table-article.vue";
export default {
  components: {
    tablearticle
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("masuk");
      if (localStorage.hasOwnProperty("token")) {
        next();
      } else {
        next("/");
      }
    });
  }
};
</script>
<style scoped>
.box {
  box-shadow: none;
}
</style>
