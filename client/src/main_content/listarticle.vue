<template>
   <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <a href="#" class ="article-heading">
              <h4 style="font-size:25px;">Published Articles <span class="badge badge-secondary">{{this.list.length}}</span></h4>
          </a>       
        </div>
          <div class="panel-body">
            <div id="body-header">
              <input 
                type="text"
                placeholder="Search article by title"
                v-model="searchTitle"
              >
              <button type="button" class="btn btn-primary" v-on:click.prevent="displayAdd" style="display:flex;align-items: center;"><i class="fas fa-plus-square" style="font-size: 25px;margin-right: 10px;"></i> Add new post</button>
            </div>

            <div id="body-content">
               <div class="container py-3" v-for="article in filterTitle" :key="article.id">
                  <div class="card">
                    <div class="row ">
                        <div class="col-md-4">
                          <img v-bind:src="article.image" style="width:100%; height:100%;">
                        </div>
                        <div class="col-md-8 px-3 body-content-text">

                            <div class = "content-info">
                              <a href="#" class="card-title" v-on:click="displayArticle(article._id)">{{article.title}}</a>
                              <p class="card-text">Created At: {{dateString(article.createdAt)}}</p>
                            </div>

                            <div class = "content-buttons"> 
                              <button type="button" class="btn btn-success" v-on:click="displayEdit(article._id)">Edit</button>
                             
                              <button type="button" class="btn btn-danger" v-on:click="reqDelete(article._id)">Delete</button>
                            </div>
                        
                        </div>
                    </div>
                  </div>
                </div>
          </div>
          </div>           
      </div>  
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data() {
      return {
        loginEmail: "",
        loginPass: "",
        articles: [],
        searchTitle: "",
      };
    },
 
    computed: {
      filterTitle(){
        // return this.list.filter(article => {
        //   return article.title.includes(this.searchTitle)
        // })
        // this.articles = this.list
        return this.list.filter(article => {
          return article.title.includes(this.searchTitle)
        })


        // console.log(this.searchTitle)
      }
    },
    methods: {
      dateString(date) {
        let d = new Date(date)
        let str = d.toLocaleString()
        return str
      },
      displayArticle(id){
        this.$emit('reqDisplay', {
          id: id
        })
      },

      displayAdd() {
        this.$emit('reqAdd')
      },

      displayEdit(id) {
        this.$emit('reqEdit', {
          id : id
        })
      },

      reqDelete(id){
        this.$emit('reqDelete', {
          id: id
        })
      },
      dateString(date) {
        let d = new Date(date)
        let str = d.toLocaleString()
        return str
      },
    }
  };
</script>

<style scoped>
</style>
