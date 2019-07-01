<template>
  <div class="col-9 m-3">
    <h3>Page Management</h3>
    <div class="clearfix">
      <input v-model="search" type="text" placeholder="Search Title" class="float-right">
    </div>

    <div class="row border-bottom border-secondary p-2">
      <div class="col">Page Title</div>
      <div class="col">Author</div>
      <div class="col">Date</div>
      <div class="col">Action</div>
    </div>

    <template v-for="article in filterarticles">
      <articleRow :key="article.id" :article="article">
        <a v-on:click.prevent="deleteArticle(article._id, article.title)" href="#" class="btn btn-danger btn-sm">
        <i class="fas fa-trash-alt"></i> delete</a>
        <a href="#" v-on:click.prevent="editArticle(article)" class="btn btn-primary btn-sm">
        <i class="fas fa-pen"></i> edit</a>
      </articleRow>
    </template>
  </div>
</template>

<script>
import articleRow from './articleRow'

export default {
  components: {
    articleRow
  },
  data() {
    return {
      articles: [],
      search: ''
    }
  },
  created() {
    axios({
      method: 'GET',
      url: `${this.$serverUrl}/article`,
      headers: { 'token': localStorage.getItem('token') }
    })
    .then(({ data }) => {
      data.forEach(item => { item.createdAt = item.createdAt.substring(0,10) })
      this.articles = data
    })
    .catch(err => {
      console.log(err)
      swal('Error getting Article List', '', 'error')
    })
  },
  computed: {
    filterarticles() {
      if (this.search !== '') return this.articles.filter(article => article.title.toLowerCase().includes(this.search.toLowerCase()))
      else return this.articles
    }
  },
  methods: {
    readArticle(id) {
      let index = this.articles.findIndex(i => i._id === id)
      this.$emit('article-action', 'read', this.articles[index])
    },
    editArticle(article) {
      this.$emit('article-action', 'edit', article)
    },
    deleteArticle(id, title) {
      axios({
        method: 'DELETE',
        url: `${this.$serverUrl}/article/${id}`,
        headers: { 'token': localStorage.getItem('token') }
      })
      .then(() => {
        this.articles = this.articles.filter(element => element._id !== id)
        swal.fire(`article ${title} successfully deleted`, '', 'success')
      })
      .catch(err => {
        console.log(err)
        swal.fire(`Can not delete article ${title}`, `${err.response.data.message}`, 'error')
      }) 
        
    }
  }
}
</script>
