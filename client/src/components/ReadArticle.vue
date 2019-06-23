<template>
  <div>
    <div class="container row">
      <div class="col s12 m6 l6">
        <nav class="grey darken-3">
          <div class="nav-wrapper">
            <form>
              <div class="input-field">
                <input
                  v-model="search_input_title"
                  id="searchTitle"
                  type="search"
                  placeholder="Search By Title"
                  required
                >
                <label class="label-icon" for="search">
                  <i class="material-icons">search</i>
                </label>
                <i @click="clear_search_title" class="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>

      <div class="col s12 m6 l6">
        <nav class="grey darken-3">
          <div class="nav-wrapper">
            <form @submit.prevent="search_by_tag">
              <div class="input-field">
                <input
                  v-model="search_input_tag"
                  id="searchTags"
                  type="search"
                  placeholder="Search By Tags  ⏎ "
                  required
                >
                <label class="label-icon" for="search">
                  <i class="material-icons">search</i>
                </label>
                <i @click="clear_search_tag" class="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
    <!-- ARTICLE LIST -->
    <div class="row container">
      <div v-for="(article, index) in articlesFilter" :key="index">
        <!-- ARTICLE LIST LOOPING-->
        <div class="col s12 m6 l4">
          <div class="card medium hoverable">
            <div class="card-image">
              <!-- <a
                @click="remove_article(article._id)"
                class="btn-floating halfway-fab waves-effect waves-light red"
              > -->
                <!-- <i class="material-icons">add</i></a> -->
                <!-- <i class="material-icons">remove</i> -->
              <!-- </a> -->
              <a @click.prevent="read_more_link(article._id)"><img class="materialboxed" :src="article.featured_image"></a>
            </div>
            <div class="card-content">
              <div class="titlestyle" style="height: 46px;
              overflow: hidden;">
                <span>{{ article.title }}</span>
                <br>
              </div>
              <a @click.prevent="read_more_link(article._id)" href="#">Read More...</a>
            </div>
            <div class="row">
              <div class="col s2 offset-s1">
                <img src="/public/user-icon.png" alt class="circle responsive-img">
              </div>
              <div class="col s9">
                <div class="authorstyle">
                  {{ article.author ? article.author.name : 'No name' }}
                  <div
                    class="ui-caption u-fontSize12 u-baseColor--textNormal u-textColorNormal js-postMetaInlineSupplemental"
                  >
                    <time datetime="article.createdAt">{{ getDate(article.createdAt) }}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ARTICLE LIST LOOPING END-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["articles", "myServer"],
  data() {
    return {
      search_input_title: "",
      search_input_tag: ""
    };
  },
  methods: {
    read_more_link(id) {
      this.$emit("read_more_link", id);
    },
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString();
      return dateString;
    },
    search_by_tag() {
      // console.log('trigger cari')
      this.$emit("search_by_tag", this.search_input_tag);
    },
    clear_search_title() {
      // console.log("clear search trigger");
      this.search_input_title = "";
    },
    clear_search_tag() {
      // console.log('clear_search_tag')
      this.search_input_tag = "";
      this.$emit("fetchArticles");
    }
  },
  computed: {
    articlesFilter: function() {
      // console.log("search trigger");
      return this.articles.filter(article => {
        return article.title
          .toLowerCase()
          .match(this.search_input_title.toLowerCase());
      });
    }
  }
};
</script>

<style>
.card-content-detail p {
  font-size: 21px;
  font-family: "B612 Mono", monospace;
}

h3,
.titlestyle {
  font-family: "B612 Mono", monospace;
}

.authorstyle {
  font-family: "Mali", cursive;
}
</style>
