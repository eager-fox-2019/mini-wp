<template>
  <div class="card mb-3 article" style="width: 70vw;">
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
</template>

<script>
export default {
  props: {
    article: Object
  },
  methods: {
    convertDate (date) {
      let createdDate = new Date (date)
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `${days[createdDate.getDay()]}, ${createdDate.toString().slice(4,25)}`
    },
    getDetail(id) {
      this.$emit('getDetail', id)
    },
    filterByTag(value) {
      this.$emit('filterByTag', value)
    }
  }
}
</script>

<style>

</style>
