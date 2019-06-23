<template>
  <v-content>
    <h1 style="text-align:center;">Create New Article</h1>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <h2 style="text-align:left;">Title</h2>
            <v-text-field v-model="title" required validate-on-blur></v-text-field>
            <h2 style="text-align:left;">Description</h2>
            <v-text-field v-model="description" required></v-text-field>
            <h2>Input Tags</h2>
           <tags-input element-id="tags" v-model="tags" :existing-tags="tagsCreated" :typeahead="true">
           </tags-input>
           <br>
            <h2 style="text-align:left;">Upload Image</h2>
            <v-btn color="white" @click="$refs.inputUpload.click()">Upload File</v-btn>
            <input v-show="false" ref="inputUpload" type="file" @change="onFileSelected" >
            <h2 style="text-align:left;">Content</h2>
            <wysiwyg v-model="myHTML" />
            <div>
            </div>
          </v-flex>
        </v-layout>
        <v-btn color="info" @click="createArticle">Submit</v-btn>
        <v-btn color="success" @click="clear">Clear</v-btn>
      </v-container>
  </v-content>
</template>


<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
  props: ["articleUpdate"],
  components: {
    "tags-input": VoerroTagsInput
  },
  data() {
    return {
      tags: [],
      selectedFile: null,
      myHTML:'',
      title:'',
      description:'',
      tagsCreated:{},
    };
  },
  methods: {
    clear(){
      this.title = '';
      this.myHTML = '';
      this.tagsCreated = [];
      this.tags = [];
      this.description ='';
    },
    generate() {
      axios
        .get(`http://localhost:3000/articles/${this.articleUpdate}`, {
          headers: { "access-token": localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.title = data.title,
          this.description = data.description,
          this.tags = data.tags
          this.myHTML = data.content
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    generateTags(){
            axios.get(`http://localhost:3000/articles/tags`,{
                headers:{'access-token':localStorage.getItem('token')}
            })
            .then(({data}) => {
                for(let tag of data){
                    if(this.tagsCreated[tag] == undefined){
                        this.tagsCreated[tag] = tag
                    }
                }
            })
            .catch((err) => { 
                console.log(err) 
            })
    },
    createArticle(){
      if(this.articleUpdate){
          if(this.title == '' || this.description == '' || this.myHTML == '' || this.selectedFile == null || this.tags == []){
              Swal.fire({
                type:'error',
                title: "Failed to Submit",
                text:"All Field is required"
              })
          }
          else{
            console.log('oke masuk')
            const Fdata = new FormData();
            Fdata.append("title", this.title);
            Fdata.append("description",this.description)
            Fdata.append("content", this.myHTML);
            Fdata.append("image", this.selectedFile);
            Fdata.append("tags", this.tags);
            axios
            .put(`http://localhost:3000/articles/${this.articleUpdate}`,Fdata,{ headers:{'access-token':localStorage.getItem('token')}})
            .then(({ data }) => {
                  Swal.fire({
                      type:'success',
                      title: "Success",
                      text:data.message
                  })
                  this.title = '';
                  this.myHTML = '';
                  this.tagsCreated = [];
                  this.tags = [];
                  this.description ='';
                  this.$emit('set-article')
           })
          .catch((err) => {
             let errMsg = err.response.data.message.split(':')
             Swal.fire({
              type:'error',
              title: "Failed to Create",
              text:errMsg[0]
            })
          });
        }
      }
      else{
      const fd = new FormData();
      fd.append("title", this.title);
      fd.append("description",this.description)
      fd.append("content", this.myHTML);
      fd.append("image", this.selectedFile);
      fd.append("tags", this.tags);
      axios
        .post("http://localhost:3000/articles", fd, { headers:{'access-token':localStorage.getItem('token')}})
        .then(({ data }) => {
           Swal.fire({
            type:'success',
            title: "Success",
            text:data.message
          })
          this.title = '';
          this.myHTML = '';
          this.tagsCreated = [];
          this.tags = [];
          this.description ='';
        })
        .catch((err) => {
           let errMsg = err.response.data.message.split(':')
           Swal.fire({
            type:'error',
            title: "Failed to Create",
            text:errMsg[0]
          })
        });
      }
    }
  },
  created(){
      this.generateTags()
      if(this.articleUpdate){
          this.generate()
      }
  }
};
</script>