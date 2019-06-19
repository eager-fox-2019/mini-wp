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
    isOnPage: undefined,
    isLogin: undefined,
    loggedInUser: {},
    myarticles: [],
    articles: [],
    tags: [],
    inputLoginRegister: {
      name: "",
      email: "",
      password: ""
    },
    inputArticle: {
      title: "",
      content: "",
      rawHTML: "",
      picture: "",
      tags: []
    },
    inputFilter: "",
    inputTag: "",
    userChange: {
      name: "",
      password: "",
      image: ""
    },
    editor: ""
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
    // GET DATA FROM DATABASE
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
      this.inputArticle = {
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
        this.loggedInUser.email = userData.email;
        this.loggedInUser.name = userData.name;
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
          swal(
            "Logged In",
            "If this is your first time log in, change your password by accessing Account tab above!",
            "info"
          );
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
          this.r_inputArticle();
          this.checkLogin();
          swal("Logged Out", `success logged out!`, "success");
        })
        .catch(function(err) {
          console.log(err);
          swal("google auth error", "please check your connection", "error");
        });
    },

    // USER RELATED FUNCTION
    updateAccount() {
      console.log("update account");
      if (
        !this.userChange.name &&
        !this.userChange.password &&
        !this.userChange.picture
      ) {
      } else {
        swal({
          title: "Confirmation",
          text: "Update your account detail?",
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(confirm => {
          if (confirm) {
            var passwordValid = true;
            var updValue = {};
            if (this.userChange.name) {
              if (
                this.userChange.name == this.loggedInUser.name ||
                this.userChange.name == ""
              ) {
                updValue.name = this.loggedInUser.name;
              } else {
                updValue.name = this.userChange.name;
              }
            }
            if (this.userChange.password) {
              if (this.userChange.password !== "") {
                if (
                  this.userChange.password.length < 8 ||
                  this.userChange.password.length > 16
                ) {
                  passwordValid = false;
                }
                updValue.password = this.userChange.password;
              }
            }
            if (this.userChange.picture) {
              updValue.picture = this.userChange.picture;
            }

            if (updValue.picture) {
              const blob = new Blob([this.userChange.picture], {
                type: this.userChange.picture.type
              });

              const formdata = new FormData();
              formdata.append("image", blob);
              ax({
                method: "POST",
                url: "/uploadimg",
                data: formdata,
                headers: {
                  "Content-Type": "multipart/form-data",
                  token: localStorage.getItem("token")
                }
              })
                .then(({ data }) => {
                  this.userChange.picture = data;
                  updValue.picture = data;
                  return ax({
                    method: "PATCH",
                    url: "/users",
                    data: updValue
                  });
                })
                .then(({ data }) => {
                  let { name, picture } = this.userChange;
                  if (name) {
                    this.loggedInUser.name = name;
                  }
                  if (picture) {
                    this.loggedInUser.picture = picture;
                  }
                  $("#selectedPicture").val("");
                  console.log(this.loggedInUser);
                  localStorage.setItem(
                    "user",
                    JSON.stringify(this.loggedInUser)
                  );
                  this.userChange = {};
                  this.checkUser();
                  swal("Success", "Your account has been updated", "success");
                })
                .catch(err => {
                  swal("Sorry", "Problem occured, try again later", "error");
                  console.log(
                    "error update akun dengan upload gambar",
                    JSON.stringify(err, null, 2)
                  );
                });
            } else if (updValue.password && passwordValid == false) {
              swal(
                "Attention",
                "Password should consist of 8-16 character",
                "info"
              );
            } else {
              if (updValue.name == "" || updValue.password == "") {
                swal("Fill one of the field that you want to update");
              } else {
                console.log("mulai update akun");
                console.log(updValue, "nilai yang mau di update\n\n\n\n\n");
                ax({
                  method: "PATCH",
                  url: "/users",
                  data: updValue
                })
                  .then(({ data }) => {
                    console.log("update akun berhasil");
                    let { name } = this.userChange;
                    if (name) {
                      this.loggedInUser.name = name;
                    }
                    console.log(this.loggedInUser);
                    localStorage.setItem(
                      "user",
                      JSON.stringify(this.loggedInUser)
                    );
                    this.userChange = {};
                    this.checkUser();
                    swal("Success", "Your account has been updated", "success");
                  })
                  .catch(err => {
                    swal("Sorry", "Problem occured, try again later", "error");
                    console.log(
                      "error update akun tanpa upload gambar",
                      JSON.stringify(err, null, 2)
                    );
                  });
              }
            }
          }
        });
      }
    },

    // UPLOAD PICTURE FUNCTION
    selectProfilePic(event) {
      this.userChange.picture = event.target.files[0];
      console.log(this.userChange);
    },
    selectArticlePic(event) {
      this.inputArticle.picture = event.target.files[0];
    },

    // GOOGLE API FUNCTION
    loadGAPI() {
      gapi.load("auth2", () => {
        auth2 = gapi.auth2.init({
          client_id:
            "647848106811-cm0ck452dmhg5b8g38n0dh2bu8ovv7hh.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin"
        });

        if (this.isOnPage === "login") {
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
        }
        auth2.isSignedIn.listen(this.renderGoogleButton);
      });

      if (this.isOnPage === "login") {
        this.renderGoogleButton();
      }
      this.userChange = {};
    },
    renderGoogleButton() {
      gapi.signin2.render("g-signin2", {
        scope: "profile email",
        longtitle: true,
        theme: "light",
        onsuccess: this.googlelogin
      });
    },

    // CK EDITOR RELATED
    load_editor() {
      var toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"] // remove formatting button
      ];
      if (document.querySelector("#editor")) {
        var quill = new Quill("#editor", {
          theme: "snow",
          toolbar: toolbarOptions
        });
        this.editor = quill;
        quill.on("text-change", function(delta, oldDelta, source) {
          vue.inputArticle.content = quill.getText();
          vue.inputArticle.rawHTML = quill.root.innerHTML;
        });

        if (this.inputArticle.rawHTML) {
          quill.root.innerHTML = this.inputArticle.rawHTML;
        }
      }
    },

    // ARTICLE RELATED FUNCTION
    newArticle(type) {
      console.log(type, "new article");
      let quill = this.editor;
      let text = quill.getText();
      console.log(text, "TEXT ===========================");
      let rawHTML = quill.root.innerHTML;
      console.log(rawHTML, "HTML ===========================");
    },
    addTag() {
      if (this.inputTag !== "") {
        if (!this.inputArticle.tags) {
          this.inputArticle.tags = [];
        }
        if (this.inputArticle.tags.length >= 5) {
          swal("you can only add 5 tags per article");
        } else {
          let tags = this.inputArticle.tags;
          let input = this.inputTag;
          if (input.match(/^[A-Za-z]+$/)) {
            if (tags.indexOf(input) === -1) {
              if (input.length > 12 || input.length < 3) {
                swal("Tags should consists of 3 - 12 characters");
              } else {
                this.inputArticle.tags.push(input.toLowerCase());
              }
            }
          } else {
            swal(
              "Tags shouldnt contain any number, special character, and spaces!"
            );
          }
        }
        this.inputTag = "";
      }
    },
    removeTag(tag) {
      let tags = this.inputArticle.tags;
      let index = tags.indexOf(tag);
      if (index >= 0) {
        tags.splice(index, 1);
      }
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
      setTimeout(() => {
        this.load_editor();
      }, 100);
    },
    page_editarticle() {
      this.isOnPage = this.pages[4];
      this.loadGAPI();
      setTimeout(() => {
        this.load_editor();
      }, 100);
    },
    page_register() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[5];
    },
    page_login() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[6];
      setTimeout(() => {
        this.loadGAPI();
      }, 100);
    },
    page_login_afterregister() {
      this.r_inputLoginRegister_afterregister();
      this.isOnPage = this.pages[6];
      setTimeout(() => {
        this.loadGAPI();
      }, 100);
    },
    page_setting() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[7];
      this.loadGAPI();
    }
  }
});
