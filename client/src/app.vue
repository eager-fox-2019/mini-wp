<template>
  <div class="h-100">
    <loginpage
      :ax="ax"
      :input="inputLoginRegister"
      class="h-100 d-flex align-items-center"
      v-if="isLogin == false && isOnPage == 'login'"
      @pindah_register="page_register"
      @berhasil_login="checkLogin"
      @load="page_login"
    ></loginpage>

    <registerpage
      :ax="ax"
      :input="inputLoginRegister"
      class="h-100 d-flex align-items-center"
      v-if="isLogin == false && isOnPage == 'register'"
      @pindah_login="page_login"
      @pindah_login_afteregister="page_login_afterregister"
    ></registerpage>

    <navbar
      v-if="isLogin"
      :isOnPage="isOnPage"
      @berhasil_logout="checkLogin"
      @pindah_articles="page_articles"
      @pindah_myarticles="page_myarticles"
      @pindah_setting="page_setting"
      @pindah_newarticle="page_newarticle"
    ></navbar>

    <articlespage
      v-if="isLogin === true && isOnPage =='articles'"
      @edit="page_editarticle"
      @view="page_detailarticle"
      :ax="ax"
    ></articlespage>

    <myarticlespage
      v-if="isLogin === true && isOnPage =='myarticles'"
      @edit="page_editarticle"
      @view="page_detailarticle"
      :ax="ax"
    ></myarticlespage>

    <settingpage v-if="isLogin === true && isOnPage =='setting'" :ax="ax"></settingpage>

    <newarticlepage class="px-5 pt-5" v-if="isLogin === true && isOnPage =='newarticle'" :ax="ax"></newarticlepage>

    <editarticlepage
      class="px-5 pt-5"
      v-if="isLogin === true && isOnPage =='editarticle'"
      :selectedArticle="selectedArticle"
      :ax="ax"
    ></editarticlepage>

    <viewarticlepage
      class="px-5 pt-5"
      @myarticles="page_myarticles"
      @edit="page_editarticle"
      @view="page_detailarticle"
      v-if="isLogin === true && isOnPage =='detailarticle'"
      :selectedArticle="selectedArticle"
      :ax="ax"
    ></viewarticlepage>
  </div>
</template>

<script>
import registerpage from "./components/registerpage";
import loginpage from "./components/loginpage";
import navbar from "./components/navigationbar";
import articlespage from "./components/articles";
import myarticlespage from "./components/myarticles";
import settingpage from "./components/settingpage";
import newarticlepage from "./components/newarticle";
import viewarticlepage from "./components/viewarticle";
import editarticlepage from "./components/editarticle";
import axios from "axios";

export default {
  data() {
    return {
      ax: undefined,
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
      isOnPage: undefined,
      isLogin: undefined,
      inputLoginRegister: {
        name: "",
        email: "",
        password: ""
      },
      selectedArticle: {}
    };
  },
  components: {
    registerpage,
    loginpage,
    navbar,
    articlespage,
    myarticlespage,
    settingpage,
    newarticlepage,
    viewarticlepage,
    editarticlepage
  },
  created() {
    const serverURL = "http://localhost:3000";
    this.ax = axios.create({
      baseURL: serverURL,
      headers: {
        token: localStorage.getItem("token")
      }
    });
  },

  mounted() {
    this.checkLogin();
    if (localStorage.getItem("isOnPage")) {
      this.isOnPage = localStorage.getItem("isOnPage");
    }
  },

  methods: {
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
      swal("Account Created", "Successfully created an account", "success");
    },

    // INITIAL CHECK
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
        this.page_login();
      }
    },

    // GOOGLE AUTH FUNCTION
    loadGAPI() {
      var auth2;
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
    },
    renderGoogleButton() {
      gapi.signin2.render("g-signin2", {
        scope: "profile email",
        longtitle: true,
        theme: "light",
        onsuccess: this.googlelogin
      });
    },
    googlelogin(googleUser) {
      console.log(googleUser);
      const idToken = googleUser.getAuthResponse().id_token;
      console.log(googleUser);
      this.ax({
        method: "POST",
        url: "/users/logingoogle",
        data: {
          idToken
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          swal(
            "Logged In",
            "If this is your first time log in, change your password by accessing Account tab above!",
            "info"
          );
          this.checkLogin();
        })
        .catch(err => {
          console.log(err, "error login google");
          console.log(JSON.stringify(err, null, 2));
        });
    },

    // MOVING BETWEEN PAGE FUNCTION
    page_articles() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[0];
      localStorage.setItem("isOnPage", this.pages[0]);
    },
    page_detailarticle(e) {
      this.r_inputLoginRegister();
      this.selectedArticle = e;
      console.log("di app ke detail article");
      this.isOnPage = this.pages[1];
      localStorage.setItem("isOnPage", this.pages[1]);
    },
    page_myarticles() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[2];
      localStorage.setItem("isOnPage", this.pages[2]);
    },
    page_newarticle() {
      this.r_inputLoginRegister();
      this.isOnPage = this.pages[3];
      localStorage.setItem("isOnPage", this.pages[3]);
    },
    page_editarticle(e) {
      this.r_inputLoginRegister();
      console.log("di app ke edit article");
      this.selectedArticle = e;
      this.isOnPage = this.pages[4];
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
      }, 200);
    },
    page_login_afterregister(emit) {
      this.r_inputLoginRegister_afterregister();
      this.isOnPage = this.pages[6];
      setTimeout(() => {
        this.loadGAPI();
      }, 200);
    },
    page_setting() {
      this.r_inputLoginRegister();
      localStorage.setItem("isOnPage", this.pages[7]);
      this.isOnPage = this.pages[7];
    }
  }
};
</script>
