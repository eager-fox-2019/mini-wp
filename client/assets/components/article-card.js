Vue.component('article-card', {
  data: {},
  template: `
  	<div class="card-body">
      <h5 class="card-title">{{article.title}}</h5>
      <div v-html="article.content" class="card-text"></div><br>
      <div class="card-text">published on {{new Date(article.created_at).toDateString()}}</div>
      <br>
      <button class="btn btn-primary" @click="editArticle(article._id)" v-bind:disabled="postArea">Edit</button>
      <a href="#" class="btn btn-info" @click.prevent="readArticle(article._id)">Read</a>
      <a href="#" class="btn btn-danger" @click.prevent="delArticle(article._id)">Delete</a>
    </div>
    `
})