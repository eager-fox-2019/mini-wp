<template>
  <div id="app">
    <div
      :style="[showPage == 'main' ? {display:'flex !important'} : {display:'none !important'}]"
      :class="{toggled:!showSidebar}"
      id="wrapper"
    >
      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">
          <a class="navbar-brand purple-text" href="#">
            <img
              src="/assets/navbar-brand.svg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt="Navbar brand"
            >
            Mini WP
          </a>
        </div>
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
          <a
            @click.prevent="showSidebar=!showSidebar"
            href="#"
            class="fas fa-bars blue-text fa-2x mr-5"
            id="menu-toggle"
          ></a>
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
                  class="nav-link btn btn-warning px-3"
                  @click="showPage = 'newpost';formPostHeading='Add New Post';editPostButton=false"
                  href="#"
                  role="button"
                >
                  <i class="fas fa-plus"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">{{ name }}</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    :src="user.image_url"
                    class="rounded-circle float-right"
                    alt="Your Profile Image"
                    style="height:50px; width: 50px;"
                  >
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a @click="showPage = 'editprofile'" class="dropdown-item" href="#">Edit Profile</a>
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
                class="nav-link bg-info text-white active"
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
                class="nav-link bg-success text-white"
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
                class="nav-link bg-warning text-white"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >Draft</a>
            </li>
          </ul>
          <div class="tab-content bg-white" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <ShowPosts
                :posts="posts"
                :tags="tags"
                @edit_post="editPost"
                @delete_post="deletePost"
                @full_post="fullPost"
                @get_all_posts="getAllPosts"
              />
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <ShowPosts
                :posts="publishedPosts"
                :tags="tags"
                @edit_post="editPost"
                @delete_post="deletePost"
                @full_post="fullPost"
                @get_all_posts="getAllPosts"
              />
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <ShowPosts
                :posts="draftedPosts"
                :tags="tags"
                @edit_post="editPost"
                @delete_post="deletePost"
                @full_post="fullPost"
                @get_all_posts="getAllPosts"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

    <!-- Full Post Page -->
    <a
      v-show="showPage == 'livepreview'"
      @click.prevent="showPage = 'main'"
      href="#"
      class="position-absolute fas fa-arrow-alt-circle-left blue-text fa-3x ml-3"
    ></a>
    <div v-show="showPage == 'livepreview'" class="container mt-4">
      <div class="card card-cascade wider reverse">
        <!-- Card image -->
        <div class="view view-cascade overlay">
          <img class="card-img-top" :src="livePreview.image_url" alt="Card image cap">
          <a href="#!">
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>

        <!-- Card content -->
        <div class="card-body card-body-cascade text-center">
          <!-- Title -->
          <h4 class="card-title">
            <strong>{{ livePreview.title }}</strong>
          </h4>
          <!-- Subtitle -->
          <h6 class="font-weight-bold indigo-text py-2">
            <span
              v-for="tag in livePreview.tags"
              class="badge badge-default"
              :key="tag.key"
            >{{ tag.value }}</span>
          </h6>
          <!-- Text -->
          <p class="card-text" v-html="livePreview.content"></p>

          <!-- Linkedin -->
          <a href="#" class="px-2 fa-lg li-ic">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <!-- Twitter -->
          <a href="#" class="px-2 fa-lg tw-ic">
            <i class="fab fa-twitter"></i>
          </a>
          <!-- Dribbble -->
          <a href="#" class="px-2 fa-lg fb-ic">
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- End of Full Post Page -->

    <div class="container mt-4" id="newpost-page" v-show="showPage == 'newpost'">
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
            placeholder="Post's title"
          >
        </div>
        <div class="form-group">
          <label for="editor">Content</label>
          <ckeditor :editor="editor" v-model="inputNewPost.content" :config="editorConfig"></ckeditor>
        </div>
        <tags-input
          element-id="tags"
          v-model="inputNewPost.selectedTags"
          :existing-tags="tags"
          :typeahead="true"
          placeholder="Add tags to your new post"
        ></tags-input>
        <div class="form-group row mt-4">
          <p>Feature Image for Post Header:</p>
          <div class="custom-file">
            <input @change="selectFile" type="file" class="custom-file-input" id="imageFile">
            <label class="custom-file-label" for="imageFile">Choose file</label>
            <img
              v-show="inputNewPost.imagePreview"
              :src="inputNewPost.imagePreview"
              class="float-right"
              style="height:200px;width:200px;"
              alt="Preview Image"
            >
          </div>
          <!-- <label for="imageURL">OR just put your image URL address here :</label>
          <input type="text" class="form-control" id="imageURL" placeholder="*.jpg,*,png">-->
        </div>
        <div class="custom-control custom-switch my-2">
          <input
            v-model="inputNewPost.published"
            type="checkbox"
            class="custom-control-input"
            id="customSwitches"
          >
          <label class="custom-control-label" for="customSwitches">Publish it as well</label>
        </div>
        <input type="submit" class="btn btn-primary mr-3" value="Post Now">
        <input
          @click="showPage = 'main'; emptyPostForm()"
          type="button"
          class="btn btn-default"
          value="Cancel"
        >
      </form>
    </div>
    <Landing v-show="showPage == 'landing'" @loginSuccess="checkLogin"/>
    <EditProfile
      v-if="showPage == 'editprofile'"
      :old="user"
      @updatedProfile="checkLogin"
      @cancel="showPage = 'main'"
    />
    <Kosong v-show="showPage == 'antah'"/>
  </div>
</template>

<script>
import axios from "./axios";

import EditProfile from "./components/EditProfile.vue";
import Landing from "./components/Landing.vue";
import Kosong from "./components/Kosong.vue";
import ShowPosts from "./components/ShowPosts.vue";

export default {
  components: {
    EditProfile,
    Landing,
    Kosong,
    ShowPosts
  },
  data() {
    return {
      posts: [],
      publishedPosts: [],
      draftedPosts: [],
      query: {
      },
      queryTags: [],
      showPage: "landing",
      // showMainPage: false,
      // showFullPost: false,
      // showNewPostPage: false,
      // showLogRegPage: true,
      showSidebar: false,
      editPostButton: false,
      name: "",
      user: {},
      searchText: "",
      formPostHeading: "",
      tags: {},
      inputNewPost: {
        _id: "",
        title: "",
        image: "",
        content: "",
        imagePreview: "",
        published: false,
        starred: false,
        selectedTags: []
      },
      livePreview: {},
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

  watch: {
    searchText(newText) {
      this.getAllPosts();
    },
    showPage(newPage) {
      if (newPage == "main") this.getAllPosts();
    }
  },
  created() {
    this.checkLogin()
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
      this.inputNewPost.published = false;
      this.inputNewPost.starred = false;
      this.inputNewPost.selectedTags = [];
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
    getAllPosts(str, newVal, onTag) {
      console.log(this.tags[newVal]);
      if (this.searchText) this.query.title = `title=${this.searchText}`;
      else this.query.title = "";

      // if (newVal) {
      //   if(str == 'tags') {
      //     if(onTag == 'added') {
      //       this.query[str].push(newVal)
      //     }
      //     else if(onTag == 'removed')
      //       this.query[str] = this.query[str].filter(value => value !== newVal)
      //   }
      //   else
      //     this.query[str] = `${str}=${newVal}`
      // }
      // else
      //   this.query[str] = ''

      // if (newVal) {
      //   if(str == 'tags') {
      //     if(onTag == 'added'){
      //       if(this.query[str])
      //         this.query[str] += ','+newVal
      //       else
      //         this.query[str] = `${str}=${newVal}`
      //     }
      //     else if(onTag == 'removed') {

      //     }
      //   }
      //   else
      //     this.query[str] = `${str}=${newVal}`
      // }
      // else
      //   this.query[str] = ''
      if(!this.tags[newVal])
        this.queryTags = []
      if (newVal) {
        if (str == "tags") {
            if (onTag == "added") {
              this.queryTags.push(this.tags[newVal]);
            } 
            else if (onTag == "removed") {
              this.queryTags = this.queryTags.filter(
                value => value !== this.tags[newVal]
              );
            }
        } else {
          this.query[str] = `${str}=${newVal}`;
        }
      } else if (str) this.query[str] = "";
      // let queryTags = this.queryTags.join(',')
      let ada = Object.values(this.query).filter(value => {
        if (value) return true;
        else return false;
      });
      console.log(this.query);
      console.log(ada);

      let searchNow = "";
        if (this.queryTags.length > 0) {
          let tags = "tags=" + this.queryTags.join(",");
          ada.push(tags)
        }
      if (ada.length > 0) {
        searchNow = "?" + ada.join("&");
      }
      console.log(searchNow);

      axios({
        method: "GET",
        url: `/posts/${searchNow}`,
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      })
        .then(({ data }) => {
          this.posts = [...data.posts];
          this.publishedPosts = [];
          this.draftedPosts = [];
          this.posts.forEach(obj => {
            if (obj.published) this.publishedPosts.push(obj);
            else this.draftedPosts.push(obj);
          });
          // this.posts.forEach((obj, i) => {
          //   this.posts[i].created_at = new Date(
          //     this.posts[i].created_at.slice(0, 10)
          //   ).toLocaleDateString("id-ID", {
          //     day: "numeric",
          //     month: "long",
          //     year: "numeric"
          //   });
          // })

          this.tags = {};
          data.tags.forEach((tag, i) => {
            this.tags[i + 1] = tag;
          });
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, "error");
        });
    },
    fullPost(post) {
      this.livePreview = post;
      this.showPage = "livepreview";
    },
    createPost() {
      // let tags = []
      // this.inputNewPost.selectedTags.forEach(obj =>{
      //   tags.push(obj.value)
      // })
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title);
      formData.append("content", this.inputNewPost.content);
      formData.append("published", this.inputNewPost.published);
      formData.append("starred", this.inputNewPost.starred);
      formData.append("tags", this.inputNewPost.selectedTags);
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
          this.showPage = "main";
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
      formData.append("published", this.inputNewPost.published);
      formData.append("starred", this.inputNewPost.starred);
      formData.append("tags", this.inputNewPost.selectedTags);
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
          this.showPage = "main";
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
      this.showPage = "newpost";
      this.inputNewPost._id = post._id;
      this.inputNewPost.title = post.title;
      this.inputNewPost.content = post.content;
      this.inputNewPost.published = post.published;
      this.inputNewPost.starred = post.starred;
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
    checkLogin() {
      if (localStorage.getItem("access-token")) {
        axios({
          method: "GET",
          url: "/users/me",
          headers: {
            "access-token": localStorage.getItem("access-token")
          }
        })
          .then(({ data }) => {
            this.user = data;
            this.showPage = "main";
            this.getAllPosts();
          })
          .catch(({ response }) => {
            this.showMessage(response.data.message, "error");
          });
      } else {
        this.showPage = "landing";
      }
    },
    logout() {
      localStorage.removeItem("access-token");
      if (localStorage.hasOwnProperty("signedInVia")) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          localStorage.removeItem("signedInVia");
        });
      }
      this.showMessage("You Have Been Logged Out Successfully", "success");
      this.showPage = "landing";
    },
    
  }
};
</script>