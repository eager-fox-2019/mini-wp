// const ax = axios.create({
//   baseURL: 'http://localhost:3000',
//   headers: {
//       token: localStorage.token
//   }
// });

const baseURL = 'http://localhost:3000'

var app = new Vue({
    el: "#app",
    data: {
        pageStatus: "",
        search : false,
        mainStatus: "",
        user: {
            userName: "",
            email: "",
            password: ""
        },
        article: {
            id: "",
            title: "",
            desc: "",
            content: "",
            img: "../assets/miss.jpg",
            createdAt: "",
            comments: [],
            tags: []
        },
        listArticles: [],
        listArticlesUser: [],
        searchInput: ""
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods : {
        toRegis(){
            this.pageStatus = 'regis'
        },
        toLogin(){
            this.pageStatus = 'login'
        },
        searchButton(){
            if(this.search){
                this.search = false
            }else{
                this.search = true
            }
        },
        userArticle(){
            this.fetchArticleUser()
            this.mainStatus = 'userArticle'
        },
        newArticle(){
            this.mainStatus = 'newArticle',
            this.article = {
                id: "",
                title: "",
                content: "",
                img: "",
                createdAt: ""
            }
        },
        articleList(){
            this.fetchArticle()
            this.mainStatus = 'articleList'
            this.article = {
                id: "",
                title: "",
                content: "",
                img: "",
                createdAt: ""
            }
        },
        register(){
            let data = {
                userName : this.user.userName,
                email: this.user.email,
                password: this.user.password
            }
            // ax.post("/users/signup", data)
            axios({
                method: "POST",
                url: `${baseURL}/users/signup`,
                data: data
            })
            .then(({data}) => {
                swal({
                    title: "Register Success",
                    icon: "../assets/3.gif",
                })
                this.pageStatus = "login"
                this.user = {
                    userName: "",
                    email: "",
                    password: ""
                }
            })
            .catch(err => {
                swal({
                    title: err.response.data.message,
                    icon: "../assets/2.gif",
                })
            })
        },
        login(){
            let data = {
                email: this.user.email,
                password: this.user.password
            }
            // ax.post("/users/signin", data)
            axios({
                method: "POST",
                url: `${baseURL}/users/signin`,
                data: data
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userName', data.userName)
                swal({
                    title: "Login Success",
                    icon: "../assets/3.gif",
                })
                this.pageStatus = "home"
                this.articleList()
                this.user = {
                    userName: "",
                    email: "",
                    password: ""
                }
            })
            .catch(err => {
                swal({
                    title: err.response.data.message,
                    icon: "../assets/2.gif",
                })
            })
        },
        logout(){
            swal({
                title: "Are you sure?",
                text: "We will miss you",
                icon: "../assets/1.gif",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    localStorage.clear()
                    swal("We hope to see you again", {
                        icon: "../assets/2.gif",
                    });
                    this.pageStatus = "login"
                    this.mainStatus = ""
                } else {
                    swal("It's good to have you here",{
                        icon: "../assets/3.gif",
                    });
                }
            });
        },
        userData(){
            swal({
                icon: "../assets/3.gif",
                title: "Hi, " + localStorage.getItem('userName')
            })
        },
        fetchArticle(){
            // ax.get("/articles")
            axios({
                method: "GET",
                url: `${baseURL}/articles`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                this.listArticles = data
            })
            .catch(err => {
                swal({
                    title: "Get Articles Error",
                    icon: "../assets/2.gif",
                })
            })
        },
        fetchArticleUser(){
            // ax.get("/articles/users")
            axios({
                method: "GET",
                url: `${baseURL}/articles/users`,
                headers:{
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                this.listArticlesUser = data
            })
            .catch(err => {
                swal({
                    title: "Get Articles Error",
                    icon: "../assets/2.gif",
                })
            })
        },
        searchArticle(){
            // ax.get(`/articles/search/${this.searchInput}`)
            axios({
                method: "GET",
                url: `${baseURL}/articles/search/${this.searchInput}`,
                headers:{
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                if(data.length != 0){
                    this.listArticles = data
                    this.mainStatus = "articleList"
                    this.searchInput = ""
                }else{
                    swal({
                        title: "Article Not Found",
                        text: "Try Something Else",
                        icon: "../assets/2.gif",
                    })
                }
            })
            .catch(err => {
                swal({
                    title: "Article Not Found",
                    text: "Try Something Else !!!",
                    icon: "../assets/2.gif",
                })
            })
        },
        createArticle(){
            this.mainStatus = "loading"

            let input = new FormData()
            input.append("title", this.article.title)
            input.append("content", this.article.content)
            input.append("image", this.article.img)

            // ax.post(`/articles`, input)
            axios({
                method: "POST",
                url: `${baseURL}/articles`,
                data: input,
                headers: {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                swal({
                    title: "Success Create Article",
                    icon: "../assets/animation.gif",
                })
                this.userArticle()
            })
            .catch(err => {
                swal({
                    title: "Failed Create Article",
                    icon: "../assets/2.gif",
                })
                this.mainStatus = "newArticle"
            })
        },
        deleteArticle(id){
            axios({
                method: "DELETE",
                url: `${baseURL}/articles/${id}`,
                headers: {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                swal({
                    title: "Success Delete Article",
                    icon: "../assets/animation.gif",
                })
                this.fetchArticleUser()
            })
            .catch(err => {
                swal({
                    title: "Failed Delete Article",
                    icon: "../assets/2.gif",
                })
            })
        },
        confirmDeleteArticle(id){
            swal({
                title: "Are you sure?",
                text: "Once you delete it, It can't be restore",
                icon: "../assets/1.gif",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.deleteArticle(id)
                } else {
                    swal("Your article is save",{
                        icon: "../assets/3.gif",
                    });
                }
            });
        },
        editArticle(id){
            this.mainStatus = "loading"

            let input = ""
            if (typeof(this.article.img) == "string"){
                input = {
                    title : this.article.title,
                    content : this.article.content,
                    img: this.article.img 
                }
            }else{
                input = new FormData()
                input.append("title", this.article.title)
                input.append("content", this.article.content)
                input.append("image", this.article.img)
            }

            // ax.post(`/articles`, input)
            axios({
                method: "PATCH",
                url: `${baseURL}/articles/${id}`,
                data: input,
                headers: {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                swal({
                    title: "Success Update Article",
                    icon: "../assets/animation.gif",
                })
                this.userArticle()
            })
            .catch(err => {
                swal({
                    title: "Failed Update Article",
                    icon: "../assets/2.gif",
                })
                this.mainStatus = "newArticle"
            })
        },
        getEditArticle(id){
            // ax.post(`/articles`, input)
            axios({
                method: "GET",
                url: `${baseURL}/articles/${id}`,
                headers: {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                this.mainStatus = 'editArticle'
                this.article.id = data._id
                this.article.title = data.title
                this.article.content = data.content
                this.article.img = data.img
            })
            .catch(err => {
                swal({
                    title: "Failed Get Article",
                    icon: "../assets/2.gif",
                })
            })
        },
        viewArticle(id){
            axios({
                method: "GET",
                url: `${baseURL}/articles/${id}`,
                headers: {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                this.mainStatus = 'detailArticle'
                this.article.id = data._id
                this.article.title = data.title
                this.article.content = data.content
                this.article.img = data.img,
                this.article.createdAt = data.createdAt
            })
            .catch(err => {
                swal({
                    title: "Failed Get Article",
                    icon: "../assets/2.gif",
                })
            })
        },
        selectImage(event){
            this.article.img = event.target.files[0]
        },
        onSignGoogle(data) {
            console.log('masuk google', data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.userName)
            swal({
                title: "Login Success",
                icon: "../assets/3.gif",
            })
            this.pageStatus = "home"
            this.articleList()
            this.user = {
                userName: "",
                email: "",
                password: ""
            }
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.pageStatus = "home",
            this.articleList()
            // this.mainStatus = "loading"
        }else{
            // this.mainStatus = "newArticle"
            // this.pageStatus = "home"
            this.pageStatus = "regis"
        }
    },
})

function onSignIn(googleUser) {
    var idToken = googleUser.getAuthResponse().id_token;

    axios({
        method: "POST",
        url: `${baseURL}/users/googlesignin`,
        data: {
            idToken
        }
    })
    .then(({data}) => {
        console.log("masuk", data)
        app.onSignGoogle(data)
    })
    .catch(err => {
        swal({
            title: "Login Error",
            icon: "../assets/2.gif",
        })
    })
}