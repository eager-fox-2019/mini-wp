<template>
  <div class="col-2">
    <div @mouseenter="show = true" @mouseleave="show = false" class="card">
      <transition name="fade">
        <div class="position-absolute" v-show="show">
          <a @click="starPost" :class="[post.starred ? 'fas' : 'far', 'fa-star','fa-2x', 'yellow-text','m-4']" href="#"></a>
        </div>
      </transition>
      <img :src="post.image_url" class="card-img-top" :alt="post.title" style="height: 200px; width: 100%;">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ shortenContent }}</p>
        <div class="row align-items-center">
          <a @click="$emit('full_post',post)" href="#" class="btn btn-primary">Preview</a>
          <transition name="fade">
            <div v-show="show" class="ml-auto">
            <a @click.prevent="$emit('edit_post',post)" href="#" class="fas fa-edit green-text fa-2x"></a>
            <a @click.prevent="$emit('delete_post',post._id)" href="#" class="fas fa-trash-alt red-text fa-2x mx-3"></a>
            </div>
          </transition>
        </div>

      </div>
      <div class="card-footer">
        <small class="text-muted">Created {{ createdAt }}</small>
        <hr>
        <small class="text-muted">Updated {{ updatedAt }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "../axios";

export default {
  props: ["post"],
  data() {
    return {
      show: false
    };
  },
  // filters: {
  //   shortenContent(content) {
  //     if (content.length >= 70) return content.slice(0, 70) + "..."
  //     return content
  //   }
  // },
  computed: {
    createdAt() {
      return moment(this.post.createdAt).fromNow();
    },
    updatedAt() {
      return moment(this.post.updatedAt).fromNow();
    },
    shortenContent() {
      if (this.post.content.length >= 70)
        return this.post.content.slice(0, 70).concat("...");
      return this.post.content;
    }
  },
  methods: {
    starPost() {
      
      axios({
        method: "patch",
        url: `/posts/${this.post._id}`,
        data: {
          starred: !this.post.starred
        },
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      })
        .then(result => {
          let str = 'starred'
          if(this.post.starred == true)
            str = 'unstarred'
          this.$emit("get_all_posts");
          Swal.fire({
          title: `Post ${str}`,
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    }
  }
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
