axios.defaults.baseURL = "http://localhost:3000"
// axios.defaults.baseURL = "http://35.198.248.18"
// var userName = ""

Vue.use(CKEditor);
// ClassicEditor
//   .create(document.querySelector('#editor'))
//   .catch(error => {
//     console.error(error);
//   });

var app = new Vue({
  el: '#app',
  data: {
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
  },
  // filters: {
  //   shortenContent(content) {
  //     if (content.length >= 50) return content.slice(0, 50) + "..."
  //     return content
  //   }
  // },
  computed: {

  },
  watch: {
    searchText(newText) {
      this.getAllPosts()
    }
  },
  created() {
    if (localStorage.hasOwnProperty('access-token')) {
      this.showLogRegPage = false
      this.showMainPage = true
      this.name = localStorage.getItem('name')
      this.getAllPosts()
    }
    else {
      this.showLogRegPage = true
      this.showMainPage = false
    }
  },
  methods: {
    showMessage(text, type) {
      let message = ''
      if (typeof text === 'object') {
        // let i = 1
        for (const field in text) {
          message += '- ' + text[field] + '\n'
        }
      }
      else
        message = text
      if (type == 'error') {
        Swal.fire({
          title: 'Error',
          text: message,
          type: type,
        })
      }
      else if (type == 'info') {
        Swal.fire({
          title: 'Before you continue...',
          text: message,
          type: type,
        })
      }
      else {
        Swal.fire({
          title: message,
          type: type,
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    shortenContent(content) {
      // console.log('----------->'+content)
      if (content.length >= 10) return content.slice(0, 10).concat("...")
      return content
    },
    emptyLogRegForm() {
      this.inputRegister.name = ""
      this.inputRegister.email = ""
      this.inputRegister.password = ""
      this.inputLogin.email = ""
      this.inputLogin.password = ""
    },
    emptyPostForm() {
      this.inputNewPost.title = ""
      this.inputNewPost.content = ""
      this.inputNewPost.image = ""
      this.inputNewPost.imagePreview = ""
    },
    selectFile(event) {
      if (event.target.files[0]/* event.target.files &&  */) {
        this.inputNewPost.image = event.target.files[0]
        var newVue = this
        var reader = new FileReader()
        reader.onload = function (e) {
          newVue.inputNewPost.imagePreview = e.target.result
        }
        reader.readAsDataURL(event.target.files[0])
      }
    },
    EditOrNew() {
      if (this.editPostButton)
        this.updatePost(this.inputNewPost._id)
      else
        this.createPost()
    },
    getAllPosts() {
      let query = ''
      if (this.searchText)
        query = `?title=${this.searchText}`
      console.log(query,this.searchText)
      axios({
        method: "GET",
        url: `/posts/${query}`,
        headers: {
          'access-token': localStorage.getItem('access-token')
        }
      })
        .then(response => {
          this.posts = [...response.data]
          this.posts.forEach((obj, i) => {
            this.posts[i].created_at = new Date(this.posts[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          })
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, 'error')
        })
    },
    createPost() {
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title)
      formData.append("content", this.inputNewPost.content)
      formData.append("image_url", this.inputNewPost.image)
      axios({
        method: "POST",
        url: "/posts",
        data: formData,
        headers: {
          'access-token': localStorage.getItem('access-token')
        }
      })
        .then(result => {
          this.getAllPosts()
          this.showMainPage = true
          this.showNewPostPage = false
          this.emptyPostForm()
          this.showMessage('Post have been updated', 'success')
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, 'error')
        })
    },
    updatePost(id) {
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title)
      formData.append("content", this.inputNewPost.content)
      formData.append("image_url", this.inputNewPost.image)
      axios({
        method: "PUT",
        url: `/posts/${id}`,
        data: formData,
        headers: {
          'access-token': localStorage.getItem('access-token')
        }
      })
        .then(result => {
          this.getAllPosts()
          this.showMainPage = true
          this.showNewPostPage = false
          this.emptyPostForm()
          this.showMessage('Post have been updated', 'success')
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, 'error')
        })
    },
    editPost(post) {
      this.formPostHeading = 'Edit Post';
      this.editPostButton = true;
      this.showMainPage = false
      this.showNewPostPage = true
      this.inputNewPost._id = post._id
      this.inputNewPost.title = post.title
      this.inputNewPost.content = post.content
      this.inputNewPost.imagePreview = post.image_url
    },
    deletePost(idPost) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `/posts/${idPost}`,
            headers: {
              'access-token': localStorage.getItem('access-token')
            }
          })
            .then(result => {
              this.posts = this.posts.filter(post => post._id !== idPost)
              this.showMessage('Your file has been deleted.', 'success')
            })
            .catch(({ response }) => {
              this.showMessage(response.data.message, 'error')
            })
        }
      })
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
          this.showMessage('You Have Been Registered Successfully, please login now', 'success')
          this.emptyLogRegForm()
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, 'error')
        })
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
          localStorage.setItem('access-token', data.token)
          this.showMessage('You Have Been Logged In Successfully', 'success')
          localStorage.setItem('name', data.name)
          this.name = localStorage.getItem('name')
          this.showLogRegPage = false
          this.showMainPage = true
          this.emptyLogRegForm()
        })
        .catch(({ response }) => {
          this.showMessage(response.data.message, 'error')
        })
    },

    logout() {
      localStorage.removeItem('name')
      localStorage.removeItem('access-token')
      if (localStorage.hasOwnProperty('signedInVia')) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          localStorage.removeItem('signedInVia')
        });
      }
      this.showMessage('You Have Been Logged Out Successfully', 'success')
      this.showLogRegPage = true
      this.showMainPage = false
    }
  }
})

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  axios({
    method: 'POST',
    url: `/users/signingoogle`,
    data: {
      id_token
    }
  })
    .then(({ data }) => {
      if (data.newPass) {
        app.showMessage(`You Have Been Logged In Successfully. Hurry up change your password now, your password is ${data.newPass}`, 'info')
      }
      else {
        app.showMessage(`You Have Been Logged In Successfully`, 'success')
      }
      localStorage.setItem('signedInVia', true)
      localStorage.setItem('access-token', data['access-token'])
      app.getAllPosts()
      app.emptyLogRegForm()
      app.showLogRegPage = false
      app.showMainPage = true
    })
    .catch(err => {
      console.log(err)
    })
}