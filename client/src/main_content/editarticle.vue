<template>
    <div>
      <div id = "edit-header">
        <a href="#" v-on:click="back">Back</a>
        <h2>Edit your article</h2>
      </div>
          <form method="post" v-on:submit.prevent="reqEditArticle" enctype="multipart/form-data">
          <label for="edit-article-title">Title: </label>
          <input 
            id="edit-article-title" 
            type="text" 
            v-model="editArticle.title"
            autocomplet="off"
            required
            >
          <input
          id="article-picture"
          type="file"
          name="avatar"
          ref="uploadImg"
          v-on:change.prevent="previewFile"
          style="width: auto;font-size: 16px;"
          > 
        <img v-bind:src="editArticle.image" height="200px" alt=" Image preview..." style="border:1px solid lightgrey;">
        <wysiwyg class="wysiwyg" v-model="editArticle.content"></wysiwyg>

          <button id="btnEditArticle" type="submit" class="btn btn-secondary">Edit article</button>
        </form> 
    </div>
</template>

<script>
export default {
   props: ['editArticle'],
    data() {
      return {
        loginEmail: "",
        loginPass: "",
        articles: [],
        searchTitle: "",
      };
    },
    methods: {
      previewFile() {
        var preview = document.querySelector('img'); 
        var file    = document.querySelector('input[type=file]').files[0]; 
        var reader  = new FileReader();
  
        reader.onloadend = function () {
            preview.src = reader.result;
        }
  
        if (file) {
            reader.readAsDataURL(file); 
        } else {
            preview.src = "";
        }
      },

      reqEditArticle() {
        let formData = new FormData()
        let img = this.$refs.uploadImg.files
        
        formData.append('image', img[0])
        formData.append('title', this.editArticle.title)
        formData.append('content', this.editArticle.content)

      
        this.$emit('reqEditArticle', {
          formData: formData
        })  
      },

      back() {
        this.$emit('reqBackEdit')
      },
    }
}
</script>
