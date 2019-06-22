<template>
    <header>
        <nav class="navbar navbar-dark bg-dark">
          <div class="d-flex align-items-center">
            <button id="toggleSidebar" v-on:click="toggleSidebar"></button>
            <label v-if="userName==''">Mini WP</label>
          </div>
          <div>
            <label v-if="userName != ''">{{userName}}'s Mini WP</label>
          </div>
          <ul class="navbar-nav bd-navbar-nav flex-row d-flex justify-content-end flex-wrap">
            <li id="homeNav" class="nav-item">
              <a class="nav-link " href="#">Home</a>
            </li>

            <li v-show="isLoggedin" class="nav-item">
              <button v-if="postArea === false" class="btn btn-primary btn-md" v-on:click="togglePost" v-bind:disabled="editArticleArea">Post</button>

              <button v-else="" class="btn btn-secondary btn-md" v-on:click="togglePost" v-bind:disabled="editArticleArea">Cancel</button>
            </li>

            <li v-show="isLoggedin" class="nav-item">
              <a class="nav-link " href="#" @click.prevent="toggleEditUser">User</a>
            </li>

            <li class="nav-item">
              <a v-if="isLoggedin" class="nav-link " href="#" @click.prevent="logoutUser">Logout</a>

              <a v-if="isLoggedin === false" class="btn btn-info" href="#" @click.prevent="toggleLoginArea">Account</a>
            </li>
          </ul>
        </nav>
      </header>
</template>

<script>

export default {
    props: ["showSidebarProps", "isLoggedin", "userName", "editArticleArea", "postArea"],
    data() {
        return {
        }
    },
    methods:{
        toggleSidebar(){
            this.$emit("sidebar-state") //nama event di parent
        },
        togglePost(){
            this.$emit("post-area-state")

        },
        toggleEditUser(){
            this.$emit("edit-user-area-state")

        },
        logoutUser(){
            this.$emit("logout-state")

        },
        toggleLoginArea(){
            this.$emit("login-area-state")

        }
    }
}
</script>

<style scoped>
.header-wrapper{
    width: 100%;
    height: 100%;
    padding: 1em;
    background-color: #595959;
}

.navbar ul li {
  width: 5em;
}

button {
    height: 100%;
    border-radius: 5%;
    border: solid darkgray;
}

label{
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    margin-left: 0.5em;
}

</style>