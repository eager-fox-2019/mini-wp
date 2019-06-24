<template>
  <div class="container">
  <!-- Footer -->
  <footer class="page-footer font-small blue pt-4" style="margin-top:100px; height:210px">        
    <vue-word-cloud :words="tags" :color="([, weight]) => weight > 5 ? 'DeepPink' : weight > 1 ? 'RoyalBlue' : 'Indigo'" 
      style="border-top:3px solid black; margin-top:-50px">
      <template slot-scope="{text, weight, word}">
        <div :title="weight" style="cursor: pointer;" @click="onWordClick(word)">
          {{ text }}
        </div>
      </template>
    </vue-word-cloud>
      <div class="footer-copyright text-center" style="margin-top:15px; border-top:3px solid black">
        <small>© 2019 Copyright: Rizky Anas Bukhori</small>
      </div>    
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import VueWordCloud from 'vuewordcloud';

const baseUrl = `http://localhost:3000` 

export default {
  components: {
    wordcloud,
    [VueWordCloud.name]: VueWordCloud,
  },
  data() {
    return {
      tags: [],
    }
  },
  methods: {
    onWordClick(word) {
      console.log(word)
      this.$emit('withTag', word[0])
    },
    getTags() {
      axios({
        method: 'get',
        url: `${baseUrl}/articles/tags`
      })
      .then(({data}) => {
        console.log(data.tags)
        let obj = []
        data.tags.forEach((dat, index) => {
        let filter = obj.filter(ob => {
          return ob[0] === dat
        })
          if (filter.length === 0){
            obj.push([dat, 1])
          }else{
            obj[obj.indexOf(filter[0])][1]++
          }
        })
        console.log(obj)
        this.tags = obj
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  },
  mounted() {
    this.getTags()
  }

}
</script>

<style>

</style>
