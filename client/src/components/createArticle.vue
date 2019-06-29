<template>
  <div>
    <form @submit.prevent="createArticle">
      <div class="form-group">
        <label for="titleForm" style="color:white">Title</label>
        <input
          v-model="article.title"
          type="text"
          class="form-control"
          id="titleForm"
          placeholder="Title"
        >
      </div>
      <div class="form-group">
          <h6 style="color:white;text-align:center">Image</h6>
        <div class="container">
          <div class="container" style>
            <picture-input
              ref="pictureInput"
              width="100"
              height="100"
              :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: `<img
            style='margin-right: 60px;height: 100px;width:100px;'
            src='http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Camera-Next-icon.png'
            alt='Card image cap'
          >`
      }"
            ></picture-input>
            <p v-if="error" style="color:red;display:flex;justify-content:center">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="form-group">
        <Vueditor style="height:300px;margin-top:30px" ref="wisi"></Vueditor>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
const url = `http://34.87.13.129`;
import PictureInput from "vue-picture-input";
export default {
  name: "navbar-login",
  props: [],
  data() {
    return {
      article: {
        title: "",
        content: "",
        image: "",
        tag: ""
      },
      error: false
    };
  },
  components: {
    PictureInput
  },
  created() {},
  methods: {
    createArticle() {
      this.article.content = this.$refs.wisi.getContent();
      console.log(this.$refs.wisi)
      let newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("title", this.article.title);
      newImage.append("content", this.article.content);
      //   newImage.append("tags", this.tags);
      console.log(newImage);
      for (var data of newImage) {
        console.log(data);
      }

      axios({
        method: "POST",
        url: `${url}/home/`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit("showArticle");
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error.response);
        });
    }
  }
};
</script>