new Vue({
  el: "#app",
  data: {
    message: `hello world`,
    selectedPage: "Landing",
    quill: "",
    allArticles : [],
    userArticles : []
  },
  methods: {
    selectPage(page) {
      console.log(page);
      this.selectedPage = page;
    },
    doQuill() {
      this.quill = new Quill("#editor", {
        theme: "snow"
      });
    },
    getData() {
      axios({
        method: "GET",
        url: "http://localhost:3000/articles/allArticle"
      })
        .then(response => {
          console.log(this.allArticles);
          this.allArticles = response.data
          this.userArticles = response.data
        })
        .catch(er => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    console.log("quill");
    // this.doQuill();
  }
});
