<template>
  <v-layout
    wrap
    style="height: 200px;"
  >
    <!-- <v-container>
      <v-layout justify-center>
        <v-btn
          color="pink"
          dark
          @click.stop="drawer = !drawer"
        >
          {{opentoolbar}}
        </v-btn>
      </v-layout>
    </v-container> -->

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile @click="showArticles">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>All Articles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showMyArticles">
          <v-list-tile-action>
            <v-icon>folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Articles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="createNewArticle">
          <v-list-tile-action>
            <v-icon>create_new_folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create new Article</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>


<script>
  export default {
  props:["opentoolbar"]
    ,
    data () {
      return {
        drawer: null,
        links: [
          { title: "All Articles", icon: "dashboard", route: "/all" },
          { title: "My Articles", icon: "folder", route:"/myarticles" },
          { title: "Create new Article", icon: "create_new_folder", route: "/addarticle"}
        ]
      }
    },
    methods:{
      showArticles: function(){
        this.$emit("showArticles")
      },
      createNewArticle: function(){
        this.$emit("createNewArticle")
      },
      showMyArticles: function() {
        this.$emit("showMyArticles")
      }
    },
    watch:{
        opentoolbar: function(){
            this.drawer=!null
        } 
    }
  }
</script>