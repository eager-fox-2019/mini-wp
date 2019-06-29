<template>
  <div>
    <!-- <navbarLogin :islogin="islogin"></navbarLogin> -->
    <navbarHome :islogin="islogin" @showHome="showHome" @showArticle="showArticle" @showCreate="showCreate" @logout="showLogin"></navbarHome>
    <div v-if="!islogin">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-sm" style="margin:100px;">
          <registerPage v-if="!islogin"></registerPage>
        </div>
        <div class="col-sm" style="margin:100px">
          <loginPage v-if="!islogin" @showHome="showHome"></loginPage>
        </div>
        <div class="col-2"></div>
      </div>
    </div>

    <div id="allArticle" v-if="home">
      <h2 style="display:flex;margin:20px;justify-content:center">All Articles</h2>
      <div class="row" style="display:flex;margin-left:60px;margin-bottom:20px">
        <div class="col">
          <button style="margin-right:10px;margin-bottom:10px;opacity:0.7" v-for="tag in allTags" type="button" class="btn btn-primary" v-on:click="filteringAll(tag, true)">{{ tag }}&nbsp;</button>
        </div>
      </div>
      <allArticle :home="home" v-for="data in articles" :data="data" style="margin-left:20.5%;width:841px"></allArticle>
    </div>

    <div id="articleList" v-if="articleStats">
      <h2 style="display:flex;margin:20px;justify-content:center">My Articles</h2>
      <div class="row" style="display:flex;margin-left:60px;margin-bottom:20px">
        <div class="col">
          <button style="margin-right:10px;margin-bottom:10px;opacity:0.7" v-for="tag in myTags" type="button" class="btn btn-primary" v-on:click="filteringAll(tag, false)">{{ tag }}&nbsp;</button>
        </div>
      </div>
      <allArticle @editMyArticle="showEdit" :articleStats="articleStats" v-for="data in myArticles" :data="data" @showArticle="showArticle" style="margin-left:20.5%;width:841px;display:flex;justify-content:center;flex-direction:column"></allArticle>
 
    </div>

    <div id="create" v-if="create">
      <h2 style="display:flex;margin:20px;justify-content:center">Create Article</h2>
      <createArtilce style="margin-left:20%;width:900px" @showArticle="showArticle"></createArtilce>
    </div>

    <div id="edit" v-if="edit">
      <h2 style="display:flex;margin:20px;justify-content:center">Edit Article</h2>
      <editArticle
        :editSelect="editSelect"
        style="margin-left:20%;width:900px"
        @showArticle="showArticle"
      ></editArticle>
    </div>
  </div>
</template>

<script>
const url = `http://34.87.13.129`;

import navbarHome from "./components/navbarHome.vue";
import loginPage from "./components/loginPage.vue";
import registerPage from "./components/registerPage.vue";
import allArticle from "./components/allArticle.vue";
import createArtilce from "./components/createArticle.vue";
import editArticle from "./components/editArticle.vue";

export default {
  name: "app",
  data() {
    return {
      home: false,
      create: false,
      edit: false,
      articleStats: false,
      islogin: false,
      articles: [],
      myArticles: [],
      allTags: [],
      myTags: [],
      editSelect: ""
    };
  },
  components: {
    navbarHome,
    loginPage,
    registerPage,
    allArticle,
    editArticle,
    createArtilce
  },
  methods: {
    showHome() {
      localStorage.setItem("currentPage", "home");
      this.islogin = true;
      this.home = true;
      this.create = false;
      this.articleStats = false;
      this.edit = false;
      this.readArticle();
    },
    showCreate() {
      localStorage.setItem("currentPage", "create");
      this.islogin = true;
      this.home = false;
      this.create = true;
      this.edit = false;
      this.articleStats = false;
    },
    showEdit(articleEdit) {
      localStorage.setItem("currentPage", "edit");
      this.islogin = true;
      this.home = false;
      this.create = false;
      this.articleStats = false;
      this.edit = true;
      this.editSelect = articleEdit;
    },
    showArticle() {
      localStorage.setItem("currentPage", "articleStats");
      this.islogin = true;
      this.home = false;
      this.create = false;
      this.articleStats = true;
      this.edit = false;
      this.readMyArticle();
    },
    showLogin() {
      localStorage.setItem("currentPage", "login");
      this.home = false;
      this.create = false;
      this.articleStats = false;
      this.islogin = false;
      this.edit = false;
    },
    readArticle(cb) {
      axios({
        method: "GET",
        url: `${url}/home/`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          console.log(result.data)
          this.articles = result.data;
          this.allTags = this.filterTag(this.articles);
          if (cb) {
            cb();
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    readMyArticle(cb) {
      axios({
        method: "GET",
        url: `${url}/home?myArticle=myArticle`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.myArticles = data;
          this.myTags = this.filterTag(this.myArticles);
          console.log("atas");
          if (cb) {
            cb();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterTag(input) {
      let arr = [];
      input.forEach(article => {
        article.tag.forEach(tag => {
          if (arr.indexOf(tag) == -1) {
            arr.push(tag);
          }
        });
      });
      return arr;
    },
    filteringAll(tag, status) {
      let filt = null
      if(status == true){
        filt = this.readArticle
      } else if(status == false) {
        filt = this.readMyArticle
        }
      filt(() => {
        let temp = null
        if(status == true){
          temp = this.articles
        } else if(status == false) {
          temp = this.myArticles
        }
        let arr = [];
        temp.forEach(article => {
          let temp = article.tag.join("");
          if (temp.includes(tag)) {
            arr.push(article);
          }
        });
      if(status == true){
        this.articles = arr
      } else if(status == false) {
        this.myArticles = arr
      }
      });
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.islogin = true;
      if (localStorage.currentPage == "home") {
        this.showHome();
      } else if (localStorage.currentPage == "articleStats") {
        this.showArticle();
      } else if (localStorage.currentPage == "create") {
        this.showCreate();
      } else {
        this.showArticle();
      }
    } else {
      this.showLogin();
    }
  }
};
</script>

<style scoped>
</style>