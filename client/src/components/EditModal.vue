<template>
     <!-- NewArticle Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style="width: 200% !important;">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLongTitle">Edit Article</h2>
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
                          <label class="custom-file-label" for="inputGroupFile01">{{featuredImg}}</label>
                        </div>
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
                          <input @click="editArticle" data-dismiss="modal" type="submit" class="btn btn-secondary" value="Update" />
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
  props: ['edit'],
  components: {
    'tags-input': tagsInput,
    wysiwyg: wysiwyg.component
  }, 
  data() {
    return {
      title: this.edit.title,
      content: this.edit.content,
      featuredImg: this.edit.featuredImg, 
      tags: this.edit.tags,
      published: false,
      existingTags: {},
    }
  },
  methods: {
    editArticle() {
      console.log('title', this.title)
      console.log('content', this.content)
      console.log('image', this.featuredImg)
      console.log('tags', this.tags)
      console.log('published', this.published)
      let editArticle = new FormData();
      editArticle.append('title', this.title)
      editArticle.append('content', this.content)
      editArticle.append("featuredImg", this.featuredImg);
      editArticle.append("tags", this.tags);
      editArticle.append("published", this.published);
      console.log(editArticle);
      axios({
        url: `${baseUrl}/articles/${this.edit._id}`,
        method: 'patch',
        data: editArticle,
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log(data)
        this.$emit('fetch')
      })
      .catch(err => {
        console.log(err.response)
      })
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
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }

  },
  computed: { 

  },
  mounted() {
    this.getTags()
  }
}
</script>

<style>

</style>
