<template>
  <div class="card">
    <div class="articleimage">
      <img :src="article.imageUrl">
    </div>
    <div class="cardcontent">
      <div style="font-size: 1.5rem;">{{article.title}}</div>
      <div>
        <button class="button button3" @click="view">View</button>
        <button class="button button3" @click="edit">Edit</button>
        <button class="button button3" @click="delete1">Delete</button><span v-show="alert">{{alert}}</span>
        <br>
        <span style="color: #ddd;">Tags: {{article.tags.join(', ')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ax from './helpers/axiosInstance';

export default {
  props: ['article',],
  data() {
    return {
      alert: '',
    }
  },
  methods: {
    view() {
      this.$emit('view');
    },
    edit() {
      this.$emit('edit');
    },
    delete1() {
      
    },
  }
}
</script>

