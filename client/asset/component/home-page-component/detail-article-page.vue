<template>
  <div v-if="menu == 'detail'" style="height: 700px">
    <div class="center align-items-center d-flex flex-column" id="article-list" style="height: 100%">
      <div class="card article" style="width: 70vw; height: 100%">
        <div class="row no-gutters d-flex flex-column justify-content-between" style="height: 100%">
          <div class="card-body d-flex flex-column justify-content-between" >
            <div class="row d-flex flex-column p-3" >
              <h5 class="card-title center">{{article.title}}</h5>
              
              <div class="center" style="width: 100%">
                <hr>
              </div>

              <div class="d-flex flex-column justify-content-between" style="height: 500px">
                <div class="row pl-3" style="height: 450px; width: 100%">
                  <div class="col-3" style="background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;" v-bind:style="{ backgroundImage: 'url(' + article.img + ')' }"></div>
                  <div class="col" style="overflow: scroll">
                    <div class="card-text" v-html="article.content"></div>
                  </div>
                </div>
                <p class="card-text">Created at: {{convertDate(article.created_at)}}</p>
                <div class="d-flex justify-content-start mt-2">
                  <div class="mr-2">Tags:</div>
                  <div v-for="(articleTag, index) in article.tags" :key="index" style="border: 1px grey solid; border-radius: 10px; font-size: 18px" class="pl-2 pr-2 mr-2">{{articleTag}}</div>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-content-end">
              <div class="center pr-3 pl-3" style="width: 100%">
                <hr>
              </div>
              <div class="pr-3" v-if="article.user.email == user.email">
                <button class="btn btn-success" @click="rendEdit">Edit</button>
                <button class="btn btn-danger" @click="deleteConfirm">Delete</button>
              </div>
              <div class="pr-3" v-else>
                <p class="card-text">Created by: <strong>{{article.user.name}}</strong></p>
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
  props: {
    'menu': String,
    'article': Object,
    'user': Object
  },
  data() {
    return {

    };
  },
  methods: {
    rendEdit() {
      this.$emit('rendEdit')
    },
    deleteConfirm() {
      this.$emit('deleteConfirm')
    },
    convertDate (date) {
      let createdDate = new Date (date)
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `${days[createdDate.getDay()]}, ${createdDate.toString().slice(4,25)}`
    },
  }
};
</script>

<style scoped>
  .center {
    margin: 0px auto;
  }
  hr {
    border-width: 3px;
    border-color: rgb(73, 73, 73); 
  }
</style>
