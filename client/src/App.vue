<template>
  <div class>
    <Navbar
      :isLogin="isLogin"
      :userName="userName"
      @create_article_link="create_article_link"
      @read_article_link="read_article_link"
      @my_fav_article_link="my_fav_article_link"
      @my_article_link="my_article_link"
      @user_logout="user_logout"
      @login_link="login_link"
      @register_link="register_link"
    ></Navbar>

    <LoadingBar v-if="isLoading"></LoadingBar>

    <Login
      @register_link="register_link"
      @initialization="initialization"
      @trigger_start_loading="trigger_start_loading"
      @trigger_stop_loading="trigger_stop_loading"
      v-show="login_page"
      :myServer="myServer"
    ></Login>

    <Register
      @trigger_start_loading="trigger_start_loading"
      @trigger_stop_loading="trigger_stop_loading"
      @login_link="login_link"
      v-show="register_page"
      :myServer="myServer"
    ></Register>

    <CreateArticle
      @add_new_article="add_new_article"
      v-if="create_article_page"
      :myServer="myServer"
    ></CreateArticle>

    <Read
      @search_by_tag="search_by_tag"
      @fetchArticles="fetchArticles"
      @search_by_tag_link="search_by_tag_link"
      @trigger_start_loading="trigger_start_loading"
      @trigger_stop_loading="trigger_stop_loading"
      v-if="read_article_page"
      :articles="articles"
      :myServer="myServer"
    ></Read>

    <MyArticle
      @remove_article="remove_article"
      @edit_article="edit_page_show"
      :myArticles="myArticles"
      v-if="my_article_page"
      :myServer="myServer"
    ></MyArticle>

    <EditArticle
      v-if="edit_page"
      :edit_article_data="edit_article_data"
      :myServer="myServer"
      @update_data_edit="update_data_edit"
    ></EditArticle>

    <MyFavArticle v-if="my_fav_articles_page"></MyFavArticle>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateArticle from "./components/CreateArticle";
import Read from "./components/Read";
import MyArticle from "./components/MyArticle";
import EditArticle from "./components/EditArticle";
import MyFavArticle from "./components/MyFavArticle";
import LoadingBar from "./components/LoadingBar";

export default {
  components: {
    Navbar,
    LoadingBar,
    Login,
    Register,
    CreateArticle,
    Read,
    MyArticle,
    EditArticle,
    MyFavArticle
  },
  data() {
    return {
      myServer: "http://miniwp2-server.sukmaranggapradeta.com",
      articles: [],
      myArticles: [],
      edit_article_data: "",
      userName: "",
      create_article_page: false,
      read_article_page: false,
      article_detail_page: false,
      isLogin: false,
      login_page: true,
      register_page: false,
      menu_article: false,
      article_detail_page: false,
      my_fav_articles_page: false,
      my_article_page: false,
      edit_page: false,
      isLoading: false,
      edit_page: false
    };
  },
  methods: {
    search_by_tag_link(tag){
        // console.log(' response dari kakek', tag)
        this.search_by_tag(tag)
        // this.read_article_page = true
    },
    trigger_start_loading() {
      this.isLoading = true;
    },
    trigger_stop_loading() {
      this.isLoading = false;
    },
    add_new_article(newArticle) {
      this.articles.unshift(newArticle);
      this.myArticles.unshift(newArticle);
    },
    update_data_edit(data) {
      this.articles = this.articles.map(el => {
        if (el._id === data._id) {
          el.title = data.title;
          el.content = data.content;
          el.tags = data.tags;
          el.featured_image = data.featured_image;
        }
        return el;
      });
      this.edit_page = false;
      this.my_article_page = true;
    },
    remove_article(id) {
      this.trigger_start_loading()
    //   console.log("remove article trigger");
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
          axios({
            method: "delete",
            url: `${this.myServer}/articles/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              this.trigger_stop_loading()
              Swal.fire({
                position: "center",
                type: "success",
                title: "Deleted!",
                text: "Your file has been deleted.",
                showConfirmButton: false,
                timer: 2000
              });
              this.articles = this.articles.filter(el => el._id !== data._id);
              this.myArticles = this.myArticles.filter(
                el => el._id !== data._id
              );
            })
            .catch(err => {
              this.trigger_stop_loading()
              Swal.fire({
                type: "error",
                title: "Oops...",
                text: `${err.response.data.message}`
              });
              console.log(err.response);
            });
        }
      });
    },
    edit_page_show(id) {
    //   console.log("edit page APP", id);
      this.edit_page = true;
      this.my_article_page = false;
      this.edit_article_data = this.myArticles.filter(el => el._id == id);
    },
    login_link() {
    //   console.log("login link trigger");
      this.login_page = true;
      this.register_page = false;
    },
    register_link() {
    //   console.log("register link trigger");
      this.login_page = false;
      this.register_page = true;
    },
    create_article_link() {
    //   console.log("create_article_link APP");
      this.edit_page = false;
      this.create_article_page = true;
      this.read_article_page = false;
      this.article_detail_page = false;
      this.my_article_page = false;
      this.my_fav_articles_page = false;
    },
    read_article_link() {
    //   console.log("rread_article_link APP");
      this.fetchArticles();
      this.edit_page = false;
      this.create_article_page = false;
      this.read_article_page = true;
      this.article_detail_page = false;
      this.my_article_page = false;
      this.my_fav_articles_page = false;
    },
    my_fav_article_link() {
    //   console.log("my_fav_article_link APP");
      this.edit_page = false;
      this.create_article_page = false;
      this.read_article_page = false;
      this.article_detail_page = false;
      this.my_article_page = false;
      this.my_fav_articles_page = true;
    },
    my_article_link() {
    //   console.log("my_article_link APP");
      this.edit_page = false;
      this.create_article_page = false;
      this.read_article_page = false;
      this.article_detail_page = false;
      this.my_article_page = true;
      this.my_fav_articles_page = false;
      this.edit_page = false;
    },
    initialization() {
    //   console.log("init trigger");
    //   console.log(this.isLogin, "ini isLogin");
      if (localStorage.getItem("token")) {
        this.user_login();
        this.fetchArticles();
      }
    },
    user_login() {
      (this.login_email = ""),
        (this.login_password = ""),
        (this.isLogin = true);
      this.create_article_page = false;
      this.read_article_page = true;
      this.menu_article = true;
      this.login_page = false;
      this.userName = localStorage.getItem("name");
    },
    user_logout() {
    //   console.log("logout trigger");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("picture");
      this.isLogin = false;
      this.edit_page = false;
      this.create_article_page = false;
      this.read_article_page = false;
      this.menu_article = false;
      this.login_page = true;
      this.my_article_page = false;
      this.my_fav_articles_page = false;
      //   signOut()
      // this.initialization()
    },
    fetchArticles() {
    //   console.log("fetch data trigger");
      axios({
        method: "get",
        url: `${this.myServer}/articles`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.trigger_stop_loading()
          this.articles = response.data;
          this.articles = this.articles.reverse();
        //   console.log(response.data);
          let myArti = [];
          response.data.forEach(el => {
            // console.log(el.author._id, "===", localStorage.getItem("id"));
            if (el.author._id === localStorage.getItem("id")) {
              myArti.push(el);
            }
          });
          this.myArticles = myArti;
          this.myArticles = this.myArticles.reverse();
        })
        .catch(err => {
          this.user_logout();
          console.log(err.response);
        });
    },
    search_by_tag(q) {
      this.trigger_start_loading()
      // console.log("search_by_tag", q);
      axios({
        method: "get",
        url: `${this.myServer}/articles/tags/${q}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          if (data.length == 0) {
          this.trigger_stop_loading()
            Swal.fire({
              type: "info",
              title: "Oops...",
              text: `article with the tag "${q}" was not found`
            });
          } else {
            this.trigger_stop_loading()
            // console.log('response dari buyut')
            this.articles = data;
          }
        })
        .catch(err => {
          this.trigger_stop_loading()
            Swal.fire({
              type: "info",
              title: "Oops...",
              text: `Internal server error`
            });
          console.log(err);
        });
    }
  },
  created() {
    // console.log("lifecycle trigger");
    this.initialization();
  }
};
</script>

<style scoped>
</style>