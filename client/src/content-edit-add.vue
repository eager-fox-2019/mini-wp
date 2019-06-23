<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-text-field v-model="inputVal.title" label="Title" required></v-text-field>
      <v-switch v-model="inputVal.published" :label="`Published: ${(inputVal.published) ? 'Published' : 'Drafts'}`"></v-switch>
      <v-layout>
        <wysiwyg v-model="inputVal.content"></wysiwygv>
      </v-layout>
      <v-flex xs12>
        <input color="success" type="file" @change="onFileSelected" >
        <v-img v-if="inputVal.featured_image" :src="inputVal.featured_image"></v-img>
      </v-flex>
      <v-btn color="success" @click="sendArticle(inputVal._id)">Submit</v-btn>
      <v-btn color="error" @click="submitPage('content-list-articles')">Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'

export default {
  props: ['slctArticleChild'],
  data() {
    return {
      inputVal: {
        _id: this.slctArticleChild._id,
        title: this.slctArticleChild.title,
        published: this.slctArticleChild.published,
        content: this.slctArticleChild.content,
        featured_image: this.slctArticleChild.featured_image
      },

    }
  },
  methods: {
    onFileSelected: function(event) {
      this.inputVal.featured_image = event.target.files[0]
    },
    submitPage(val) {
      this.$emit('change-page', val)
    },
    sendArticle(val) {
      event.preventDefault()
      let method, fd
      if (val) {
        val = `/${val}`
        method = 'PATCH'
        fd = {
          title: this.inputVal.title,
          published: this.inputVal.published,
          content: this.inputVal.content,
          featured_image: this.inputVal.featured_image
        }        
      } else {
        val = ''
        method = 'POST'
        fd = new FormData()
        fd.append("title",this.inputVal.title)
        fd.append("published",this.inputVal.published)
        fd.append("content",this.inputVal.content)
        fd.append("featured_image",this.inputVal.featured_image)
      }
      axios({
        method: method,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: fd,
        url: `${this.$root.url_server}/articles${val}`
      })
        .then(({ data }) => {
          this.$emit('update-articles')
          this.$emit('change-page', "content-list-articles")
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
}
</script>