<template>
  <div class="container">
    <div class="">
      <div v-if="loading" class>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
        <div class="center">
          <img src="../../public/pleasewait.gif" alt>
        </div>
      </div>
      <!-- {{this.edit_article_data}} -->
      <div v-if="!loading" class="row">
        <form method="#" class="col s12">
          <div class="row">
            <div class="center">
              <div class="input-field col s12">
                <i class="material-icons prefix">Title</i>
                <input v-model="edit_title" focusable id="icon_prefix" type="text" class="validate">
                <label class="active" for="icon_prefix">Title</label>
              </div>
            </div>
          </div>

          <div class="file-field input-field row">
            <div class="center btn grey darken-3">
              <i class="material-icons right">image</i>
              <span>Change Image</span>
              <input type="file" ref="file" v-on:change="handleFileUpload()">
            </div>
            <div class="center edit-image">
              <img :src="urlTemp" alt>
            </div>

            <div v-show="false" class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>

          <wysiwyg v-model="edit_content"></wysiwyg>
          <br>
          <!-- TAGS -->
          <div class="row">
            <div class="input-field col s10 m9 l9">
              <i class="material-icons prefix">label</i>
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
            <div v-for="(tag, index) in edit_tags" :key="index" class="list-tag col">
              <div class="chip">
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
              @click.prevent="update_article_trigger"
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              UPDATE
              <i class="material-icons right">mode_edit</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["edit_article_data", "myServer"],
  data() {
    return {
      data_edit: this.edit_article_data,
      edit_title: this.edit_article_data[0].title,
      edit_content: this.edit_article_data[0].content,
      edit_tags: this.edit_article_data[0].tags,
      urlTemp: this.edit_article_data[0].featured_image,
      tag_input: "",
      file: "",
      button_tag: false,
      loading: false
    };
  },
  methods: {
    update_article_trigger() {
      this.loading = true;
      // console.log("update_article trigger");
      if (this.edit_article_data[0].featured_image === this.urlTemp) {
        // console.log("foto sama");
        this.update_article(this.urlTemp);
      } else {
        // console.log("foto beda");
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
            this.update_article(data);
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data.message}`
            });
          });
      }
    },
    update_article(imageUrl) {
      axios({
        method: "put",
        url: `${this.myServer}/articles/${this.edit_article_data[0]._id}`,
        data: {
          title: this.edit_title,
          content: this.edit_content,
          featured_image: imageUrl,
          tags: this.edit_tags
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          // this.hideLoading();
          this.loading = false;
          this.update_data_edit(response.data);
          Swal.fire({
            type: "success",
            title: "Update success.",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          this.loading = false;
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
    },
    update_data_edit(data) {
      this.$emit("update_data_edit", data);
    },
    delete_tag(tag) {
      let index = this.edit_tags.indexOf(tag);
      if (index !== -1) this.edit_tags.splice(index, 1);
    },
    add_tag_button() {
      // console.log("add tag button");
      if (
        this.tag_input !== "" &&
        this.edit_tags.indexOf(this.tag_input.toLowerCase()) == -1
      ) {
        this.edit_tags.push(this.tag_input.toLowerCase());
        this.tag_input = "";
      }
    },
    handleFileUpload() {
      // console.log("handle file trigger");
      // console.log(this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
      const file = this.$refs.file.files[0];
      this.urlTemp = URL.createObjectURL(file);
      // console.log(this.urlTemp);
    }
  }
};
</script>

<style scoped>
.edit-image img {
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
