const serverURL = "http://localhost:3000";
const ax = axios.create({
  baseURL: serverURL,
  headers: {
    token: localStorage.getItem("token")
  }
});

const vue = new Vue({
  el: "#app",
  data: {
    pages: [
      "articles",
      "detailarticle",
      "myarticles",
      "newarticle",
      "editarticle",
      "register",
      "login",
      "setting"
    ],
    auth2: {},
    isOnPage: "login",
    isLogin: false,
    loggedInUser: {},
    myarticles: [],
    articles: [],
    tags: [],
    inputLoginRegister: {
      name: "",
      email: "",
      password: ""
    },
    inputArticles: {
      title: "",
      content: "",
      rawHTML: "",
      picture: "",
      tags: []
    },
    inputFilter: ""
  },
  created() {
    this.checkUser();
    this.checkLogin();
    if (this.isLogin) {
      this._getUserArticles();
      this._getAllArticles();
      this._getAllTags();
    }
  },
  mounted() {},
  methods: {
    _getUserArticles() {},
    _getAllArticles() {},
    _getAllTags() {},

    // RESET THE INPUT FUNCTION
    r_inputLoginRegister() {
      this.inputLoginRegister = {
        name: "",
        email: "",
        password: ""
      };
    },
    r_inputLoginRegister_afterregister() {
      this.inputLoginRegister.name = "";
      this.inputLoginRegister.password = "";
    },
    r_inputArticle() {
      this.inputArticles = {
        title: "",
        content: "",
        snippet: "",
        rawHTML: "",
        img: "",
        tags: []
      };
    },

    // INITIAL CHECK
    checkUser() {
      console.log("check user");
      if (localStorage.getItem("user")) {
        let userData = JSON.parse(localStorage.getItem("user"));
        this.loggedInUser._id = userData._id;
        this.loggedInUser.name = userData.name;
        this.loggedInUser.image = userData.image;
        this.loggedInUser.picture = userData.picture;
      }
    },
    checkLogin() {
      console.log("check login");
      if (localStorage.getItem("token")) {
        this.isLogin = true;
        if (localStorage.getItem("isOnPage")) {
          this.isOnPage = localStorage.getItem("isOnPage");
          this.loadGAPI();
        } else {
          this.page_articles();
        }
      } else {
        this.isLogin = false;
        this.loggedInUser = {};
        this.page_login();
      }
    },

    // LOGIN REGISTER RELATED
    register() {
      console.log("register");
      console.log(this.inputLoginRegister);
      ax({
        method: "POST",
        url: "/users/register",
        data: this.inputLoginRegister
      })
        .then(({ data }) => {
          console.log(data);
          this.page_login_afterregister();
        })
        .catch(err => {
          swal({
            text: "error register"
          });
          console.log(JSON.stringify(err, null, 2));
        });
    },
    login() {
      console.log("login biasa");
      console.log(this.inputLoginRegister);
      ax({
        method: "POST",
        url: "/users/login",
        data: this.inputLoginRegister
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.checkLogin();
          this.checkUser();
        })
        .catch(err => {
          swal({
            text: "error login biasa"
          });
          console.log("error login biasa", err);
          console.log(JSON.stringify(err, null, 2));
        });
    },
    googlelogin(googleUser) {
      console.log(googleUser);
      const idToken = googleUser.getAuthResponse().id_token;
      console.log(googleUser);
      ax({
        method: "POST",
        url: "/users/logingoogle",
        data: {
          idToken
        }
      })
        .then(({ data }) => {
          console.log("berhasil login google");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("mau check login");
          this.checkLogin();
          this.checkUser();
        })
        .catch(err => {
          console.log(err, "error login google");
          console.log(JSON.stringify(err, null, 2));
        });
    },
    logout() {
      gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => {
          localStorage.clear();
          this.checkLogin();
          swal("Logged Out", `success logged out!`, "success");
        })
        .catch(function(err) {
          console.log(err);
          swal("google auth error", "please check your connection", "error");
        });
    },

    // GOOGLE API FUNCTION
    loadGAPI() {
      gapi.load("auth2", () => {
        auth2 = gapi.auth2.init({
          client_id:
            "647848106811-cm0ck452dmhg5b8g38n0dh2bu8ovv7hh.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin"
        });
      });
    },
    initGoogleAuthButton() {
      gapi.load("auth2", () => {
        
        auth2 = gapi.auth2.init({
          client_id:
            "647848106811-cm0ck452dmhg5b8g38n0dh2bu8ovv7hh.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin"
        });

        auth2.attachClickHandler(
          "g-signin2",
          {},
          googleUser => {
            document.getElementById("g-signin2").innerText =
              "Signed in: " + googleUser.getBasicProfile().getName();
          },
          error => {
            console.log(JSON.stringify(error, null, 2));
          }
        );

        auth2.isSignedIn.listen(this.renderGoogleButton);
      });
      this.renderbutton();
    },
    renderGoogleButton() {
      gapi.signin2.render("g-signin2", {
        scope: "profile email",
        longtitle: true,
        theme: "light",
        onsuccess: this.googlelogin
      });
    },
    // MOVING BETWEEN PAGE FUNCTION
    page_articles() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[0];
      this.loadGAPI();
    },
    page_detailarticles() {
      this.isOnPage = this.pages[1];
    },
    page_myarticles() {
      this.isOnPage = this.pages[2];
      this.loadGAPI();
    },
    page_newarticle() {
      this.isOnPage = this.pages[3];
      this.loadGAPI();
    },
    page_editarticle() {
      this.isOnPage = this.pages[4];
      this.loadGAPI();
    },
    page_register() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[5];
    },
    page_login() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[6];
      setTimeout(() => {
        this.initGoogleAuthButton();
      }, 100);
    },
    page_login_afterregister() {
      this.r_inputLoginRegister_afterregister();
      this.isOnPage = this.pages[6];
      setTimeout(() => {
        this.initGoogleAuthButton();
      }, 100);
    },
    page_setting() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[7];
      this.loadGAPI();
    }
  }
});
