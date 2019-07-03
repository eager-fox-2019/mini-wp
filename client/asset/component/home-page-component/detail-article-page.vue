<template>
  <div v-if="menu == 'detail'" style="height: 700px">
    <div class="center align-items-center d-flex flex-column" id="article-list" style="height: 100%">
      <DetailCard :menu="menu" :article="article" :user="user">
        <div class="row d-flex justify-content-end">
          <div class="center pr-3 pl-3" style="width: 100%">
            <hr>
          </div>
          <div class="pr-3" v-if="article.user.email == user.email">
            <button class="btn btn-success" @click="rendEdit">Edit</button>
            <button class="btn btn-danger" @click="deleteConfirm">Delete</button>
          </div>
          <div class="pr-3" v-else>
            <p class="card-text">Created by: <strong>{{article.user.name}}</strong></p>
          </div>
        </div>
      </DetailCard>
    </div>
  </div>
</template>

<script>
import DetailCard from '../button-&-form-component/detail-card'
export default {
  components: {
    DetailCard
  },
  props: {
    'menu': String,
    'article': Object,
    'user': Object
  },
  methods: {
    rendEdit() {
      this.$emit('rendEdit')
    },
    deleteConfirm() {
      this.$emit('deleteConfirm')
    }
  }
};
</script>

<style scoped>
  .center {
    margin: 0px auto;
  }
  hr {
    border-width: 3px;
    border-color: rgb(73, 73, 73); 
  }
</style>
