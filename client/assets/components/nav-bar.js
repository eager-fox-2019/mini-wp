Vue.component('nav-bar', {
  data: {},
  template: `
  	<nav class="navbar navbar-dark bg-dark">
	  <div class="d-flex align-items-center col-4">
	    <button id="toggleSidebar" v-on:click="toggleSidebar"></button>
	    <label>Mini WP</label><label v-if="isLoggedin" v-model="userName"></label>
	  </div>
	  <ul class="navbar-nav bd-navbar-nav flex-row d-flex justify-content-end col-8">
	    <li id="homeNav" class="nav-item col-2">
	      <a class="nav-link " href="#">Home</a>
	    </li>

	    <li v-show="isLoggedin" class="nav-item col-2">
	      <button v-if="postArea === false" id="togglePostButton" class="btn btn-primary btn-md" v-on:click="togglePost" v-bind:disabled="editArticleArea">Post</button>
	      <button v-else="" id="togglePostButton2" class="btn btn-secondary btn-md" v-on:click="togglePost" v-bind:disabled="editArticleArea">Cancel</button>
	    </li>

	    <li v-show="isLoggedin" class="nav-item col-2">
	      <a class="nav-link " href="#" @click.prevent="toggleEditUser">User</a>
	    </li>

	    <li class="nav-item col-2">
	      <a v-if="isLoggedin" class="nav-link " href="#" @click.prevent="logoutUser">Logout</a>

	      <a v-if="isLoggedin === false" class="btn btn-info" href="#" @click.prevent="toggleLoginArea">Account</a>
	    </li>
	  </ul>
	</nav>
    `
})