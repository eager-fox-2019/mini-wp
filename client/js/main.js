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
            img: "",
            createdAt: "",
            author: "",
            tags: [],
            comments: []
        },
        listArticles: [],
        listArticlesUser: [],
        searchInput: ""
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "v-tags-input": VoerroTagsInput
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
        },
        register(){
            let data = {
                userName : this.user.userName,
                email: this.user.email,
                password: this.user.password
            }
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
            axios({
                method: "GET",
                url: `${baseURL}/articles`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                this.listArticles = data
                for(let i = 0; i < data.length; i++){
                    this.listArticles[i].createdAt = data[i].createdAt.substr(0, 10).split('-').reverse().join('-')
                }
            })
            .catch(err => {
                swal({
                    title: "Get Articles Error",
                    icon: "../assets/2.gif",
                })
            })
        },
        fetchArticleUser(){
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
            let img
            if (this.article.img == ""){
                img = "../../assets/nopic.png"
            }else{
                img = this.article.img
            }
            let input = new FormData()
            input.append("title", this.article.title)
            input.append("content", this.article.content)
            input.append("image", img)
            input.append("tags", this.article.tags)

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
                    // text: err.response.data.message,
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
                    text: err.response.data.message,
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
                    img: this.article.img, 
                    tags: this.article.tags
                }
            }else{
                input = new FormData()
                input.append("title", this.article.title)
                input.append("content", this.article.content)
                input.append("image", this.article.img)
                input.append("tags", this.article.tags)
            }

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
                    text: err.response.data.message,
                    icon: "../assets/2.gif",
                })
            })
        },
        getEditArticle(id){
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
                this.article.tags = data.tags
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
                this.article.createdAt = data.createdAt.substr(0, 10).split('-').reverse().join('-')
                this.article.author = 'rudy'
                this.article.tags = data.tags
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
            document.getElementById("previewimg").style.display = "block";
            var oFReader = new FileReader();
                oFReader.readAsDataURL(document.getElementById("upload").files[0]);
            
            oFReader.onload = function(oFREvent) {
                document.getElementById("previewimg").src = oFREvent.target.result;
            }
        },
        searchtag(tag){
            axios({
                method: "GET",
                url: `${baseURL}/articles/tags/${tag}`,
                headers:{
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                this.listArticles = data
                this.mainStatus = "articleList"
            })
            .catch(err => {
                swal({
                    title: "Get Articles Error",
                    icon: "../assets/2.gif",
                })
            })
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