<template>
  <div>
     <!-- NewArticle Modal -->
    <div class="modal fade" id="newArticleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style="width: 200% !important;">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLongTitle">New Article</h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="login-form-1 bg-light">
                      <div class="form-group">
                          <input v-model="title" type="text" class="form-control" placeholder="Title.. " value="" />
                      </div>

                      <div class="form-group">
                        <div class="custom-file">
                          <input v-on:change="previewFile" ref="image" type="file" class="custom-file-input" id="inputGroupFile01">
                          <label class="custom-file-label" for="inputGroupFile01">{{featuredImg.name}}</label>
                        </div>
                        <!-- <input v-model="featuredImg" type="text" class="form-control" placeholder="Image link.. " value="" /> -->
                      </div>

                      <div class="form-group">
                          <wysiwyg v-model="content"></wysiwyg>
                      </div>

                      <div class="form-group">
                          <tags-input element-id="tags"
                          v-model="tags"
                          :existing-tags="existingTags"
                          :typeahead="true"></tags-input>
                      </div>
                      
                      <div class="form-group custom-control custom-checkbox d-flex" style="justify-content: center">
                        <input v-model="published" type="checkbox" class="custom-control-input" id="customCheck1">
                        <label class="custom-control-label" for="customCheck1">Publish</label>
                      </div>

                      <div class="form-group d-flex justify-content-center">
                          <input @click="createArticle" data-dismiss="modal" type="submit" class="btn btn-secondary" value="Submit" />
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import tagsInput from '@voerro/vue-tagsinput'
import wysiwyg from '../../js/vueWysiwyg'

const baseUrl = 'http://localhost:3000'

export default {
  components: {
    'tags-input': tagsInput,
    wysiwyg: wysiwyg.component
  }, 
  data() {
    return {
      props: ['existing'],
      title: '',
      content: '',
      featuredImg: {
        name: 'Choose Your Featured Image..'
      }, 
      tags: [],
      published: false,
      existingTags: {},
    }
  },
  methods: {
    createArticle() {
      console.log('title', this.title)
      console.log('content', this.content)
      console.log('image', this.featuredImg)
      console.log('tags', this.tags)
      console.log('published', this.published)
      let newArticle = new FormData();
      newArticle.append('title', this.title)
      newArticle.append('content', this.content)
      newArticle.append("featuredImg", this.featuredImg);
      newArticle.append("tags", this.tags);
      newArticle.append("published", this.published);
      console.log(newArticle);
      axios({
        url: `${baseUrl}/articles`,
        method: 'post',
        data: newArticle,
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log(data)
        this.$emit('fetch')
      })
      .catch(err => {
        console.log(err)
      })
      this.title = ''
      this.content = ''
      this.featuredImg = {
        name: 'Choose Your Featured Image..'
      }
      this.tags = []
      this.published = ''
    },

    previewFile() {
      this.featuredImg = this.$refs.image.files[0]
      console.log(this.featuredImg)
    },

    getTags() {
      axios({
        method: 'get',
        url: `${baseUrl}/articles/tags`
      })
      .then(({data}) => {
        data.tags.forEach(tag => {
          if (this.existingTags[`${tag}`] === undefined) {
            this.existingTags[`${tag}`] = tag
          }
        })
        console.log(this.existingTags)
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
