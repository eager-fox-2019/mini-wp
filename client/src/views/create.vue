<template>
  <div class="d-flex flex-column">
    <h5>Create New Post</h5>
    <form @submit.prevent='upload'>
      <div class="py-3"></div>
      <div class="mb-4">
        <input
          id="title"
          name="title"
          placeholder="Title"
          style="width: 50%; height: 3rem"
          autocomplete="off"
          v-model='title'
        >
      </div>
      <!-- <input id="imageInput" type="file" v-on:change="uploadImage($event)"> -->
      <input v-model='content'>
      <br>
      <button type="submit" >Submit</button>
    </form>
  </div>
</template>

<script>
import api from '../api/api.js'
api.defaults.headers.common['token'] = localStorage.getItem('token')

export default {
  name: "create",
  data(){
    return{
      title:'',
      content:''
    }
  },
  methods:{
     upload(){
       api
        .post('/articles',{
          title:this.title,
          content:this.content
        })
        .then(({data})=>{
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
  
};
</script>