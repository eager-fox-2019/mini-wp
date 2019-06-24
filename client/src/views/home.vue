<template>
  <div>
    <section>
      <!-- SEARCHBAR -->
      <b-field position="is-centered" style="padding: 20px">
        <div class="field">
          <div class="control">
            <input
              class="input is-large"
              type="text"
              v-model="search"
              placeholder="Search awesome article"
            >
          </div>
        </div>
        <p class="control">
          <button class="button is-large is-dark" @click="searchArticle">
            <b-icon icon="magnify"></b-icon>
          </button>
        </p>
      </b-field>
      <!-- TAGS -->
      <div class="container">
        <div class="columns">
          <div class="column is-2"></div>
          <div class="column">
            <div class="buttons level is-centered">
              <b-button
                v-for="tag in existingTags"
                :key="tag"
                @click="search=tag; searchArticle()"
              >{{tag}}</b-button>
            </div>
            <!-- <b-taglist class="level is-centered">
              <b-tag
                type="is-dark"
                v-for="tag in existingTags"
                :key="tag"
                @click="this.search=tag; searchArticle()"
              >{{tag}}</b-tag>
            </b-taglist>-->
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="section">
        <div class="columns">
          <!-- ARTICLE LIST -->
          <div class="column" v-if="searchResult.length === 0">
            <div class="articlelist" v-for="article in filteredArticle" :key="article._id">
              <cardarticle v-scroll-reveal.reset :article="article"></cardarticle>
            </div>
          </div>
          <!-- SEARCH RESULT -->
          <div class="column" v-if="searchResult.length !== 0">
            <div class="searchresult">
              <div class="box">
                <h2 class="title">Search Result</h2>
              </div>
              <!-- BY TITLES FOUND -->
              <h3 class="subtitle">Titles found ({{searchResult.result_title.length}})</h3>
              <cardarticle
                v-for="article in searchResult.result_title"
                :key="article._id"
                v-scroll-reveal.reset
                :article="article"
              ></cardarticle>
              <!-- BY TAGS FOUND -->
              <h3 class="subtitle">Tags found ({{searchResult.result_tag.length}})</h3>
              <cardarticle
                v-for="article in searchResult.result_tag"
                :key="article._id"
                v-scroll-reveal.reset
                :article="article"
              ></cardarticle>
            </div>
          </div>
          <!-- LATEST ARTICLE -->
          <div class="column is-one-third" sticky-container>
            <div v-sticky sticky-z-index="1" sticky-side="top">
              <div class="box has-text-centered-mobile">
                <span class="is-size-5 has-text-weight-bold">News</span>
              </div>
              <div>
                <cardlatest
                  v-for="(article, index) in news.articles"
                  :key="index"
                  :article="article"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import cardarticle from "../components/card-article.vue";
import cardlatest from "../components/card-latest.vue";
import miniwp from "../api/miniwp";
export default {
  components: {
    cardarticle,
    cardlatest
  },
  data() {
    return {
      page: "Home",
      articles: [],
      search: "",
      existingTags: [],
      searchResult: [],
      news: []
    };
  },
  methods: {
    getNews() {
      miniwp({
        url: "/news",
        method: "GET"
      })
        .then(({ data }) => {
          this.news = data;
          console.log(this.news);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getArticles() {
      console.log("masuk");
      miniwp({
        url: "/articles",
        method: "GET"
      })
        .then(({ data }) => {
          this.articles = data.reverse();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    searchArticle() {
      console.log("masuk");
      miniwp({
        url: `/articles/search?title=${this.search}&tags=${this.search}`,
        method: "GET"
      })
        .then(({ data }) => {
          console.log("success");
          console.log(data);
          this.searchResult = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getAllTags() {
      miniwp({
        url: "/articles/tags",
        method: "GET"
      })
        .then(({ data }) => {
          this.existingTags = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  created() {
    this.getAllTags();
  },
  computed: {
    filteredArticle() {
      console.log(this.search);
      let filter = this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.search.toLowerCase());
      });
      if (filter.length === 0) return this.articles;
      else return filter;
    }
  },
  mounted() {
    this.getArticles();
    this.getNews();
  },
  watch: {
    search() {
      if (this.search === "") {
        this.searchResult = [];
      }
    }
  }
};
</script>
<style>
</style>

