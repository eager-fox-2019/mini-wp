Vue.config.devtools = true
new Vue({
  el: '#app',
  data: {
    test: "testData",
    postArea: false,
    sidebarArea: true,
    articles: [
      { title:"Lorem Ipsum", 
        content:"<strong>Dolor</strong><p> is not just any random string</p>"
      },
      { title:"Why we use Lorem Ipsum", 
        content:"Well, because <strong>research</strong> shows that:<p> readable text distracts readers who are looking at the layout.</p>"
      }
    ],
    newTitle: "",
    newContent: "",
    search: ""
  },
  components: {
    'editor': Editor // <- Important part
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
      //document.getElementById('sidebar').classList.toggle('collapsed');
    },
    togglePost(){
      if(this.postArea) {
        this.postArea = false
      } else {
        this.postArea = true
      }
    },
    addArticle(){
      this.togglePost()
      this.articles.push({title:this.newTitle, content:this.newContent})
    }
  }
})
