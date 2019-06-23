<template>
  <div class="container">
    <div v-if="!myArticles.length" class="center">
      <H2>You don't have an article</H2>
    </div>
    <div v-else class="cals">
      <div v-for="(myArticle, index) in myArticles" :key="index">
        <div class="col s12 m7">
          <div id="cardMyArticle" class="card horizontal small hoverable">
            <div class="card-image">
              <img :src="myArticle.featured_image">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>{{ myArticle.title }}</p>
                <span>Created: {{ getDate(myArticle.createdAt) }}</span>
              </div>
              <div class="card-action">
                <a
                  @click="edit_article(myArticle._id)"
                  class="waves-effect waves-light orange lighten-2 btn"
                >
                  <i class="material-icons left">edit</i>EDIT
                </a>
                <a
                  @click="remove_article(myArticle._id)"
                  class="waves-effect waves-light red darken-1 btn"
                >
                  <i class="material-icons right">delete_forever</i>DELETE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["myArticles", "myServer"],
  data() {
    return {};
  },
  methods: {
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString();
      return dateString;
    },
    remove_article(id) {
      this.$emit("remove_article", id);
    },
    edit_article(id) {
      console.log("edit trigger");
      this.$emit("edit_article", id);
    }
  }
};
</script>


<style scoped>
.card-image img {
  max-height: 200px;
}
#cardMyArticle {
  max-height: 200px;
}
h2 {
  font-family: "Mali", cursive;
}
</style>
