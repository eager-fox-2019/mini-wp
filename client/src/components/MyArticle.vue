<template>
  <div class="container">
    <div v-if="!myArticles.length" class="center">
      <H2>You don't have an article</H2>
    </div>
    <div v-else class="cals">
      <div v-for="(myArticle, index) in myArticles" :key="index">
        <div class="card row hoverable">
          <div id="myarticel_image" class="col s12 m6">
            <div class>
              <div class="card-content">
                <img :src="myArticle.featured_image" alt>
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <div class>
              <div class="card-content">
                <h5>{{ myArticle.title }}</h5>
                <span>Created: {{ getDate(myArticle.createdAt) }}</span>
              </div>
              <div class="card-action center">
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
#myarticel_image img {
  width: 100%;
}
h2,
h5 {
  font-family: "Mali", cursive;
}
</style>
