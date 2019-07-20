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
      <PreviewCard v-for="article in articles" :key="article.id" :article="article" @getDetail="getDetail" @filterByTag="filterByTag"/>
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
import PreviewCard from '../button-&-form-component/preview-card.vue'
export default {
  props: {
    'menu': String,
    'articles': Array,
  },
  components: {
    PreviewCard
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
