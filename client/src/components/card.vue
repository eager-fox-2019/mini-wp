<template>
  <div class="container">
    <div class="notification">
      <div class="columns">
        <div class="column is-narrow">
          <img
            :src="article.img"
            height="auto"
            width="200px"
          >
        </div>
        <div class="column">
          <div style="color : black;">
            <small style="color : darkgreen">{{ article.userId.username }}</small>,
            <!--  -->
            <small style="color : peru">{{ refDate(article.date) }}</small>
            <br>
            <a @click="$emit('detail', article)"><strong>{{ article.title }}</strong></a>
            <br>
            <!-- <p :v-html="article.text"></p> -->
            <!-- {{ article.text }} -->
          </div>
          <p v-if="page === 'myArticles'">
            <small><a @click="isActive = !isActive"><i class="fas fa-edit" style="color : darkblue;"> Edit </i></a></small>
            <!-- @click="$emit('action', ['edit', article._id, article])" -->
            <small>......</small>
            <small><a @click="isActive2 = !isActive2"><i class="fas fa-trash" style="color : darkblue;"> Delete </i></a></small>
            <!-- @click="$emit('action', ['delete', article._id, null])" -->
            <b-notification :active.sync="isActive" aria-close-label="Close notification" class="has-text-black is-bordered">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            </b-notification>
            <b-notification
              :active.sync="isActive2"
              type="is-danger"
              has-icon
              aria-close-label="Close notification"
              role="alert">
              are you sure to delete this post ?!
              <br>
              <a class="button is-small" style="float:right">DELETE</a>
            </b-notification>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  components : {

  },
  props : ['page', 'article'], // article from my article && home
  data(){
      return {
        isActive : false,
        isActive2 : false,

      }
  },
  methods: {
    refDate(input){
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let day = days[new Date(input).getDay()]
      let date = new Date(input).getDate()
      let month = new Date(input).getMonth()+1
      let year = new Date(input).getFullYear()
      return  `${day}, ${date}/${month}/${year}`
    },
    truncateText(selector, maxLength) {
      var element = document.querySelector(selector),
        truncated = element.innerText;

      if (truncated.length > maxLength) {
        truncated = truncated.substr(0, maxLength) + "...";
      }
      return truncated;
    },
    editArticle(){

    },
    deleteArticle(){

    }
  },
  computed : {
      function() {
        this.articleText = this.truncateText(this.articleText, 10)
      }
  },

};
</script>

<style scoped>
</style>



