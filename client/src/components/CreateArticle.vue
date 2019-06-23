<template>
  <div class="container">
    <div v-if="loading" class>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
      <div class="center">
        <img src="../../public/pleasewait.gif" alt>
      </div>
    </div>

    <div v-if="!loading" class="row container">
      <form method="#" class="col s12">
        <div class="row">
          <div class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">Title</i>
              <input v-model="article_title" id="icon_prefix" type="text" class="validate">
              <label for="icon_prefix">Title</label>
            </div>
          </div>
        </div>

        <div class="center file-field input-field row">
                    <div class="center btn grey darken-3">
            <i class="material-icons right">image</i>
            <span>Upload Image</span>
            <input class="center" type="file" ref="file" v-on:change="handleFileUpload()">
          </div>
            <div class="center uploadimage">
              <img :src="urlTemp ? urlTemp : 'https://www.pngarts.com/files/3/Photo-Camera-PNG-Photo.png'" alt>
            </div>
          <div v-show="false" class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
        </div>
    
<!-- https://www.pngarts.com/files/3/Photo-Camera-PNG-Photo.png -->
        <!-- WYSIWYG -->
        <wysiwyg v-model="article_content"></wysiwyg>
        <br>
        <!-- TAGS -->
        <div class="row">
          <div class="input-field col s10 m9 l9">
            <i class="material-icons prefix">label</i>
            <!-- <input v-on:keyup.enter="onEnter" v-model="tag_input" id="tag_input" type="text" class="validate"> -->
            <input v-model="tag_input" id="tag_input" type="text" class="validate">
            <label for="tag_input">Tags</label>
            <span class="helper-text">Enter a tag</span>
          </div>
          <div class="col s2 m3 l3">
            <button
              v-show="button_tag"
              @click.prevent="add_tag_button"
              class="btn-large waves-effect waves-light"
              type="submit"
              name="action"
            >
              ADD
              <i class="material-icons">add</i>
            </button>
          </div>
        </div>
        <div class="row">
          <div v-for="(tag, index) in tags" :key="index" class="list-tag col">
            <div class="chip">
              <!-- <div class="chip-head"></div> -->
              <div class="chip-content">{{ tag }}</div>
              <div class="chip-close">
                <a @click.prevent="delete_tag(tag)">
                  <svg class="chip-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="center">
          <button
            @click.prevent="create_article"
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            POST
            <i class="material-icons right">publish</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  props: ["myServer"],
  data() {
    return {
      tag_input: "",
      tags: [],
      button_tag: false,
      article_title: "",
      article_content: "",
      urlTemp: '',
      file: "",
      loading: false,
    };
  },
  methods: {
    showLoading() {
      // console.log("showLoading dari create");
      this.loading = true;
    },
    hideLoading() {
      // console.log("hideLoading dari create");
      this.loading = false;
    },
    delete_tag(tag) {
      let index = this.tags.indexOf(tag);
      if (index !== -1) this.tags.splice(index, 1);
    },
    add_tag_button() {
      // console.log("add tag button");
      if (
        this.tag_input !== "" &&
        this.tags.indexOf(this.tag_input.toLowerCase()) == -1
      ) {
        this.tags.push(this.tag_input.toLowerCase());
        this.tag_input = "";
      }
    },
    onEnter() {
      // console.log("enter");
      if (this.tag_input !== "" && this.tags.indexOf(this.tag_input) == -1) {
        this.tags.push(this.tag_input);
        this.tag_input = "";
      }
    },
    handleFileUpload() {
      // console.log("handle file trigger");
      // console.log(this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
      const file = this.$refs.file.files[0];
      this.urlTemp = URL.createObjectURL(file);
    },
    create_article() {
      this.showLoading();
      // console.log(this.file, "ini file");
      if (this.article_title === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please fill article title`
        });
      } else if (this.article_content === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please fill article content`
        });
      } else if (this.file === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Image is required, please upload image`
        });
      } else {
        // console.log("create article trigger");
        let formData = new FormData();
        formData.append("image", this.file);
        axios
          .post(`${this.myServer}/articles/upload`, formData, {
            headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data"
            }
          })
          .then(({ data }) => {
            // console.log("hasil upload berhasil");
            // console.log(data);
            return axios({
              method: "post",
              url: `${this.myServer}/articles`,
              data: {
                title: this.article_title,
                content: this.article_content,
                featured_image: data,
                tags: this.tags,
                author: localStorage.getItem("id")
              },
              headers: {
                token: localStorage.getItem("token")
              }
            }).then(response => {
              this.hideLoading();
              this.article_title = "";
              this.article_content = "";
              this.article_tag = "";
              this.featured_image = "";
              this.urlTemp = "";
              (this.tags = []), this.add_new_article(response.data);
              Swal.fire({
                type: "success",
                title: "Created success.",
                showConfirmButton: false,
                timer: 1500
              });
            });
          })
          .catch(err => {
            this.hideLoading();
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data.message}`
            });
            console.log(err.response);
          });
      }
    },
    add_new_article(newArticle) {
      this.$emit("add_new_article", newArticle);
    }
  }
};
</script>

<style scoped>
.uploadimage img {
  max-width: 250px;
}
.chip {
  display: inline-flex;
  flex-direction: row;
  background-color: #e5e5e5;
  border: none;
  cursor: default;
  height: 36px;
  outline: none;
  padding: 0;
  font-size: 14px;
  font-color: #333333;
  font-family: "Open Sans", sans-serif;
  white-space: nowrap;
  align-items: center;
  border-radius: 16px;
  vertical-align: middle;
  text-decoration: none;
  justify-content: center;
}

.chip-head {
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #32c5d2;
  font-size: 1.25rem;
  flex-shrink: 0;
  align-items: center;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  width: 36px;
  color: #fff;
  height: 36px;
  font-size: 20px;
  margin-right: -4px;
}

.chip-content {
  cursor: inherit;
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  padding-left: 12px;
  padding-right: 12px;
}

.chip-svg {
  color: #999999;
  cursor: pointer;
  height: auto;
  margin: 4px 4px 0 -8px;
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 24px;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  user-select: none;
  flex-shrink: 0;
}

.chip-svg:hover {
  color: #666666;
}
</style>
