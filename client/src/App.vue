<template>
  <div id="app">
    <div id="login-register-form" v-show="showLogRegPage" class="container mt-4">
      <ul class="nav nav-pills mb-3" id="login-register-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="login-tab"
            data-toggle="pill"
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >Login</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="register-tab"
            data-toggle="pill"
            href="#pills-register"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >Register</a>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <form
          @submit.prevent="login"
          class="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="pills-login-tab"
          method="POST"
        >
          <div class="form-group">
            <label for="Email">Email address</label>
            <input
              v-model="inputLogin.email"
              type="email"
              class="form-control"
              id="emaillogin"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            >
          </div>
          <div class="form-group">
            <label for="Password">Password</label>
            <input
              v-model="inputLogin.password"
              type="password"
              class="form-control"
              id="passwordlogin"
              placeholder="Password"
              required
            >
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <br>
          <div class="mt-4">
            <h3>OR</h3>
            <h5>Sign in with Google :</h5>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <br>
          </div>
        </form>
        <form
          @submit.prevent="register"
          class="tab-pane fade"
          id="pills-register"
          role="tabpanel"
          aria-labelledby="pills-register-tab"
          method="POST"
        >
          <div class="form-group">
            <label for="Username">Name</label>
            <input
              v-model="inputRegister.name"
              type="text"
              class="form-control"
              id="nameregister"
              placeholder="Enter username"
            >
          </div>
          <div class="form-group">
            <label for="Email">Email Address</label>
            <input
              v-model="inputRegister.email"
              type="email"
              class="form-control"
              id="emailregister"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            >
          </div>
          <div class="form-group">
            <label for="Password">Password</label>
            <input
              v-model="inputRegister.password"
              type="password"
              class="form-control"
              id="passwordregister"
              placeholder="Password"
            >
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
    <div
      :style="[showMainPage ? {display:'flex !important'} : {display:'none !important'}]"
      :class="{toggled:showSidebar}"
      class="d-flex"
      id="wrapper"
    >
      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">Mini Wordpress</div>
        <div class="list-group list-group-flush">
          <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
          <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
          <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
          <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
          <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
          <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button @click="showSidebar=!showSidebar" class="btn btn-primary" id="menu-toggle">History</button>
          <nav class="navbar navbar-light bg-light">
            <form @submit.prevent="getAllPosts" class="form-inline">
              <input
                v-model="searchText"
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              >
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </nav>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a
                  class="nav-link btn btn-warning"
                  @click="showNewPostPage=!showNewPostPage;showMainPage=!showMainPage;formPostHeading='Add New Post';editPostButton=false"
                  href="#"
                  role="button"
                >
                  Write
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">{{ name }}</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link btn btn-secondary dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >User Account</a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Edit Account</a>
                  <a class="dropdown-item" href="#">Setting</a>
                  <div class="dropdown-divider"></div>
                  <a @click="logout" class="dropdown-item" href="#">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div class="container-fluid">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >All Posts</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
              >Published</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >Draft</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div class="card-deck">
                <ListPost
                  v-for="post in posts"
                  :idpost="post._id"
                  :post="post"
                  @edit_post="editPost"
                  @delete_post="deletePost"
                  @show_full_page="showFullPost=!showFullPost;showMainPage=!showMainPage"
                  :key="post._id"
                ></ListPost>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >...</div>
            <div
              class="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >...</div>
          </div>
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

    <!-- Full Post Page -->
    <div v-show="showFullPost" class="container mt-4"></div>
    <!-- End of Full Post Page -->

    <div class="container mt-4" id="newpost-page" v-show="showNewPostPage">
      <h1>{{ formPostHeading }}</h1>
      <form @submit.prevent="EditOrNew" enctype="multipart/form-data">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="inputNewPost.title"
            type="text"
            class="form-control"
            name="title"
            id="title"
          >
        </div>
        <div class="form-group">
          <label for="editor">Content</label>
          <ckeditor :editor="editor" v-model="inputNewPost.content" :config="editorConfig"></ckeditor>
        </div>
        <div class="form-group row">
          <label for="imageFile">Choose image from your drive</label>
          <input
            @change="selectFile"
            type="file"
            class="form-control-file"
            id="imageFile"
            name="imageFile"
          >
          <img
            v-show="inputNewPost.imagePreview"
            :src="inputNewPost.imagePreview"
            style="height:300px;width:300px;"
            alt="Preview Image"
          >
          <!-- <label for="imageURL">OR just put your image URL address here :</label>
          <input type="text" class="form-control" id="imageURL" placeholder="*.jpg,*,png">-->
        </div>
        <input type="submit" class="btn btn-primary" value="Post Now">
        <input
          @click="showMainPage=!showMainPage;showNewPostPage=!showNewPostPage;emptyPostForm()"
          type="button"
          class="btn btn-primary"
          value="Cancel"
        >
      </form>
    </div>
  </div>
</template>
<script>
import axios from './axios'
import ListPost from "./components/ListPost";
export default {
  components: {
    ListPost
  },
  data() {
    return {
      posts: [],
      showMainPage: false,
      showFullPost: false,
      showNewPostPage: false,
      showLogRegPage: true,
      showSidebar: true,
      editPostButton: false,
      name: "",
      searchText: "",
      // registered: false,
      inputLogin: {
        email: "",
        password: ""
      },
      inputRegister: {
        name: "",
        email: "",
        password: ""
      },
      formPostHeading: "",
      inputNewPost: {
        _id: "",
        title: "",
        image: "",
        content: "",
        imagePreview: ""
      },
      editor: ClassicEditor,
      // editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      }
    };
  },
  // filters: {
  //   shortenContent(content) {
  //     if (content.length >= 50) return content.slice(0, 50) + "..."
  //     return content
  //   }
  // },
  computed: {},
  watch: {
    searchText(newText) {
      this.getAllPosts();
    }
  },
  created() {
    if (localStorage.hasOwnProperty("access-token")) {
      this.showLogRegPage = false;
      this.showMainPage = true;
      this.name = localStorage.getItem("name");
      this.getAllPosts();
    } else {
      this.showLogRegPage = true;
      this.showMainPage = false;
    }
  },
  methods: {
    showMessage(text, type) {
      let message = "";
      if (typeof text === "object") {
        // let i = 1
        for (const field in text) {
          message += "- " + text[field] + "\n";
        }
      } else message = text;
      if (type == "error") {
        Swal.fire({
          title: "Error",
          text: message,
          type: type
        });
      } else if (type == "info") {
        Swal.fire({
          title: "Before you continue...",
          text: message,
          type: type
        });
      } else {
        Swal.fire({
          title: message,
          type: type,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    shortenContent(content) {
      // console.log('----------->'+content)
      if (content.length >= 10) return content.slice(0, 10).concat("...");
      return content;
    },
    emptyLogRegForm() {
      this.inputRegister.name = "";
      this.inputRegister.email = "";
      this.inputRegister.password = "";
      this.inputLogin.email = "";
      this.inputLogin.password = "";
    },
    emptyPostForm() {
      this.inputNewPost.title = "";
      this.inputNewPost.content = "";
      this.inputNewPost.image = "";
      this.inputNewPost.imagePreview = "";
    },
    selectFile(event) {
      if (event.target.files[0] /* event.target.files &&  */) {
        this.inputNewPost.image = event.target.files[0];
        var newVue = this;
        var reader = new FileReader();
        reader.onload = function(e) {
          newVue.inputNewPost.imagePreview = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    EditOrNew() {
      if (this.editPostButton) this.updatePost(this.inputNewPost._id);
      else this.createPost();
    },
    getAllPosts() {
      let query = "";
      if (this.searchText) query = `?title=${this.searchText}`;
      console.log(query, this.searchText);
      axios({
        method: "GET",
        url: `/posts/${query}`,
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      })
        .then(response => {
          this.posts = [...response.data];
          this.posts.forEach((obj, i) => {
            this.posts[i].created_at = new Date(
              this.posts[i].created_at.slice(0, 10)
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric"
            });
          });
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    },
    createPost() {
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title);
      formData.append("content", this.inputNewPost.content);
      formData.append("image_url", this.inputNewPost.image);
      axios({
        method: "POST",
        url: "/posts",
        data: formData,
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      })
        .then(result => {
          this.getAllPosts();
          this.showMainPage = true;
          this.showNewPostPage = false;
          this.emptyPostForm();
          this.showMessage("Post have been updated", "success");
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    },
    updatePost(id) {
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title);
      formData.append("content", this.inputNewPost.content);
      formData.append("image_url", this.inputNewPost.image);
      axios({
        method: "PUT",
        url: `/posts/${id}`,
        data: formData,
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      })
        .then(result => {
          this.getAllPosts();
          this.showMainPage = true;
          this.showNewPostPage = false;
          this.emptyPostForm();
          this.showMessage("Post have been updated", "success");
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    },
    editPost(post) {
      this.formPostHeading = "Edit Post";
      this.editPostButton = true;
      this.showMainPage = false;
      this.showNewPostPage = true;
      this.inputNewPost._id = post._id;
      this.inputNewPost.title = post.title;
      this.inputNewPost.content = post.content;
      this.inputNewPost.imagePreview = post.image_url;
    },
    deletePost(idPost) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `/posts/${idPost}`,
            headers: {
              "access-token": localStorage.getItem("access-token")
            }
          })
            .then(result => {
              this.posts = this.posts.filter(post => post._id !== idPost);
              this.showMessage("Your file has been deleted.", "success");
            })
            .catch(({ response }) => {
              this.showMessage(response.data.message, "error");
            });
        }
      });
    },
    register() {
      axios({
        method: "POST",
        url: "/users/register",
        data: {
          name: this.inputRegister.name,
          email: this.inputRegister.email,
          password: this.inputRegister.password
        }
      })
        .then(({ data }) => {
          this.showMessage(
            "You Have Been Registered Successfully, please login now",
            "success"
          );
          this.emptyLogRegForm();
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    },
    login() {
      axios({
        method: "POST",
        url: "/users/login",
        data: {
          email: this.inputLogin.email,
          password: this.inputLogin.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access-token", data.token);
          this.showMessage("You Have Been Logged In Successfully", "success");
          localStorage.setItem("name", data.name);
          this.name = localStorage.getItem("name");
          this.showLogRegPage = false;
          this.showMainPage = true;
          this.emptyLogRegForm();
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    },

    logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("access-token");
      if (localStorage.hasOwnProperty("signedInVia")) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          localStorage.removeItem("signedInVia");
        });
      }
      this.showMessage("You Have Been Logged Out Successfully", "success");
      this.showLogRegPage = true;
      this.showMainPage = false;
    }
  }
};

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  axios({
    method: "POST",
    url: `/users/signingoogle`,
    data: {
      id_token
    }
  })
    .then(({ data }) => {
      if (data.newPass) {
        app.showMessage(
          `You Have Been Logged In Successfully. Hurry up change your password now, your password is ${
            data.newPass
          }`,
          "info"
        );
      } else {
        app.showMessage(`You Have Been Logged In Successfully`, "success");
      }
      localStorage.setItem("signedInVia", true);
      localStorage.setItem("access-token", data["access-token"]);
      app.getAllPosts();
      app.emptyLogRegForm();
      app.showLogRegPage = false;
      app.showMainPage = true;
    })
    .catch(err => {
      console.log(err);
    });
}
</script>