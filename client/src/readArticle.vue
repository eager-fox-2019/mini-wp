<template>
  <div class="col-9 m-3">
    <img v-bind:src="image">
    <hr>
    <h3>{{ article.title }}</h3>
    <p>{{ article.content }}</p>
    <strong>Published: {{ article.createdAt }}</strong>
  </div>
</template>

<script>
export default {
  props: ['article'],
  data() {
    return {
      image: 'http://mini-wp.isnanirsyad.online/images/cat.png'
    }
  }
}
</script>

<style scoped>

</style>
