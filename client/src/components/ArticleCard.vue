<template>
    <div class="grid animated fadeInUp">
      <figure @click="articleDetail(card)" class="effect-marley">
        <img v-bind:src="card.featuredImg" alt="image"/>
        <figcaption>
          <h2>{{card.title}}</h2>
          <span><small v-for="tag in card.tags" :key="tag" style="margin-right:5px; ">#{{tag}}</small></span> 
          <p v-html="card.content" style="height: 95px;overflow: hidden;
          text-overflow: ellipsis; "></p>
        </figcaption>			
      </figure>
    </div>
</template>

<script>
export default {
  props: ['card'],
  methods: {
    articleDetail(article) {
      console.log(article)
      this.$emit('goToDetail', 'detail', article)
    }
  }
}
</script>

<style>

</style>
