<template>
  <v-content>
    <v-jumbotron height=1400>
      <v-container>
        <v-layout align-center>
          <v-flex>
            <div style="text-align:end;">
            <em class="grey--text">Created At: {{articlecontent.createdAt.slice(0,10)}}</em>
            </div>
            <h3 class="display-5" style="font-size:40px;">{{articlecontent.title}}</h3>
            <br>
            <v-spacer></v-spacer>
            <v-flex>
              <div style="text-align:start;">
                <v-avatar :tile=tile size=40>
                    <img :src="articlecontent.userId.image" alt="avatar">
                </v-avatar>
                <b>{{articlecontent.userId.first_name}} {{articlecontent.userId.last_name}}</b>
              </div>
              <br>
              <img :src="articlecontent.image" alt="content" height="450" width="700">
            </v-flex>
            <br>
            <span
              class="subheading" v-html="articlecontent.content">
            </span>
            <v-divider class="my-3"></v-divider>
            <v-chip v-for="tag in articlecontent.tags" :key="tag">{{tag}}</v-chip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  props: ["article"],
  data() {
    return {
      articlecontent: null
    };
  },
  methods: {
    generate() {
      axios
        .get(`http://localhost:3000/articles/${this.article}`, {
          headers: { "access-token": localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.articlecontent = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.generate();
  }
};
</script>
