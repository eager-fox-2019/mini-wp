<template>
  <div>
    <section>
      <div class="container">
        <div class="columns">
          <div class="column is-2"></div>
          <div class="column">
            <section>
              <div class="box">
                <p class="title has has-text-centered">{{action}}</p>
                <section class="has-text-centered" id="section-upload">
                  <b-field>
                    <b-input
                      v-model="title"
                      rounded
                      placeholder="Title..."
                      size="is-medium"
                      icon="pencil"
                    ></b-input>
                  </b-field>
                  <b-field :style="{background: 'url('+featuredImgUrl+')'}" class="upload-field">
                    <b-upload
                      v-model="dropFiles"
                      drag-drop
                      :disabled="disabled"
                      :loading="loading"
                      @input="processFImage"
                    >
                      <section class="section">
                        <div class="content has-text-centered">
                          <p>
                            <b-icon icon="upload" size="is-large"></b-icon>
                          </p>
                          <p>
                            Featured Image
                            <br>
                            {{filename}}
                          </p>
                        </div>
                      </section>
                    </b-upload>
                  </b-field>
                </section>
              </div>
            </section>
            <section>
              <div class="box">
                <editor v-model="editorData" :importeddata="editorData"></editor>
                <!-- <div class="has-text-centered" style="margin: 10px">
                  <tagsinput @added="tags = $event"></tagsinput>
                </div>-->
                <tagsinput
                  element-id="tags"
                  v-model="selectedTags"
                  :typeahead="true"
                  :existing-tags="existingTags"
                ></tagsinput>
                <div class="has-text-centered" style="margin: 10px">
                  <b-button :loading="loading" class="is-dark" @click="createArticle">Submit</b-button>
                </div>
              </div>
            </section>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import editor from "../components/editor.vue";
import miniwp from "../api/miniwp";
// import tagsinput from "../components/tags-input.vue";
import tagsinput from "@voerro/vue-tagsinput";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      action: "New Article",
      editorData: "",
      config: {
        placeholder: "compose an epic..."
      },
      selectedTags: [],
      existingTags: {
        "web-dev": "Web Development"
      },
      dropFiles: null,
      filename: "Click/drag to upload image",
      loading: false,
      featuredImgUrl: "",
      disabled: false,
      title: "",
      slug_url: null,
      article_id: null
    };
  },
  components: {
    editor,
    tagsinput
    // tagsinput
  },
  methods: {
    deleteDropFile: function() {
      this.dropFiles.splice(index, 1);
    },
    processFImage() {
      console.log(this.dropFiles);
      this.uploadImg(this.dropFiles);
    },
    uploadImg(file) {
      this.loading = true;
      let formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      miniwp({
        url: "/upload",
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        timeout: 8000,
        data: formData
      })
        .then(({ data }) => {
          this.filename = file.name;
          console.log(data);
          this.loading = false;
          this.featuredImgUrl = data.link;
          this.disabled = true;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.$toast.open("Upload failed");
        });
    },
    createArticle() {
      if (this.action == "Edit Article") {
        this.updateArticle();
      } else {
        this.loading = true;
        let articleData = {
          title: this.title,
          image: this.featuredImgUrl,
          body: this.editorData,
          tags: this.selectedTags
        };
        miniwp({
          url: "/articles",
          method: "POST",
          headers: {
            token: localStorage.getItem("token")
          },
          data: articleData
        })
          .then(({ data }) => {
            console.log(data);
            this.loading = false;
            this.title = "";
            this.featuredImgUrl = "";
            this.editorData = "";
            this.tags = [];
            Swal.fire("Success", "your article has been saved", "success");
            this.$router.push(`/article/${data.slug_url}`);
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    },
    updateArticle() {
      console.log("masuk update");
      this.loading = true;
      let articleData = {
        title: this.title,
        image: this.featuredImgUrl,
        body: this.editorData,
        tags: this.selectedTags,
        slug_url: this.slug_url
      };
      miniwp({
        url: `/articles/${this.article_id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: articleData
      })
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.empty();
          Swal.fire("Success", "your article has been saved", "success");
          this.$router.push(`/article/${data.slug_url}`);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    empty() {
      this.title = "";
      this.featuredImgUrl = "";
      this.editorData = "";
      this.tags = [];
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
    },
    getArticle() {
      let slug = this.$route.params.title;
      console.log(slug);
      miniwp({
        url: `/articles/${slug}`,
        method: "GET"
      })
        .then(({ data }) => {
          console.log("masuk then", data);
          this.editorData = data.body;
          this.title = data.title;
          this.featuredImgUrl = data.image;
          this.selectedTags = data.tags;
          this.article_id = data._id;
          // console.log(this.editorData);
          // console.log(this.article);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  mounted() {
    this.getAllTags();
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("masuk");
      if (localStorage.hasOwnProperty("token")) {
        next();
      } else {
        next("/");
      }
    });
  },
  watch: {
    selectedTags() {
      console.log(this.selectedTags);
    },
    editorData() {}
  },
  created() {
    // console.log(this.$route.params.title);
    if (this.$route.name === "edit article") {
      this.action = "Edit Article";
      this.slug_url = this.$route.params.title;
      this.getArticle();
    }
  }
};
</script>

<style scoped>
.box {
  box-shadow: none;
}
.field {
  /* width: 700px; */
}

#section-upload b-field.upload-field {
  object-fit: cover;
}

.tags-input-badge {
  background-color: red;
}
</style>


