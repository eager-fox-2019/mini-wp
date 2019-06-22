<template>
  <div class="col p-5">
    <div class="container-fluid border p-5">
      <div>
        <div
          v-if="article.author._id == loggedInUser._id"
          class="m-3 align-self-end d-flex justify-content-around"
        >
          <a href @click.prevent="deleteArticle(article)">
            <i class="fa fa-trash fa-2x delete" aria-hidden="true"></i>
          </a>
          <a href @click.prevent="editArticle(article)">
            <i class="fa fa-pencil-square-o fa-2x edit" aria-hidden="true"></i>
          </a>
          <a>
            <i
              class="fa fa-heart fa-2x love text-muted"
              aria-hidden="true"
            >&ensp;{{article.likedby.length}}</i>
          </a>
        </div>
        <div
          v-if="article.author._id !== loggedInUser._id"
          class="m-3 align-self-end d-flex justify-content-end align-items-center"
        >
          <div class="p-3 ml-1">
            <a @click.prevent="like_unlike(article)">
              <div v-if="checkLike(article.likedby) == true">
                <i
                  class="fa fa-heart fa-2x love text-danger"
                  aria-hidden="true"
                >&ensp;{{article.likedby.length}}</i>
              </div>
              <div v-if="checkLike(article.likedby) == false">
                <i
                  class="fa fa-heart-o fa-2x love"
                  aria-hidden="true"
                >&ensp;{{article.likedby.length}}</i>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <img
          :src="article.picture"
          class="img-thumbnail"
          style="max-height: 320px; max-width:480px;"
          :alt="article.title"
        >
      </div>
      <div>
        <div class="text-center my-5">
          <h1>{{article.title}}</h1>
        </div>
        <div class="row my-3 px-5 container-fluid d-flex justify-content-center">
          <img
            :src="article.author.picture"
            class="img rounded-circle"
            style="height: 20px; width: 20px;"
          >
          <div v-if="article.status == 'post'">
            <p>{{article.author.name}} post this on {{ new Date(article.postedAt).toDateString()}} {{ new Date(article.postedAt).toTimeString()}}</p>
          </div>

          <div v-if="article.status == 'save'">
            <p>{{article.author.name}} save this on {{ new Date(article.createdAt).toDateString()}} {{ new Date(article.createdAt).toTimeString()}}</p>
          </div>
        </div>
      </div>
      <div class="p-3">
        <div v-html="article.rawHTML"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedArticle", "ax"],
  data() {
    return {
      loggedInUser: {},
      article: {}
    };
  },
  created() {
    this.loggedInUser = JSON.parse(localStorage.user);
    let str = this.loggedInUser._id + "_last_read";
    if (this.selectedArticle._id) {
      localStorage.setItem(str, JSON.stringify(this.selectedArticle));
      this.article = this.selectedArticle;
    } else {
      console.log("hello");
      this.article = JSON.parse(localStorage.getItem(str));
    }
  },
  mounted() {},
  methods: {
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
              this.$emit("myarticles");
            })
            .catch(err => {
              console.log(err);
              console.log(err.response);
              swal("Error Occurred", "Please try again later", "error");
            });
        }
      });
    },
    like_unlike(article) {
      this.ax({
        method: "PATCH",
        url: "/articles/likes/" + article._id
      })
        .then(({ data }) => {
          if (this.checkLike(article.likedby)) {
            let likedby = article.likedby;
            let index = likedby.indexOf(article);
            article.likedby.splice(index, 1);
          } else {
            article.likedby.push(this.loggedInUser);
          }
        })
        .catch(err => {
          swal("Sorry", "Problem occured, try again later", "error");
          console.log("errorlike unlike artikel", JSON.stringify(err, null, 2));
          console.log(err);
        });
    },
    checkLike(likedby) {
      let status = false;
      likedby.forEach(like => {
        if (like._id == this.loggedInUser._id) {
          status = true;
        }
      });
      if (status == true) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>

