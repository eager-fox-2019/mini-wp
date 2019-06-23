<template>
  <div>
    <ReadArticle
      @search_by_tag="search_by_tag"
      v-if="ReadArticlePage"
      @read_more_link="read_more_link"
      @fetchArticles="fetchArticles"
      :articles="articles"
      :myServer="myServer"
      @trigger_start_loading="trigger_start_loading"
    ></ReadArticle>

    <ReadDetailArticle
    @search_by_tag_link="search_by_tag_link"
      v-if="ReadDetailArticlePage"
      @read_article="read_article"
      :article_detail_title="article_detail_title"
      :article_detail_content="article_detail_content"
      :article_detail_image="article_detail_image"
      :article_detail_tags="article_detail_tags"
    ></ReadDetailArticle>
  </div>
</template>

<script>
import ReadArticle from "./ReadArticle";
import ReadDetailArticle from "./ReadDetailArticle";

export default {
  components: {
    ReadArticle,
    ReadDetailArticle
  },
  props: ["articles", "myServer"],
  data() {
    return {
      article_detail_title: "",
      article_detail_content: "",
      article_detail_image: "",
      article_detail_tags: [],
      ReadDetailArticlePage: false,
      ReadArticlePage: true
    };
  },
  methods: {
    trigger_start_loading(){
      this.$emit('trigger_start_loading')
    },
    search_by_tag_link(tag){
      console.log(' response dari parent', tag)
      this.ReadArticlePage = true
      this.ReadDetailArticlePage = false
      this.$emit('search_by_tag_link', tag)
    },
    search_by_tag(q) {
      this.$emit("search_by_tag", q);
    },
    fetchArticles() {
      this.$emit("fetchArticles");
    },
    read_article() {
      this.ReadArticlePage = true;
      this.ReadDetailArticlePage = false;
    },
    read_more_link(id) {
      // console.log("read_more_link");
      let articleSelected;
      this.articles.forEach(element => {
        if (element._id == id) {
          articleSelected = element;
        }
      });
      (this.article_detail_title = articleSelected.title),
        (this.article_detail_content = articleSelected.content),
        (this.article_detail_image = articleSelected.featured_image),
        (this.article_detail_tags = articleSelected.tags);
      this.ReadArticlePage = false;
      this.ReadDetailArticlePage = true;
      // console.log(articleSelected);
    }
  }
};
</script>