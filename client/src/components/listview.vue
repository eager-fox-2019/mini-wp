<template>
  <div class="row container-fluid px-0 d-flex justify-content-center">
    <div
      class="col-xl-3 col-lg-6 col-md-12 col-sm-12 p-3 d-flex align-items-center justify-content-center"
    >
      <div class="card border-0 p-3 m-3 text-white">
        <img
          :src="article.picture"
          :alt="article.title"
          class="img-thumbnail align-self-center"
          style="max-width:320px; max-height:240px;"
        />
        <a href @click.prevent="$emit('read')">
          <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
            <div class="card-text border-0 bg-semitransparent text-center"></div>
          </div>
        </a>
      </div>
    </div>
    <div class="col-lg-8 col-md-12 col-sm-12 p-3">
      <div class="row container-fluid px-0 mx-0 read">
        <div class="col-12 m-0 p-0" href @click.prevent="$emit('read')">
          <div class="m-3">
            <h1>{{article.title}}</h1>
          </div>
          <small
            class="ml-3"
          >Posted At {{new Date(article.postedAt).toDateString()}} {{new Date(article.postedAt).toLocaleTimeString()}}</small>

          <div class="m-3">
            <span v-for="tag in article.tags" :key="tag" class="badge badge-secondary mr-3">
              <i class="fa fa-tags mr-1"></i>
              {{ tag }}
            </span>
          </div>
          <div class="m-3 mt-0">
            <p>{{article.content.split("").splice(0, 200).join("")}} ...</p>
          </div>
        </div>
      </div>
      <div
        v-if="article.author._id == loggedInUser._id || article.author == loggedInUser._id  "
        class="m-3 align-self-end d-flex justify-content-around"
      >
        <a href @click.prevent="$emit('delete')">
          <i class="fa fa-trash fa-2x delete" aria-hidden="true"></i>
        </a>
        <a href @click.prevent="$emit('edit')">
          <i class="fa fa-pencil-square-o fa-2x edit" aria-hidden="true"></i>
        </a>
        <a>
          <i
            class="fa fa-heart fa-2x love text-muted"
            aria-hidden="true"
          >&ensp;{{article.likedby.length}}</i>
        </a>
      </div>
      <div
        v-if="article.author._id !== loggedInUser._id"
        class="m-3 align-self-end d-flex justify-content-end align-items-center"
      >
        <div class="p-3">
          <img :src="article.author.picture" class="img rounded-circle border profile" />
          {{ article.author.name}}
        </div>
        <div class="p-3 ml-1">
          <a @click.prevent="$emit('lu')">
            <div v-if="checkLike(article.likedby) == true">
              <i
                class="fa fa-heart fa-2x love text-danger"
                aria-hidden="true"
              >&ensp;{{article.likedby.length}}</i>
            </div>
            <div v-if="checkLike(article.likedby) == false">
              <i
                class="fa fa-heart-o fa-2x love"
                aria-hidden="true"
              >&ensp;{{article.likedby.length}}</i>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listview",
  props: ["article", "loggedInUser"],
  methods: {
    checkLike(likedby) {
      if (likedby.indexOf(this.loggedInUser._id) > -1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
