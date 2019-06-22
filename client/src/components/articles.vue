<template>
  <div class="p-5">
    <input type="text" placeholder="Enter tag of articles" class="form-control">
    <div class="row justify-content-between">
      <div class="card border p-3 m-3 text-white">
        <img
          src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_8c9El0DZBI8%2FTTQmr8T_LXI%2FAAAAAAAAAQc%2FAa5NbZDAn_A%2Fs1600%2Flake-toba.jpg&f=1"
          alt="learning"
          class="img-thumbnail"
          style="max-width:320px; max-height:240px;"
        >
        <a href="#">
          <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
            <div class="card-text border-0 bg-semitransparent text-center">CHECK</div>
          </div>
        </a>
      </div>

      <div class="card border p-3 m-3 text-white">
        <img
          src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_8c9El0DZBI8%2FTTQmr8T_LXI%2FAAAAAAAAAQc%2FAa5NbZDAn_A%2Fs1600%2Flake-toba.jpg&f=1"
          alt="learning"
          class="img-thumbnail"
          style="max-width:320px; max-height:240px;"
        >
        <a href="#">
          <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
            <div class="card-text border-0 bg-semitransparent text-center">CHECK</div>
          </div>
        </a>
      </div>

      <div class="card border p-3 m-3 text-white">
        <img
          src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_8c9El0DZBI8%2FTTQmr8T_LXI%2FAAAAAAAAAQc%2FAa5NbZDAn_A%2Fs1600%2Flake-toba.jpg&f=1"
          alt="learning"
          class="img-thumbnail"
          style="max-width:320px; max-height:240px;"
        >
        <a href="#">
          <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
            <div class="card-text border-0 bg-semitransparent text-center">CHECK</div>
          </div>
        </a>
      </div>

      <div class="card border p-3 m-3 text-white">
        <img
          src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_8c9El0DZBI8%2FTTQmr8T_LXI%2FAAAAAAAAAQc%2FAa5NbZDAn_A%2Fs1600%2Flake-toba.jpg&f=1"
          alt="learning"
          class="img-thumbnail"
          style="max-width:320px; max-height:240px;"
        >
        <a href="#">
          <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
            <div class="card-text border-0 bg-semitransparent text-center">CHECK</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ax"],
  data() {
    return {
      articles: []
    };
  },
  created() {
    this._getAllArticles();
  },
  mounted() {},
  methods: {
    _getAllArticles() {
      this.ax({
        methods: "GET",
        url: "/articles"
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>

