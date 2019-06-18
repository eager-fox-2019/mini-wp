Vue.config.devtools = true
new Vue({
  el: '#app',
  data: {
    test: "testData",
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
    'editor': Editor // <- Important part
  },
  created(){
      axios({
        method: "GET",
        url: "http://localhost:3000/articles"
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
      //PATCH  /articles/{id}
      axios({
        method: "PATCH",
        url: "http://localhost:3000/articles/"+currentArticle.id,
        data: newInput
      })
      .then(({data}) => {
        console.log("updated an article")
        this.cancelEdit()
        
        let updatedList = []
        this.articles.forEach(article => {
          if (article.id === data.id){
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
      this.editArticleId = articleId;

      axios({
        method: "GET",
        url: "http://localhost:3000/articles/"+articleId
      })
      .then(({data}) => {
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
      this.editArticleId = null;
      this.newTitle = "";
      this.newContent = "";
    },
    delArticle(articleId){
      axios({
        method: "DELETE",
        url: "http://localhost:3000/articles/"+articleId
      })
      .then(({data}) => {
        console.log("deleted an article")
        this.articles = this.articles.filter(article => article.id !== articleId)
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
        url: "http://localhost:3000/articles",
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
