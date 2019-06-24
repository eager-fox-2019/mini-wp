<template>
  <div>
    <section class="hero is-large is-dark is-bold has-background">
      <img :src="article.image" alt class="hero-background is-transparent">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-size-2">{{article.title}}</h1>
          <b-taglist class="is-centered">
            <b-tag type="is-info" v-for="tag in article.tags" :key="tag">{{tag}}</b-tag>
          </b-taglist>
          <div class="level">
            <div class="level-item">
              <figure class="image is-32x32" style="margin-right: 10px">
                <img class="is-rounded is-avatar" :src="article.author.picture">
              </figure>
              <h6 class="subtitle is-6">By {{article.author.username}}</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="box">
        <div class="container">
          <div class="columns">
            <div class="column is-2"></div>
            <div class="column">
              <div class="article-content">
                <div class="box">
                  <div v-html="article.body"></div>
                </div>
              </div>
            </div>
            <div class="column is-2"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import miniwp from "../api/miniwp";
export default {
  data() {
    return {
      articlebody:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro modi esse hic voluptatem iusto! Ullam officiis omnis ut provident labore saepe laborum facere error, quae amet. Nam in dolores pariatur error molestiae autem labore sapiente tempore odit quod. Architecto nihil dolorum nostrum veritatis modi dignissimos, qui inventore hic sint numquam commodi reprehenderit illum culpa dolorem perspiciatis, vel provident. Hic saepe, explicabo corporis cupiditate molestiae sequi accusamus autem facere modi ipsum ab pariatur fugiat possimus ipsa voluptate corrupti ut, quae ex.",
      article: {}
    };
  },
  methods: {
    getArticle() {
      let slug = this.$route.params.title;
      console.log(slug);
      miniwp({
        url: `/articles/${slug}`,
        method: "GET"
      })
        .then(({ data }) => {
          console.log("masuk then", data);
          this.article = data;
          console.log(this.article);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>

<style scoped>
.article-content {
  padding: 0 auto;
  line-height: 2rem;
}
.box {
  border: none;
  box-shadow: none;
}
</style>
