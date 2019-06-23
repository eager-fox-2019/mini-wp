<template>
  <form class="form-article center" @submit.prevent="formSubmit" enctype="multipart/form-data">
    <div class="form-group">
      <label>Title</label>
      <input type="text" class="form-control" v-model="article.title" placeholder="Enter Article Title" required>
    </div>

    <div class="form-group d-flex">
      <div class="row">
        <div class="col">
          <img v-bind:src="article.img" width="100" height="100" class="mr-1">
        </div>
      </div>

      <div class="row d-flex flex-column">
        <div class="col">
          <label>Image</label>
        </div>

        <div class="col">
          <input type="file" class="border" style="border-radius: 5px" accept="image/png, image/jpeg" @change="changeImg($event)">
        </div>
      </div>          
    </div>

    <div class="form-group">
      <label>Tags</label>
      <div class="row">
        <div class="col-4">
          <input type="text" class="form-control" v-model="tagInput" placeholder="Enter Tag">
        </div>
        <div class="col-3">
          <div class="btn btn-primary" @click="addTag">
            Add Tag
          </div>
        </div>
      </div>
    </div>

    <div class="form-group d-flex flex-wrap justify-content-start">
      <div v-for="(articleTag, index) in article.tags" :key="index" style="border: 1px grey solid; border-radius: 10px; font-size: 18px" class="d-flex justify-content-center pl-2 pr-2 mr-2 mb-2">
        <div class="row">
          <div class="col pr-1">{{articleTag}}</div>
          <div class="col pl-1" @click="removeTag(articleTag)" style="cursor: pointer"><i class="fas fa-times"></i></div>
          </div>
      </div>
    </div>

    <div class="form-group">
      <label>Content</label>
      <div style="height: 250px; overflow: hidden">
        <wysiwyg v-model="article.content"></wysiwyg>
      </div>
    </div>

    <div class="col text-center">
      <button type="submit" class="btn btn-primary center">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    'article': Object,
  },
  data() {
    return {
      tagInput: ""
    };
  },
  methods: {
    formSubmit() {
      this.$emit('formSubmit')
    },
    changeImg($event) {
      this.$emit('changeImg', $event)
    },
    addTag() {
      this.$emit('addTag', this.tagInput)
      this.tagInput = ""
    },
    removeTag(tag){
      this.$emit('removeTag', tag)
    },
  }
};
</script>

<style scoped>

</style>
