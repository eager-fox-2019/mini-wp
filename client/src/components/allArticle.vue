<template>
  <div class="card mb-3" style="opacity:0.9">
    <div class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{data.title}}</h5>

                <footer class="blockquote-footer">
          <cite title="Source Title">{{data.UserId.email}}</cite>
        </footer>
                <div class="card-footer text-muted" style="display:flex;margin-top:10px">
          <p v-for="onetag in data.tag"> #{{onetag}} &nbsp;</p>
        </div>
        <p style="margin-top:20px">
          <button 
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            v-bind:data-target=`#${data._id}`
            aria-expanded="false"
            aria-controls="collapseExample"
          >More</button>
                  <button v-if="articleStats" class="btn btn-primary" @click="editMyArticle(data)">Edit</button>
        <button  v-if="articleStats" class="btn btn-danger" @click="deleteArticle(data._id)">Delete</button>

        </p>
        <div class="collapse" v-bind:id="data._id">
          <div class="card card-body">
            <p class="card-text">
            
              <strong>Content:</strong><br>
              <span v-html="data.content"></span>
            </p>
            <img style="width:757px;" v-bind:src="data.image" alt="Card image cap">
          </div>
        </div>



        <p class="card-text">
          <small class="text-muted">Created at {{data.created_at}}</small>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
const url = `http://localhost:3000`;
export default {
  name: "allArticle-page",
  props: ["data", "home", "articleStats"],
  data() {
    return {};
  },
  created() {},
  methods: {
    deleteArticle(articleId) {
      axios({
        method: "DELETE",
        url: `${url}/home/${articleId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("showArticle");
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    editMyArticle(articleEdit) {
      this.$emit("editMyArticle", articleEdit);
    }
  }
};
</script>