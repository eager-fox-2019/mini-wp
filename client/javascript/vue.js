const url = `http://localhost:3000`

let app = new Vue({
    el: '#app',
    data: {
        home: false,
        create: false,
        articleStats: false,
        islogin: false,
        register: {
            email: "",
            password: ""
        },
        login: {
            email: "",
            password: ""
        },
        error: {
            register: "",
            login: ""
        },
        article: {
            title: "",
            content: "",
            image: "",
            tag: "",
        },
        articles: []
    },
    methods: {
        showHome(){
            if (this.islogin == true){
                localStorage.setItem("currentPage", "home")
                this.home = true
                this.create = false
                this.articleStats = false
            } else {
                this.showLogin()
            }
        },
        showCreate(){
            if (this.islogin == true){
                localStorage.setItem("currentPage", "create")
                this.home = false
                this.create = true
                this.articleStats = false
            } else {
                this.showLogin()
            }
        },
        showArticle(){
            if (this.islogin == true){
                localStorage.setItem("currentPage", "articleStats")
                this.home = false
                this.create = false
                this.articleStats = true
                this.readArticle()
            } else {
                this.showLogin()
            }
        },
        showLogin(){
            localStorage.setItem("currentPage", "login")
            this.register.email = ""
            this.register.password = ""
            this.login.email = ""
            this.login.password = ""
            this.home = false
            this.create = false
            this.articleStats = false
            this.islogin = false
        },
        userRegister(){
            this.error.register = ""
            axios({
                method:'POST',
                url:`${url}/register`,
                data: {
                    email: this.register.email,
                    password: this.register.password
                }
            })
            .then(({data}) => {
                showLogin()
            })
            .catch((error) => {
                this.error.register = `Error: ${error.response.data}`
            })
        },
        userLogin(){
            this.errorLogin = ""
            axios({
                method:'POST',
                url:`${url}/login`,
                data: {
                    email: this.login.email,
                    password: this.login.password
                }
            })
            .then(({data}) => {
                localStorage.setItem("token", data.token)
                this.islogin = true
                this.showHome()
            })
            .catch((error) => {
                this.error.login = `Error: ${error.response.data.message}`
            })
        },
        logout(){
            localStorage.clear()
            this.islogin = false
            this.showLogin()
        },
        createArticle(){
            axios({
                method:'POST',
                url:`${url}/home/`,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    title: this.article.title,
                    content: this.article.content,
                    image: this.article.image,
                    tag: this.article.tag
                }
            })
            .then(({data}) => {
                this.showArticle()
            })
            .catch((error) => {
                console.log(error.response.data)
            })
        },
        readArticle(){
            axios({
                method:'GET',
                url:`${url}/home/`,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(({data}) => {
                this.articles = data
                console.log(this.articles)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
        }
    },
    created() {
        if (localStorage.getItem("token")){
            this.islogin = true
            if (localStorage.currentPage == 'home'){
                this.showHome()
            } else if (localStorage.currentPage == 'articleStats'){
                this.showArticle()
            } else if (localStorage.currentPage == 'create'){
                this.showCreate()
            }
        } else {
            this.showLogin()
        }
    }
  });