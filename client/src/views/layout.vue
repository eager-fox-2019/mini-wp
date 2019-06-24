<template>
  <div>
    <section class="hero is-link is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <p class="title">Fullheight hero with navbar</p>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <div class="notification is-dark">test</div>
          </div>
          <div class="column">
            <div class="notification is-dark">
              <div class="columns is-multiline">
                <div class="column is-light" v-for="i in 20" :key="i">
                  <div class="notification is-light has-text-centered">asdf</div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="notification is-dark">test</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import cardlatest from "../components/card-latest.vue";
export default {
  components: {
    cardlatest
  }
};
</script>
