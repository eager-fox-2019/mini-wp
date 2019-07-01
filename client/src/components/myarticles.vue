<template>
  <div class="p-5">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#all">All Articles</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#saved">Draft</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#posted">Posted</a>
      </li>
    </ul>
    <div class="tab-content border border-top-0">
      <div class="tab-pane fade active show" id="all">
        <div
          v-for="article in articles"
          :key="article._id"
          class="row mx-3 border-bottom d-flex justify-content-center"
        >
          <listview
            :article="article"
            :loggedInUser="loggedInUser"
            @read="readArticle(article)"
            @edit="editArticle(article)"
            @delete="deleteArticle(article)"
          ></listview>
        </div>
        <div v-if="articles.length == 0" class="p-5 text-center">
          <h1>NO ARTICLES FOUND</h1>
        </div>
      </div>
      <div class="tab-pane fade" id="saved">
        <div
          v-for="article in saved"
          :key="article._id"
          class="row mx-3 border-bottom d-flex justify-content-center"
        >
          <listview
            :article="article"
            :loggedInUser="loggedInUser"
            @read="readArticle(article)"
            @edit="editArticle(article)"
            @delete="deleteArticle(article)"
          ></listview>
        </div>
        <div v-if="saved.length == 0" class="p-5 text-center">
          <h1>NO ARTICLES FOUND</h1>
        </div>
      </div>
      <div class="tab-pane fade" id="posted">
        <div
          v-for="article in posted"
          :key="article._id"
          class="row mx-3 border-bottom d-flex justify-content-center"
        >
          <listview
            :article="article"
            :loggedInUser="loggedInUser"
            @read="readArticle(article)"
            @edit="editArticle(article)"
            @delete="deleteArticle(article)"
          ></listview>
        </div>
        <div v-if="posted.length == 0" class="p-5 text-center">
          <h1>NO ARTICLES FOUND</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listview from "./listview.vue";
import axios from "axios";
export default {
  props: ["ax", "initAxios"],
  components: { listview },
  data() {
    return {
      loggedInUser: {},
      articles: [],
      posted: [],
      saved: []
    };
  },
  created() {
    this.initAxios()
    this.loggedInUser = JSON.parse(localStorage.user);
    this._getUserArticles();
  },
  mounted() {},
  methods: {
    readArticle(article) {
      console.log("read");
      this.$emit("view", article);
    },
    editArticle(article) {
      console.log("edit");
      this.$emit("edit", article);
    },
    deleteArticle(article) {
      swal({
        title: "Confirmation",
        text: `Delete this article?`,
        icon: "info",
        buttons: true,
        dangerMode: true
      }).then(confirm => {
        if (confirm) {
          this.ax({
            method: "DELETE",
            url: "/articles/" + String(article._id),
            headers: {
              token: localStorage.token
            }
          })
            .then(({ data }) => {
              swal(
                "Article Deleted",
                "Successfully delete the article",
                "success"
              );
              this._getUserArticles();
            })
            .catch(err => {
              console.log(err);
              console.log(err.response);
              swal("Error Occurred", "Please try again later", "error");
            });
        }
      });
    },
    _getUserArticles() {
      this.articles = [];
      this.posted = [];
      this.saved = [];
      this.ax({
        method: "GET",
        url: "/articles/all/user?sort=desc"
      })
        .then(({ data }) => {
          this.articles = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].status == "post") {
              this.posted.push(data[i]);
            } else {
              this.saved.push(data[i]);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.delete {
  color: grey;
}
.delete:hover {
  color: red;
}

.edit {
  color: grey;
}
.edit:hover {
  color: orange;
}

.love {
  color: grey;
}
.love:hover {
  color: pink;
}
.read {
  color: grey;
}
.read:hover {
  color: #3399f3;
}
</style>

