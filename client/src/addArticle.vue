<template>
  <div class="col-9 m-3">
    <h3>Add Article</h3>
    
    <div class="row mt-3">
      <div class="col">
        <form v-on:submit.prevent="save()" class="form-horizontal" id="add-article-form">
          <div class="form-group-lg">
            <input v-model="article.title" class="col" type="text" placeholder="Title"><br><br>
            <div id="article-editor"></div>
          </div><br>
          <input type="file" id="file" ref="file" @change="imageHandler">
          <div class="clearfix">
            <button type="submit" class="btn btn-primary float-right">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: '',
        content: ''
      },
      file: ''
    }
  },
  created() {
    this.$nextTick(() => {
      let quill = new Quill('#article-editor', {
        theme: 'snow'
      });
      quill.on('text-change', () => { this.article.content = quill.root.innerHTML.trim() } )
    })
  },
  methods: {
    imageHandler() {
      this.file = this.$refs.file.files[0];
    },
    save() {
      let formData = new FormData()

      formData.append('imageUpload', this.file)
      formData.append('title', this.article.title)
      formData.append('content', this.article.content)
      
      axios({
        method: 'POST',
        url: `${this.$serverUrl}/article`,
        data: formData,
        headers: { 
          'token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
          }
      })
      .then(({ data }) => {
        swal.fire(`${this.article.title} successfully added`, '', 'success')
        this.$emit('add-article')
      })
      .catch(err => {
        console.log(err)
        swal.fire(`Can not save article ${title}`, `${err.response.data.message}`, 'error')
      })
    }
  }
}
</script>

<style scoped>
#article-editor {
  min-height: 200px;
}
</style>
