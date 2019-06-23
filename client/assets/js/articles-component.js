Vue.component('article-card', {
  props: ['article'],
  data: {},
  template: `
  <div id="article-card">
    <h5 style="font-size: 12px; color: #2196F3">Click the card to read more</h5>
    <div class="card blue darken-3 darken-1">
      <div class="card-content white-text">
        <span class="card-title">{{article.title}}</span>
        <p>{{article.description}}.</p>
        <p class="white-text" style="margin-top: 20px;">Date created: {{article.createdAt}}</p>
      </div>
      <div class="card-action blue darken-4">
        <a href="#" class="btn-small red darken-4" v-on:click="deleteArticle(article._id)">delete</a>
        <a href="#" class="btn-small blue" >edit</a>
      </div>
    </div>
  </div>`
})