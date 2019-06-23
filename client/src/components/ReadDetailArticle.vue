<template>
  <div class="row container">
    <div class="center">
      <a @click="read_article" class="waves-effect waves-light btn-small">
        <i class="material-icons left">fast_rewind</i>BACK
      </a>
    </div>
    <div class="col s12">
      <div class="card">
        <div class="title-detail">
          <h3 class="center">{{ article_detail_title }}</h3>
        </div>
        <div class="card-image">
          <img :src="article_detail_image">
        </div>
        <div class="card-content-detail">
          <p v-html="article_detail_content"></p>
        </div>
        <div class="center card-action">
          <div class="row center">
            <div
              class="col center"
              v-for="(article_detail_tag, index) in article_detail_tags"
              :key="index"
            >
              <div class="center">
                <a @click="search_by_tag_link(article_detail_tag)">
                  <i class="material-icons">label</i>
                  {{ article_detail_tag }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <a @click="read_article" class="waves-effect waves-light btn-small">
        <i class="material-icons left">fast_rewind</i>BACK
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "article_detail_title",
    "article_detail_content",
    "article_detail_image",
    "article_detail_tags"
  ],
  data() {
    return {};
  },
  methods: {
    read_article() {
      this.$emit("read_article");
    },
    search_by_tag_link(tag){
      console.log(' cari tag ini ' , tag)
      this.$emit('search_by_tag_link', tag)
    }

  }
};
</script>

<style scoped>
.card-content-detail{
  width: 100%;
}
  a{
    cursor: pointer;
  }
</style>
