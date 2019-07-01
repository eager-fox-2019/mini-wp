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
          <div class="row container-fluid px-0 d-flex justify-content-center">
            <div
              class="col-xl-3 col-lg-6 col-md-12 col-sm-12 p-3 d-flex align-items-center justify-content-center"
            >
              <div class="card border-0 p-3 m-3 text-white">
                <img
                  :src="article.picture"
                  :alt="article.title"
                  class="img-thumbnail align-self-center"
                  style="max-width:320px; max-height:240px;"
                />
                <a href @click.prevent="readArticle(article)">
                  <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
                    <div class="card-text border-0 bg-semitransparent text-center"></div>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 p-3">
              <div class="row container-fluid px-0 mx-0 read">
                <div class="col-12 m-0 p-0" href @click="readArticle(article)">
                  <div class="m-3">
                    <h1>{{article.title}}</h1>
                  </div>
                  <small
                    class="ml-3"
                  >created At {{new Date(article.createdAt).toLocaleDateString()}}</small>
                  <span v-if="article.status == 'post'" class="badge badge-info m-3">
                    <i class="fa fa-paper-plane mr-1"></i>
                    {{ article.status }}ed
                  </span>
                  <span v-if="article.status == 'save'" class="badge badge-warning m-3">
                    <i class="fa fa-floppy-o mr-1"></i>
                    {{ article.status }}d
                  </span>
                  <br />
                  <div class="m-3">
                    <span v-for="tag in article.tags" :key="tag" class="badge badge-secondary mr-3">
                      <i class="fa fa-tags mr-1"></i>
                      {{ tag }}
                    </span>
                  </div>
                  <div class="m-3 mt-0">
                    <p>{{article.content.split("").splice(0, 200).join("")}} ...</p>
                  </div>
                </div>
              </div>
              <div class="m-3 align-self-end d-flex justify-content-around">
                <a href @click.prevent="deleteArticle(article)">
                  <i class="fa fa-trash fa-2x delete" aria-hidden="true"></i>
                </a>
                <a href @click.prevent="editArticle(article)">
                  <i class="fa fa-pencil-square-o fa-2x edit" aria-hidden="true"></i>
                </a>
                <a>
                  <i class="fa fa-heart fa-2x love" aria-hidden="true">{{article.likedby.length}}</i>
                </a>
              </div>
            </div>
          </div>
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
import axios from "axios";
import listview from "./listview.vue";
export default {
  components: { listview },
  props: ["ax"],
  data() {
    return {
      loggedInUser: {},
      articles: [],
      posted: [],
      saved: []
    };
  },
  created() {
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

