<template>
  <div>
    <div class="container content">
      <div class="row">
        <div class="col-lg-3 col-sm-12 mt-5 sidebar">
          <h1>SOmething</h1>
          <button
            type="button"
            class="btn btn-warning fixed-bottom"
            data-toggle="modal"
            data-target="#addarticlemodal"
            data-whatever="@mdo"
          >
            <i class="fa fa-lg fa-plus"></i>
          </button>
        </div>
        <div class="col-lg-9 col-sm-12 mt-5">
          <div class="card" v-for="article in articles" :key="article._id" style="width: auto;">
            <div d-flex flex-row>
              <span class="delete" @click="removeArticle(article)" v-show="!editType">
                <i class="fa fa-lg fa-trash trash-icon" aria-hidden="true"></i> |
              </span>
              <span class="edit" @click="editType=true" v-show="!editType">
                <i class="fa fa-lg fa-pencil pencil-icon" aria-hidden="true"></i>
              </span>
              <!-- <span class="check" v-show="editType" @click="editType=false"><i class="fa fa-lg fa-check" aria-hidden="true"></i></span> -->
            </div>
            <div class="card-body" v-show="!editType">
              <small>{{new Date(article.createdAt).toLocaleString()}}</small>
              <span class="growup">
                <i
                  class="fa fa-lg fa-sort-down"
                  data-toggle="collapse"
                  href="#collapseExample"
                  aria-expanded="false"
                ></i>
              </span>
              <h1 class="card-title">{{article.title}}</h1>
              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  <img
                    src="http://www.mobiles24.com/static/previews/downloads/default/331/P-634353-fyuQdDGwpM-1.jpg"
                  >
                  <p class="card-text">{{article.content}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="addarticlemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="post" id="formaddArticle" @submit.prevent="addArticle">
              <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="title"
                  v-model="newArticle.title"
                >
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Content</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  v-model="newArticle.content"
                ></textarea>
              </div>
              <div class="input-group">
                <!-- <span class="input-group-text" id="inputGroupFileAddon01">Upload</span> -->
                <picture-input ref="pictureInput"></picture-input>
              </div>
              <!-- <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                >
                <label class="custom-file-label" for="inputGroupFile01">Upload Picture</label>
              </div> -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="submitEdit">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let baseUrl = `http://localhost:3006`;

export default {
  components: {
    "picture-input": PictureInput
  },
  data() {
    return {
      newArticle: {
        title: "",
        content: "",
        picture: ""
      },
      articles: [],
      editType: false
    };
  },
  created() {
    axios({
      method: "GET",
      url: `${baseUrl}/articles`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.articles = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addArticle() {
      console.log("add");
      console.log(this.$refs.pictureInput)
      console.log(this.$refs.pictureInput.file);
      console.log(this.tags);

      let newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("tags", this.tags);
      console.log(newImage);
      
      axios({
        method: "POST",
        url: `${baseUrl}/articles`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          // title: this.newArticle.title,
          // content: this.newArticle.content,
          // picture: " "
          newImage
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: 'success',
            title: 'Image posted successully'
          })
          console.log(data);
          this.articles.push(data);
          // console.log(this.articles);
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeArticle(post) {
      console.log(post);
      axios({
        method: "DELETE",
        url: `${baseUrl}/articles/${post._id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          let index = this.articles.indexOf(post);
          this.articles.splice(index, 1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editArticle(post) {
      console.log(post);

      axios({
        method: "PUT",
        url: `${baseUrl}/articles/${post._id}`,
        data: {
          title: this.newArticle.title,
          content: this.newArticle.content
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data + "======");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
    .sidebar {
        color: aliceblue;
        position: relative;
    }

    .card-body {
        background-color: rgba(255, 255, 255, 0.932);
        text-align: left;
    }

    .card img {
        padding-top: 1rem;
        padding-bottom: 2rem;
        width: 46.3rem;
    }

    .card span {
        color: #49ecb3;
    }

    .growup {
        padding-left: 43rem;
        text-align: right;
        font-size: 1.5rem;
    }

    .delete, .edit {
        padding-top: 3rem;
    }
</style>