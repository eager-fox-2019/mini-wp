<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">{{article.title}}</p>
          <p class="subtitle is-7">
            <a>{{article.author}}</a>
            <small
              class="is-size-7 has-text-grey has-text-weight-light"
            >{{article.publishedAt | moment("from", "now")}}</small>
            <br>
            <span class="is-size-7">{{article.description | truncate(80)}}</span>
            <br>
            <a :href="article.url" target="_blank">read more...</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articlebody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.`
    };
  },
  props: ["article"]
};
</script>

