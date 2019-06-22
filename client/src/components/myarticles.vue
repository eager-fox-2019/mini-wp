<template>
  <div class="p-5">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#all">All Articles</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#saved">Draft</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#posted">Posted</a>
      </li>
    </ul>
    <div class="tab-content border border-top-0">
      <div class="tab-pane fade active show" id="all">
        <div v-for="article in articles" :key="article._id" class="row mx-3 border-bottom">
          <div class="col-lg-4 col-md-auto col-sm-auto">
            <div class="card border p-3 m-3 text-white">
              <img
                src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_8c9El0DZBI8%2FTTQmr8T_LXI%2FAAAAAAAAAQc%2FAa5NbZDAn_A%2Fs1600%2Flake-toba.jpg&f=1"
                alt="learning"
                class="img-thumbnail align-self-center"
                style="max-width:320px; max-height:240px;"
              >
              <a href>
                <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
                  <div class="card-text border-0 bg-semitransparent text-center">
                    <b>Read this</b>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-8 col-md-auto col-sm-auto p-3">
            <h1 class="m-3">{{article.title}}</h1>
            <small class="ml-3">created At {{new Date(article.createdAt).toLocaleDateString()}}</small>
            <br>
            <div class="m-3">
              <span v-for="tag in article.tags" :key="tag" class="badge badge-secondary">
                <i class="fa fa-tags mr-1"></i>
                {{ tag }}
              </span>
            </div>
            <div class="m-3 mt-0">
              <p>{{article.content.split("").splice(0, 100).join("")}}</p>
            </div>
            <div class="m-3 align-self-end">
              <div>
                <i class="fa fa-trash" aria-hidden="true"></i>
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="saved">saved</div>
      <div class="tab-pane fade" id="posted">posted</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ax"],
  data() {
    return {
      loggedInUser: {},
      articles: [],
      posted: [],
      saved: []
    };
  },
  created() {
    this.loggedInUser = JSON.parse(localStorage.user);
    this._getUserArticles();
  },
  mounted() {},
  methods: {
    readArticle(id) {
      console.log(id);
    },
    editArticle(id) {
      console.log(id);
    },
    _getUserArticles() {
      this.ax({
        methods: "GET",
        url: "/articles/all/user"
      })
        .then(({ data }) => {
          this.articles = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].status == "post") {
              this.posted.push(data[i]);
            } else {
              this.saved.push(data[i]);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>

