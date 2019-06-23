<template>
  <div v-if="menu == 'list'" style="height: 700px">
    <div class="center d-flex flex-column justify-content-center">
      <h2 class="center">List Article</h2>
      <form id="filter" class='center align-middle' @submit.prevent="filterByTitle(titleFilter)">
          <div class="row">
              <div class="col">
                <div class="input-group input-group-md">
                  <input type="text" name="filter" v-model="titleFilter" class="form-control form-control-md input-md" placeholder="Filter By Article Title">
                  <span class="input-group-append">
                    <button class="btn btn-success btn-md" type="submit">Search</button>
                  </span>
                </div>
              </div>
          </div>
          <div class="row"  style="margin-top: 15px">
            <div class="col">
              <div class="input-group input-group-md d-flex justify-content-center">
                <button class="btn btn-success btn-md" type="button" @click="getAll">Get All Article</button>
              </div>
            </div>
        </div>
        </form>
    </div>

    <div class="center" style="width: 90%">
      <hr>
    </div>

    <div class="center align-items-center d-flex flex-column" id="article-list" style="overflow-y: scroll; height: 500px">
      <div class="card mb-3 article" style="width: 70vw;" :key="article.id" v-for="article in articles">
        <div class="row no-gutters">
          <div class="col-2" style="background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;" v-bind:style="{ backgroundImage: 'url(' + article.img + ')' }">
          </div>
          <div class="col-10">
            <div class="card-body">
              <h5 class="card-title">{{article.title}}</h5>
              <div class="row d-flex justify-content-start mb-2" style="height: 1.5em; overflow: hidden">
                <div class="col pr-0" style="overflow: hidden">
                  <div class="card-text" v-html="article.content"></div>
                </div>
              </div>
              <p class="card-text">Created at: {{convertDate(article.created_at)}}</p>
              <p class="card-text">Created by: <strong>{{article.user.name}}</strong></p>
              <a href="#" @click="getDetail(article._id)">See Detail</a>
              <div class="d-flex flex-wrap mt-2">
                <div class="mr-2">Tags:</div>
                <div v-for="(articleTag, index) in article.tags" :key="index" style="border: 1px grey solid; border-radius: 10px; font-size: 18px" class="pl-2 pr-2 mr-2 mb-2 tag-button" @click="filterByTag(articleTag)">{{articleTag}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div style="width: 42.5%">
        <hr>
      </div>

      <div style="width: 5%" class="d-flex justify-content-center">
        <img src="https://s.w.org/style/images/about/WordPress-logotype-wmark.png" width="40" height="40" alt="logo">
      </div>
      
      <div  style="width: 42.5%">
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'menu': String,
    'articles': Array,
  },
  data() {
    return {
      titleFilter: "",
    };
  },
  methods: {
    getAll() {
      this.$emit('getAll')
    },
    convertDate (date) {
      let createdDate = new Date (date)
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `${days[createdDate.getDay()]}, ${createdDate.toString().slice(4,25)}`
    },
    getDetail(id) {
      this.$emit('getDetail', id)
    },
    filterByTitle(value) {
      this.$emit('filterByTitle', value)
    },
    filterByTag(value) {
      this.$emit('filterByTag', value)
    }
  }
};
</script>

<style scoped>
  #filter {
    width: 50%;
  }
  .tag-button:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  hr {
    border-width: 3px;
    border-color: rgb(73, 73, 73); 
  }
  .center {
    margin: 0px auto;
  }
</style>
