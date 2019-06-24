<template>
  <div>
    <form>
        <div class="form-row align-items-center justify-content-around">
          <div class="form-inline">
            <label for="select" class="mr-2">Sort By</label>
            <select v-model="sortBy" class="browser-default custom-select" id="select">
              <option value disabled selected>Choose your option</option>
              <option value="createdAt">Newest</option>
              <option value="updatedAt">Recently Updated</option>
              <option value="published">Published First</option>
              <option value="starred">Starred First</option>
            </select>
          </div>
      
          <div class="custom-control custom-checkbox">
            <input v-model="starred" type="checkbox" class="custom-control-input" id="checkbox">
            <label class="custom-control-label" for="checkbox">Starred</label>
          </div>
          <div class="row align-items-center">
            <tags-input element-id="tags"
            @tag-added="onTagAdded"
            @tag-removed="onTagRemoved"
          v-model="selectedTags"
          :existing-tags="tags"
          :typeahead="true" placeholder="Search by tags"></tags-input>
          <button @click.prevent="selectedTags = []; $emit('get_all_posts')" class="btn btn-danger">Clear</button>
          </div>
        </div>
    </form>
      <div class="card-group">
        <PostCard
          v-for="post in posts"
          :idpost="post._id"
          :post="post"
          @edit_post="$emit('edit_post',post)"
          @delete_post="$emit('delete_post',post._id)"
          @full_post="$emit('full_post',post)"
          @get_all_posts="$emit('get_all_posts')"
          :key="post._id"
        ></PostCard>
      </div>
  </div>
</template>
<script>
import PostCard from "./PostCard.vue";

export default {
  components: {
    PostCard
  },
  props: ["posts","tags"],
  data(){
    return {
      selectedTags: [],
      starred: false,
      sortBy: '',
    }
  },
  watch: {
    // selectedTags(newVal){
    //   console.log('sini');
    //   console.log(this.tags[newVal[0]]);
    //   console.log('sini');
      
    //   this.$emit('get_all_posts','tags',this.tags[newVal[0]])
    // },
    starred(newVal){
      this.$emit('get_all_posts','starred',newVal)
    },
    sortBy(newVal){
      this.$emit('get_all_posts','sortBy',newVal)
    },
  },
  methods: {
    onTagAdded(slug){
      this.$emit('get_all_posts','tags',slug,'added')
    },
    onTagRemoved(slug){
      this.$emit('get_all_posts','tags',slug,'removed')
    },
  }
};
</script>
