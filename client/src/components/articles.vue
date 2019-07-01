<template>
  <div class="p-5">
    <input
      type="text"
      v-model="filter"
      @keyup.enter="addTag"
      placeholder="Filter Article by Tag"
      class="form-control"
    />
    <div v-if="filterStatus.length > 0">
      <div class="my-2 border d-flex align-items-center p-1">
        Filters :
        <div v-for="tag in filterStatus" :key="tag.filter" class="ml-3">
          <span
            v-if="tag.count > 0"
            @click="removeTag(tag.filter)"
            class="badge badge-info"
          >{{tag.filter}} ({{tag.count}})</span>
          <span
            v-if="tag.count == 0"
            @click="removeTag(tag.filter)"
            class="badge badge-warning"
          >{{tag.filter}}</span>
        </div>
        <button @click="resetFilter" class="btn btn-secondary-outline read btn-sm ml-3">
          <i class="fa fa-refresh">&nbsp;&nbsp;Reset Filter</i>
        </button>
      </div>
    </div>
    <div v-if="articles.length > 0" class="border my-2">
      <div
        v-for="(article, index) in articles"
        :key="article._id"
        class="row mx-3 border-bottom d-flex justify-content-center"
      >
        <listview
          :article="article"
          :loggedInUser="loggedInUser"
          @read="readArticle(article)"
          @edit="editArticle(article)"
          @delete="deleteArticle(article)"
          @lu="like_unlike(article, index)"
        ></listview>
      </div>
    </div>
    <div v-if="articles.length == 0" class="border my-2 p-5 text-center">
      <h1>NO ARTICLES FOUND</h1>
    </div>
  </div>
</template>

<script>
import listview from "./listview.vue";
export default {
  components: { listview },
  props: ["ax"],

  data() {
    return {
      loggedInUser: {},
      all: [],
      articles: [],
      filter: "",
      filterTags: [],
      filterStatus: []
    };
  },
  created() {
    this.initAxios();
    this.loggedInUser = JSON.parse(localStorage.user);
    this._getAllArticles();
  },
  mounted() {
    this.loggedInUser = JSON.parse(localStorage.user);
  },
  methods: {
    resetFilter() {
      this.filterTags = [];
      this.filterStatus = [];
      this.articles = this.all;
    },
    addTag() {
      if (this.filter == "") {
      } else {
        if (this.filterTags.length >= 5) {
          swal("Info", "You can only filter by 5 tags at once", "info");
        } else {
          let input = this.filter;
          let tags = this.filterTags;
          if (input.match(/^[A-Za-z]+$/)) {
            if (tags.indexOf(input) === -1) {
              if (input.length > 12 || input.length < 3) {
                swal("Tags should consists of 3 - 12 characters");
              } else {
                this.filterTags.push(input.toLowerCase());
                this.filter = "";
                this.filterArticle();
              }
            }
          }
        }
      }
    },
    removeTag(tag) {
      let tags = this.filterTags;
      let index = tags.indexOf(tag);
      this.filterTags.splice(index, 1);
      if (this.filterTags.length == 0) {
        this.articles = this.all;
        this.filterStatus = [];
      } else {
        this.filterArticle();
      }
    },
    filterArticle() {
      if (this.filterTags.length > 0) {
        this.articles = [];
        let filters = this.filterTags;
        let articles = this.all;
        this.filterStatus = [];
        let status = [];
        filters.forEach((filter, j) => {
          let found = false;
          articles.forEach((article, i) => {
            let tags = article.tags;
            if (tags.indexOf(filter) > -1) {
              if (this.articles.indexOf(article) == -1) {
                this.articles.push(article);
                found = true;
              }
              let exist;
              for (let i = 0; i < status.length; i++) {
                if (status[i].filter == filter) {
                  exist = true;
                  status[i].count++;
                }
              }
              if (!exist) {
                status.push({ filter, count: 1 });
              }
            }
          });
          if (found == false) {
            let exist;
            for (let i = 0; i < status.length; i++) {
              if (status[i].filter == filter) {
                exist = true;
              }
            }
            if (!exist) {
              status.push({ filter, count: 0 });
            }
          }
        });
        console.log(status);
        this.filterStatus = status;
      }
    },
    checkLike(likedby) {
      if (likedby.indexOf(this.loggedInUser._id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    _getAllArticles() {
      this.ax({
        method: "GET",
        url: "/articles?sort=desc"
      })
        .then(({ data }) => {
          this.articles = data;
          this.all = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    like_unlike(article, index) {
      if (this.checkLike(article.likedby)) {
        swal({
          title: "Confirmation",
          text: `Unlike this article?`,
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(confirm => {
          if (confirm) {
            this.ax({
              method: "PATCH",
              url: "/articles/likes/" + article._id
            })
              .then(({ data }) => {
                if (this.checkLike(article.likedby)) {
                  let i = this.articles[index].likedby.indexOf(
                    this.loggedInUser._id
                  );
                  this.articles[index].likedby.splice(i, 1);
                } else {
                  this.articles[index].likedby.push(this.loggedInUser._id);
                }
              })
              .catch(err => {
                swal("Sorry", "Problem occured, try again later", "error");
                console.log(
                  "errorlike unlike artikel",
                  JSON.stringify(err, null, 2)
                );
                console.log(err);
              });
          }
        });
      } else {
        swal({
          title: "Confirmation",
          text: `Like this article?`,
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(confirm => {
          if (confirm) {
            this.ax({
              method: "PATCH",
              url: "/articles/likes/" + article._id
            })
              .then(({ data }) => {
                if (this.checkLike(article.likedby)) {
                  let i = this.articles[index].likedby.indexOf(
                    this.loggedInUser._id
                  );
                  this.articles[index].likedby.splice(i, 1);
                } else {
                  this.articles[index].likedby.push(this.loggedInUser._id);
                }
              })
              .catch(err => {
                swal("Sorry", "Problem occured, try again later", "error");
                console.log(
                  "errorlike unlike artikel",
                  JSON.stringify(err, null, 2)
                );
                console.log(err);
              });
          }
        });
      }
    },
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
            url: "/articles/" + String(article._id)
          })
            .then(({ data }) => {
              console.log(data);
              swal(
                "Article Deleted",
                "Successfully delete the article",
                "success"
              );
              this._getAllArticles();
            })
            .catch(err => {
              console.log(err);
              console.log(err.response);
              swal("Error Occurred", "Please try again later", "error");
            });
        }
      });
    }
  }
};
</script>


<style>

.profile {
  max-width: 50px;
  max-height: 50px;
}

.badge-info:hover {
  background-color: red;
}
.badge-warning:hover {
  background-color: red;
}
.delete {
  color: grey;
}
.delete:hover {
  color: orangered;
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
  color: rgb(255, 88, 166);
}
.read {
  color: grey;
}
.read:hover {
  color: #3399f3;
}
</style>

