<template>
  <section>
    <table class="table is-fullwidth is-striped">
      <thead>
        <th>Created</th>
        <th>Title</th>
        <th>Tags</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="(article, index) in data" :key="index">
          <td>{{article.createdAt | moment("from", "now")}}</td>
          <td>{{data[index].title || ''}}</td>
          <td>
            <b-taglist>
              <b-tag type="is-info" v-for="tag in data[index].tags" :key="tag">{{tag}}</b-tag>
            </b-taglist>
          </td>
          <td>
            <router-link :to="`/article/${article.slug_url}/edit`">
              <a class="button is-small is-info">
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
              </a>
            </router-link>
            <a class="button is-small is-danger" @click="del(article._id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import miniwp from "../api/miniwp";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      data: [],
      selected: {},
      columns: [
        {
          field: "createdAt",
          label: "Created"
        },
        {
          field: "title",
          label: "Title"
        },
        {
          field: "tags",
          label: "Tags"
        }
      ],
      formattedDate: ""
    };
  },
  methods: {
    edit(id) {
      console.log(id);
    },
    del(id) {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          miniwp({
            url: `/articles/${id}`,
            method: "DELETE",
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(success => {
              this.getUserArticles();
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
            })
            .catch(err => {
              Swal.fire("Oops!", "Something went wrong", "error");
            });
        }
      });
    },
    getUserArticles() {
      miniwp({
        url: "/articles/user",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.data = data.reverse();
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  created() {
    this.getUserArticles();
  }
};

let data;
</script>
