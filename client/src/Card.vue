<template>
  <v-card>
    <v-img :src="myArticle.image" height="200px"></v-img>
    <v-card-title primary-title>
      <div>
        <em class="grey--text">Created At: {{myArticle.createdAt.slice(0,10)}}</em>
        <div class="headline">{{myArticle.title}}</div>
        <br>
        <span>
          <div style="text-align:end;">
            {{myArticle.userId.first_name}} {{myArticle.userId.last_name}}
            <v-avatar :tile=tile size=30>
                <img :src="myArticle.userId.image" alt="avatar">
             </v-avatar>
          </div>
        </span>
        <br>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <span class="article-content grey--text">{{myArticle.description}}</span>
        <!-- <p style="font-size:6px;" class="article-content grey--text" v-html="myArticle.description"></p> -->
      </div>
    </v-card-title>
    <div class="text-xs-center">
    <v-chip v-for="tag in myArticle.tags" :key="tag"> {{tag}} </v-chip>
    </div>

    <v-card-actions v-if="section == 'owner'">
      <v-btn flat @click="updateArticle(myArticle._id)">Edit</v-btn>
      <v-btn flat color="red" @click="deleteArticle(myArticle._id)">Delete</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-card-actions v-if="section == 'reader'">
      <!-- <v-btn flat>Share</v-btn> -->
      <v-btn flat color="purple" @click="showMore(myArticle._id)">Explore</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
  props:['myArticle','section'],
  data(){
    return{
      tile: false
    }
  },
  methods:{
    deleteArticle(val){
       axios.delete(`http://localhost:3000/articles/${val}`,{
                headers:{'access-token':localStorage.getItem('token')}
            })
            .then(({data}) => {
                console.log(data)
                Swal.fire({
                    title: 'success deleted the article',
                    type: `success`,
                }) 
                this.$emit('generate-article')
            })
            .catch((err) => {
                let errMsg = err.response.data.message.split(':')
                Swal.fire({
                  type:'error',
                  title: "Failed to Delete",
                  text:errMsg[0]
                })
            })
    },
    showMore(val){
      this.$emit('set-detail',val)
      console.log('tampilkan artikel',val)
    },
    updateArticle(val){
      this.$emit('set-update',val)
    }
  }
}
</script>
<style scoped>

</style>

