const myServer = 'http://localhost:3000'
function onSignIn(googleUser) {
  console.log('google sign in trigger')
  const idToken = googleUser.getAuthResponse().id_token;
  axios
    .post(`${myServer}/googleSignIn`, { idToken })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('picture', data.picture);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      localStorage.setItem('id', data.id);
      app.initialization()

    })
    .catch((err) => {
      Swal.fire({
        type: 'error',
        title: `${err}`,
        animation: false,
        customClass: {
          popup: 'animated tada'
        }
      })
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('google logout')
  });
}
const app = new Vue({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data() {
    return {
      articles: [],
      myArticles: [],
      article_title: '',
      article_content: '',
      article_tag: '',
      featured_image: '',
      featured_image_edit: 'https://cdn-images-1.medium.com/max/2560/1*WNBUtTzkDqn-uzP8vPcvpw.jpeg',
      search_input: '',
      login_email: '',
      login_password: '',
      register_name: '',
      register_email: '',
      register_password: '',
      confirmpassword: '',
      userName: '',
      file: '',
      article_detail_title: '',
      article_detail_content: '',
      article_detail_image: '',
      article_detail_tags: [],
      create_article_page: false,
      read_article_page: false,
      isLogin: false,
      login_page: true,
      register_page: false,
      menu_article: false,
      article_detail_page: false,
      my_fav_articles_page: false,
      my_article_page: false,
      edit_page: false,
      tag_input: '',
      tags: [],
      button_tag: false,
    }
  },
  methods: {
    
    delete_tag(tag) {
      // console.log('delete', tag)
      let index = this.tags.indexOf(tag);
      if (index !== -1) this.tags.splice(index, 1);
    },
    add_tag_button(){
      console.log('add tag button')
      if (this.tag_input !== '' && this.tags.indexOf(this.tag_input.toLowerCase()) == -1){
        this.tags.push(this.tag_input.toLowerCase())
        this.tag_input = ''
      }
    },
    onEnter() {
      console.log('enter')
      if (this.tag_input !== '' && this.tags.indexOf(this.tag_input) == -1){
        this.tags.push(this.tag_input)
        this.tag_input = ''
      }
    },
    fetchArticles() {
      console.log('fetch data trigger')
      axios({
        method: 'get',
        url: `${myServer}/articles`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          this.articles = response.data
          console.log(response.data)
          let myArti = []
          // this.myArticles = ''
          response.data.forEach(el => {
            console.log(el.author._id ,"===", localStorage.getItem('id'))
            if (el.author._id === localStorage.getItem('id')){
              myArti.push(el)
            }
          })
          this.myArticles = myArti
        })
        .catch((err) => {
          this.user_logout()
          console.log(err.response)
        })
    },
    initialization() {
      console.log('init trigger')
      console.log(this.isLogin, "ini isLogin")
      if (localStorage.getItem('token')) {
        this.user_login()
        this.fetchArticles()
      }
    },
    login_link() {
      console.log('login link trigger')
      this.login_page = true
      this.register_page = false
    },
    login_button() {
      console.log('login button trigger')
      axios({
        method: 'post',
        url: `${myServer}/login`,
        data: {
          email: this.login_email,
          password: this.login_password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'You have successfully logged in.',
            showConfirmButton: false,
            timer: 2000
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.initialization()
          // this.fetchArticles()
          // console.log(data)
          // console.log('ksini?');
        })
        .catch((err) => {
          console.log('masuk error')
          // console.log(err);
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`,
          })
          console.log(err.response.data.message)
        })
    },
    register_link() {
      console.log('register link trigger')
      this.login_page = false
      this.register_page = true
    },
    register_button() {
      axios({
        method: 'post',
        url: `${myServer}/register`,
        data: {
          name: this.register_name,
          email: this.register_email,
          password: this.register_password
        }
      })
        .then((response) => {
          Swal.fire(
            'Register Successfully!',
            'Please Login First',
            'success'
          )
          console.log(response.data)
          this.register_name = '',
            this.register_email = '',
            this.register_password = ''
          this.confirmpassword = ''
          this.login_link()
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`,
          })
          console.log(err.response.data.message)
        })
    },
    user_login() {
      this.login_email = '',
      this.login_password = '',
      this.isLogin = true
      this.create_article_page = false
      this.read_article_page = true
      this.menu_article = true
      this.login_page = false
      this.userName = localStorage.getItem('name')
    },
    user_logout() {
      console.log('logout trigger')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('picture')
      this.isLogin = false
      this.create_article_page = false
      this.read_article_page = false
      this.menu_article = false
      this.login_page = true
      signOut()
      // this.initialization()

    },
    create_article() {
      console.log(this.file, "ini file")
      if (this.article_title === ''){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `Please fill article title`,
        })
    }else
      if (this.article_content === ''){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `Please fill article content`,
        })
    }else
    if (this.file === ''){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `Image is required, please upload image`,
          })
      }else{
        console.log('create article trigger')
        let formData = new FormData();
        formData.append('image', this.file);
        axios.post(`${myServer}/articles/upload`,
          formData,
          {
            headers: {
              token: localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((data) => {
          console.log('hasil upload berhasil')
          console.log(data)
          return axios({
            method: 'post',
            url: `${myServer}/articles`,
            data: {
              title: this.article_title,
              content: this.article_content,
              featured_image: data.data,
              tags: this.tags,
              author: localStorage.getItem('id')
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(response => {
              this.article_title = ''
              this.article_content = ''
              this.article_tag = ''
              this.featured_image = ''
              this.articles.push(response.data)
              this.myArticles.push(response.data)
              Swal.fire({
                type: 'success',
                title: 'Created success.',
                showConfirmButton: false,
                timer: 1500
              })
            })
        })
          .catch((err) => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response.data.message}`,
            })
            console.log(err.response)
          })
      }
    },
    remove_article(id) {
      console.log('remove article trigger')
      axios({
        method: 'delete',
        url: `${myServer}/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.articles = this.articles.filter(el => (el._id !== data._id))
          this.myArticles = this.myArticles.filter(el => (el._id !== data._id))
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`,
          })
          console.log(err.response)
        })
    },
    create_article_link() {
      console.log('create article link trigger')
      this.create_article_page = true
      this.read_article_page = false
      this.article_detail_page = false
      this.my_article_page = false
      this.my_fav_articles_page = false
    },
    read_article_link() {
      console.log('read article trigger')
      this.create_article_page = false
      this.read_article_page = true
      this.article_detail_page = false
      this.my_article_page = false
      this.my_fav_articles_page = false
    },
    my_fav_article_link() {
      this.create_article_page = false
      this.read_article_page = false
      this.article_detail_page = false
      this.my_article_page = false
      this.my_fav_articles_page = true
    },
    my_article_link() {
      this.create_article_page = false
      this.read_article_page = false
      this.article_detail_page = false
      this.my_article_page = true
      this.my_fav_articles_page = false
    },
    clear_search() {
      console.log('clear search trigger')
      this.search_input = ''
    },
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString()
      return dateString
    },
    handleFileUpload() {
      console.log('handle file trigger')
      console.log(this.$refs.file.files[0])
      this.file = this.$refs.file.files[0];
    },
    read_more_link(id) {
      let articleSelected
      this.articles.forEach(element => {
        if (element._id == id){
          articleSelected = element
        }
      })
      this.article_detail_title = articleSelected.title,
      this.article_detail_content = articleSelected.content,
      this.article_detail_image = articleSelected.featured_image,
      this.article_detail_tags = articleSelected.tags
      this.read_article_page = false
      this.article_detail_page = true
      console.log(articleSelected)
    },
  },
  computed: {
    articlesFilter: function () {
      console.log('search trigger')
      return this.articles.filter((article) => {
        return article.title
          .toLowerCase()
          .match(this.search_input.toLowerCase())
      })
    }
  },
  created() {
    console.log('lifecycle trigger')
    // this.initialization()
    this.initialization()
  }
})