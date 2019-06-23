<template>
  <div>
    <form @submit.prevent="editArticle">
      <div class="form-group">
        <label for="titleForm" style="color:white">Title</label>
        <input
          v-model="article.title"
          type="text"
          class="form-control"
          id="titleForm"
          :placeholder="editSelect.title "
        >
      </div>
      <div class="form-group">
        <h6 style="color:white;text-align:center">Image</h6>
             <picture-input
              ref="pictureInput"
              width="100"
              height="100"
              :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: `          <img
            style='margin-right: 60px;width:100px;'
            src='${editSelect.image}'
            alt='Card image cap'
          >`
      }"
            ></picture-input>
            <p v-if="error" style="color:red;display:flex;justify-content:center">Image required!</p>
      </div>

      <div class="form-group">
        <Vueditor style="height:300px;margin-top:30px" ref="wisi2"></Vueditor>
      </div>
      <button type="submit" class="btn btn-primary">Edit</button>
          <button  v-on:click="cancel" class="btn btn-secondary">Cancel</button>
    </form>

  </div>
</template>

<script>
const url = `http://localhost:3000`;
import PictureInput from "vue-picture-input";
export default {
  name: "navbar-login",
  props: ["editSelect"],
  data() {
    return {
      article: {
        title: "",
        content: "",
        image: ""
      },
      error: false
    };
  },
  components: {
    PictureInput
  },
  created() {},
  mounted() {
  
    var content = this.editSelect.content; // data you fire var editorDiv =
    var editorDiv = document.getElementsByClassName("ve-design")[0]; // get vueditor element
    var iFrame = editorDiv.getElementsByTagName("iframe")[0]; // get body of iframe in vueditor

    // this.$refs.wisi2.setContent(content)
    //    console.log(iFrame.contentWindow.document)
    iFrame.contentWindow.document.body.innerHTML = content; // overide value's body
          //  console.log(iFrame.contentWindow.document)
    // iFrame.contentWindow.document.body.spellcheck = true
    // iFrame.contentWindow.document.body.style = "overflow-x: hidden"
    // iFrame.contenteditable=true
    // iFrame.contentWindow.contenteditable=true
    // iFrame.contentWindow.document.contenteditable=true
    // iFrame.contentWindow.document.body.contenteditable=true
    //    console.log(editorDiv)
    // console.log(content)

  },
  methods: {
    cancel(){
      this.$emit("showArticle");
    },
    editArticle(id) {
      this.article.content = this.$refs.wisi2.getContent();
      let newImage = new FormData();
      if (this.$refs.pictureInput.file) {
        newImage.append("image", this.$refs.pictureInput.file);
      }
      newImage.append("title", this.article.title);
      newImage.append("content", this.article.content);
      console.log(newImage);
      for (var data of newImage) {
        console.log(data);
      }
      axios({
        method: "PATCH",
        url: `${url}/home/${this.editSelect._id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit("showArticle");
          console.log("#####");
        })
        .catch(error => {
          this.error = true;
          console.log(error.response);
        });
    }
  }
};
</script>