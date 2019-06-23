<template>
  <v-card flat>
    <v-list two-line>
      <template v-for="(item, index) in articles">
        <v-list-tile :key="item._id" avatar>
          <v-list-tile-avatar>
            <img :src="(item.featured_image) ? item.featured_image : 'https://gagaldiett.files.wordpress.com/2018/10/img-1579-1.jpg?w=256&h=256&crop=1'">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.contentNonHtml }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action @click="editPage(item._id)">
            <v-btn icon>
              <v-icon color="grey lighten-1">edit</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action @click="deleteArticle(item._id)">
            <v-btn icon>
              <v-icon color="grey lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
  props: ['articles'],
  methods: {
    deleteArticle(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this post after deletion!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your Post has been deleted.',
            'success'
          )
          return axios({
            method: 'DELETE',
            headers: {
              token: JSON.parse(localStorage.token).token
            },
            url: `${this.$root.url_server}/articles/${id}`
          })
        }
      })
        .then(({ data }) => {
          this.$emit('update-articles')
        })
        .catch((err) => {
          console.log(err);
        })
    },
    editPage(val) {
      let sendData = ['content-edit-article', val]
      this.$emit('click-edit', sendData)
    }
  }
}
</script>