Vue.config.devtools = true

let baseUrl = "http://localhost:3000"

var app = new Vue({
  el: '#app',
  data: {
    postArea: false,
    sidebarArea: true,
    articles: [],
    newTitle: "",
    newContent: "",
    search: "",
    editArticleArea: false,
    currentArticle: {}
  },
  components: {
    'editor': Editor // <- Important to load wysiwyg api tiny.mce
  },
  created(){
      axios({
        method: "GET",
        url: baseUrl+"/articles"
      })
      .then(({data}) => {
        this.articles = data;
      })
      .catch(err => {
        console.log("created error:",err)
      })
  },
  computed: {
    filteredArticles(){
      let filtered = [];

      this.articles.forEach(article => {
        let strArticle = article.title;
        if (strArticle.includes(this.search)) {
          filtered.push(article)
        }
      })
      return filtered
    }
  },
  methods: {
    toggleSidebar(){
      if (this.sidebarArea){
        this.sidebarArea = false;
      } else {
        this.sidebarArea = true;
      }
      
    },
    togglePost(){
      if(this.postArea) {
        this.postArea = false
      } else {
        this.postArea = true
      }
    },
    updateArticle(){
      let currentArticle = this.currentArticle
      let newInput = {
        title: this.newTitle,
        content: this.newContent,
        created_at: (new Date()).toDateString()
      }
      //PATCH  /api/todos/update/:userId/:todoId
      axios({
        method: "PATCH",
        url: `${baseUrl}/articles/0/${currentArticle._id}`,
        data: newInput
      })
      .then(({data}) => {
        console.log("updated an article")
        this.cancelEdit()

        let updatedList = []
        this.articles.forEach(article => {
          if (article._id === data._id){
            article = data;
          }
          updatedList.push(article)
        })
        this.articles = updatedList
      })
      .catch(err => {
        console.log("created error:",err)
      })
    },
    editArticle(articleId){
      this.editArticleArea = true;

      axios({
        method: "GET",
        url: baseUrl+"/articles/"+articleId
      })
      .then(({data}) => {
        console.log("get one article,",data)
        console.log("selected an article")
        this.currentArticle = data
        this.newTitle = data.title
        this.newContent = data.content
      })
      .catch(err => {
        console.log("created error:",err)
      })
    },
    cancelEdit(){
      this.currentArticle = {}
      this.editArticleArea = false;
      this.newTitle = "";
      this.newContent = "";
    },
    delArticle(articleId){
      axios({
        method: "DELETE",
        url: baseUrl+"/articles/0/"+articleId
      })
      .then(({data}) => {
        console.log("deleted an article")
        this.articles = this.articles.filter(article => article._id !== articleId)
      })
      .catch(err => {
        console.log("created error:",err)
      })
    },
    addArticle(){
      this.togglePost()
      let newArticle = {title:this.newTitle, content:this.newContent, created_at: (new Date()).toDateString()}
      
      axios({
        method: "POST",
        url: baseUrl+"/articles",
        data: newArticle
      })
      .then(({data}) => {
        console.log("created an artcle")
        this.articles.push(data)
        this.newTitle = "";
        this.newContent = "";
      })
      .catch(err => {
        console.log("created error:",err)
      })
    },
  }
})
