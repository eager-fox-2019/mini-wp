<template>
    <div class="card-body d-flex">
      <div class="card-img-wrapper">
        <img class="card-img" v-bind:src="carddetail.featured_image" alt="article image" 
        height="42px" width="42px">
      </div>
      <div class="card-detail">
        <h5 class="card-title">{{carddetail.title}}</h5>
        <div v-html="carddetail.content" class="card-text"></div><br>
        <div class="card-text">
          published on {{new Date(carddetail.created_at).toDateString()}}</div>
        <br>
        <button class="btn btn-primary" @click="editArticle" v-bind:disabled="postarea">Edit</button>
        <a href="#" class="btn btn-info" @click.prevent="readArticle">Read</a>
        <a href="#" class="btn btn-danger" @click.prevent="delArticle">Delete</a>
      </div>
    </div>
</template>

<script>

export default {
  name: "articlecard",
  props: ['carddetail','postarea'],
  methods:{
    editArticle(){
      this.$emit('edit-article')
    },
    readArticle(){
      this.$emit('read-article')
    },
    delArticle(){
      this.$emit('del-article')
    }
  }
}
</script>
