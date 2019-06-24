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
          <p style="color : black;">
            <small style="color : darkgreen">{{ article.userId.username }}</small>,
            <!--  -->
            <small style="color : peru">{{ refDate(article.date) }}</small>
            <br>
            <a @click="$emit('detail', article)"><strong>{{ article.title }}</strong></a>
            <br>
            {{ article.text }}
          </p>
          <p v-if="page === 'myArticles'">
            <small><a @click="$emit('action', ['edit', article._id, article])"><i class="fas fa-edit" style="color : darkblue;"> Edit </i></a></small>
            <small>......</small>
            <small><a @click="$emit('action', ['delete', article._id, null])"><i class="fas fa-trash" style="color : darkblue;"> Delete </i></a></small>
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
  props : ['page'], // article from my article && home
  data(){
      return {
          article : {
            _id : '13hh2ob5bpp25khv7',
            userId : {
            _id : '3223hjkjb124hbo2',
            username : 'fadlulazmi',
            email : 'fadlul@mail.com'
          },
            date : '06/19/2019',
            title : 'Theory',
            text : 'A theory is a contemplative and rational type of abstract or generalizing thinking, or the results of such thinking. Depending on the context, the results might, for example, include generalized explanations of how nature works. The word has its roots in ancient Greek, but in modern use it has taken on several related meanings.',
            img: 'https://www.onlineuniversities.com/wp-content/uploads/2011/08/research-sm.jpeg'
          },
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
    }
  },
  computed : {
      function() {
        this.articleText = this.truncateText(this.articleText, 10)
      }
  }
};
</script>

<style scoped>
</style>



