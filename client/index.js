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
    search: ""
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
