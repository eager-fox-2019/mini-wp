<template>
  <div class="box">
    <article class="media">
      <figure class="media-left image is-128x128">
        <img :src="article.image" alt="featured-image">
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong class="is-size-6">
              <router-link :to="`/article/${article.slug_url}`">{{article.title}}</router-link>
            </strong>
            <br>
            <span v-html="articlebody"></span>
            <!-- <truncate clamp="..." :length="100" less="Show less" :text="article.body"></truncate> -->
          </p>
          <!-- {{article.body | truncate(100)}} -->
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small" style="margin-right: 10px ">
                <i class="fas fa-user"></i>
              </span>
              {{article.author.username}}
            </a>

            <a class="level-item">
              <p>{{article.createdAt | moment("from", "now")}}</p>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
// import VoerroTagsInput from "@voerro/vue-tagsinput";
// import truncate from "vue-truncate-filter";
import truncate from "vue-truncate-collapsed";
export default {
  data() {
    return {
      articlebody:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea explicabo deleniti odit labore excepturi? Repudiandae labore, magni veniam similique obcaecati molestiae sint. Totam consequatur odio, accusamus eligendi pariatur voluptates dolore at omnis vero assumenda vitae, aperiam aliquam doloribus. Distinctio, saepe?"
    };
  },
  props: ["article"],
  components: {
    truncate
  },
  mounted() {
    this.articlebody = this.$options.filters.truncate(this.article.body, "100");
    console.log();
  }
};
</script>
