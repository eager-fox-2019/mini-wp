<template>
  <div>
    <!-- Article Detail -->
    <div id="articleDetail" class="container center d-flex" style="flex-direction: column; margin-top:20px">
      <img v-bind:src="detail.featuredImg" width="100%" height="100%">
      <div class="container">
        <h1 style="font-size: 50px; color: white; position:absolute; z-index: 1; margin-top:-70px">{{detail.title}}</h1>
        <div class="d-flex" style="justify-content: space-between">
          <h5 class="mt-3">By: {{detail.author.name}}</h5>
          <h5 class="mt-3">Posted At: {{momentDate}}</h5>
        </div>
        <p class="mt-3"><span v-html="detail.content"></span></p>
        <h4>Tags:</h4>
        <div class="d-flex" style="justify-content:flex-start">
          <h6 v-for="tag in detail.tags" :key="tag" style="margin-right: 5px"><a style="cursor:pointer">#{{tag}}</a></h6>
        </div>
        <div class="d-flex" style="justify-content: space-between">
          <div style="width:50%;">

          </div>
          

          <div v-if="checkAuthor(detail)" class="d-flex" style="justify-content: flex-end; width:50%;">
            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#editModal">Edit</button>
            <button @click="deleteArticle(detail._id)" type="button" class="btn btn-danger ml-3">Delete</button>
          </div>
          <div class="d-flex" style="justify-content: flex-end; width:50%;">
            <button @click="backToHome" type="button" class="btn btn-dark ml-3">Back</button>
          </div>
        </div>
      </div>
    </div>

    <EditModal v-on:fetch="backToHome" v-bind:edit="detail"/>
  </div>
</template>

<script>
import EditModal from './EditModal.vue'
import Swal from 'sweetalert2'
const baseUrl = 'http://localhost:3000'

export default {
  components: {
    EditModal
  },
  props: ['detail'],
  data() {
    return {
      article: {}
    }
  },
  methods: {
    fetchDetail() {
      this.article = {}
      axios({
        method: 'get',
        url: `${baseUrl}/articles/`
      })
      .then(({data}) => {
        console.log(data.data)
        this.articles = data.data
      })
      .catch(err => {
        console.log(err)
      })
    },

    deleteArticle(id) {
      Swal.fire({
        // title: 'Delete this article?',
        text: "Delete this article?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `${baseUrl}/articles/${id}`,
            headers: {
              token: localStorage.token
            }
          })
          .then(({data}) => {
            console.log(data)
            this.$emit('back', 'home')
            Swal.fire(
              'Deleted!',
              'Your article has been deleted.',
              'success'
            )
          })
          .catch(err => {
            console.log(err)
          })
        }
      })
    },

    backToHome() {
      this.$emit('back', 'home')
    },

    checkAuthor(article){
      if (article.author._id === localStorage.id) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    momentDate() {
      return moment(this.detail.postedAt).format('MMMM Do YYYY')
    },
  }
}
</script>

<style>

</style>
