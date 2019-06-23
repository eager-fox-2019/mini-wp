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
          <input type="file">
          <div class="clearfix">
            <button type="submit" href="#" class="btn btn-primary float-right">Save</button>
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
      }
      
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
    save() {
      axios({
        method: 'POST',
        url: `${this.$serverUrl}/article`,
        data: this.article,
        headers: { 'token': localStorage.getItem('token') }
      })
      .then(({ data }) => {
        swal.fire(`${this.article.title} successfully added`, '', 'success')
        this.$emit('add-article')
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
#article-editor {
  min-height: 200px;
}
</style>
