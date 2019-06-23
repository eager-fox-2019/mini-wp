<template>
    <div>
      <div id="article-add-header">
        <a href="#" v-on:click.prevent="back">Back</a>
        <h2 style="text-align: center;">Add an article</h2>
      </div>
      
      <form method="post" v-on:submit.prevent="articleDetail"  enctype="multipart/form-data">
        <label for="article-title">Title: </label>
        <input 
          id="article-title" 
          type="text" 
          placeholder="insert title here..."
          v-model="newTitle"
          autocomplete="off"
          required
        >

        <label for="article-picture" style="font-size: 20px;">Picture: </label>
        
        <input
          id="article-picture"
          type="file"
          name="avatar"
          ref="uploadImg"
          v-on:change.prevent="previewFile"
          style="width: auto;font-size: 16px;"
        > 
        <img src="" height="200px" alt=" Image preview..." style="border:1px solid lightgrey;">
        <wysiwyg class="wysiwyg" v-model="newContent"></wysiwyg>

        <button id="btnAddArticle" type="submit" class="btn btn-secondary">Add article</button>
      </form> 
    </div>
</template>


<script>  
  export default {
    data() {
      return {
        newTitle: "",
        newContent: ""
      };
    },
    methods: {
      articleDetail() {
        let formData = new FormData()
        let img = this.$refs.uploadImg.files
        
    
        formData.append('image', img[0])
        formData.append('title', this.newTitle)
        formData.append('content', this.newContent)

        this.$emit('articleDetail', {
          formData: formData
        })  
      },

      back() {
        this.$emit('reqBack')
      },

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
      }
    } 
  };
  
</script>

<style scoped>
</style>
