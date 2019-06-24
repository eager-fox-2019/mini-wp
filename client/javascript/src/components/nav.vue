<template>
  <div>
    <div class="header">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-body fixed-top">
        <!-- Navbar brand -->
        <a class="navbar-brand js-scroll-trigger logo" href="/">
          <img src="https://img.icons8.com/ios/50/000000/medium-logo-filled.png">MiniWord
        </a>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="basicExampleNav">
          <!-- Links -->
          <ul class="navbar-nav col-lg-9 col-sm-6">
            <!-- <li class="nav-item">
          <a class="nav-link" href="#">Logout</a>
            </li>-->

            <!-- Dropdown -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >My Sites</a>
              <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">Dashboard</a>
                <a class="dropdown-item" href="#" @click="logout">Logout</a>
              </div>
            </li>
          </ul>
          <!-- Links -->
          <form class="form-inline">
            <div class="md-form my-0">
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              >
              <i class="fa fa-lg fa-search" aria-hidden="true"></i>
            </div>
          </form>
        </div>
        <!-- Collapsible content -->
      </nav>
      <!--/.Navbar-->
      <div class="container jumbo-header">
        <div class="jumbotron">
          <h1 class="display-4">Welcome to Mini-Word!</h1>
          <p
            class="lead"
          >Create your own site using this miniword. Just click plus button to make your new article! You can also delete and edit your article!</p>
          <hr class="my-4">
          <!-- <p>You can also delete and edit your article</p>
          <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> -->
        </div>
      </div>
    </div>
  </div>
  <!--/header-->
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Gotta go?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes !"
      }).then(result => {
        if (result.value) {
          var auth2 = gapi.auth2.getAuthInstance();
          localStorage.clear();
          auth2.signOut().then(function() {
            console.log("User signed out.");
          });
          window.location.href = "http://localhost:1234/";
          Swal.mixin({
            title: "Logged out successfully",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    }
  }
};
</script>
<style>
.navbar-body {
  background-color: white;
}
.header {
  background-image: url("https://worldoftravel.co/wp-content/uploads/1-3.jpeg");
  height: 35rem;
  background-attachment: scroll;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 1rem;
}
.jumbo-header {
  padding-top: 5rem;
}
.jumbotron {
  background-color: transparent;
  width: 50rem;
}
.logo {
  font-family: "Varela Round";
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
}

.nav-link:hover {
  background: #5cf0bc;
  color: black;
}
.dropdown-item:hover {
  background: #5cf0bc;
  color: black;
}

.nav-item a {
  color: black;
}
</style>
