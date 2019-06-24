
let app = new Vue({
    el: '#app',
    data: {
        articles: [],
        filtered: [],

        allArticles: [],
        filteredAllArticles: [],

        show: "",

        search: "",
        searchAllArticle: "",

        searchTag: "",
        searchAllTag: "",

        currentTag: "",
        currentTagEdit: "",

        isLogin: false,
        loginInput: {
            email: "",
            password: ""
        },
        registerInput: {
            name: "",
            email: "",
            password: ""
        },
        loginUser: {
            _id: "",
            name: "",
            email: "",
        },
        newArticle: {
            title: "",
            content: "",
            image: null,
            tags: []
        },
        editedArticle: {
            title: "",
            content: "",
            image: null,
            tags: []
        },
        loading: false
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,

    },
    created: function () {
        if (localStorage.token) {
            this.isLogin = true
            this.show = "allArticle"
            this.getArticles()
            this.getAllArticles()
        } else {
            this.showLogin()
        }
    },
    // mounted() {
    //   gapi.signin2.render('google-signin-button', {
    //     onsuccess: this.onSignIn
    //   })
    // },
    methods: {
        addTagEdit() {
            this.editedArticle.tags.push(this.currentTagEdit)
        },
        removeTagEdit(tag) {
            this.editedArticle.tags.splice(this.editedArticle.tags.indexOf(tag), 1)
        },
        removeTag(tag) {
            this.newArticle.tags.splice(this.newArticle.tags.indexOf(tag), 1)
        },
        addTag() {
            this.newArticle.tags.push(this.currentTag)
        },
        uploadImage(event) {
            this.newArticle.image = event.target.files[0]
        },
        changeImage(event) {
            this.editedArticle.image = event.target.files[0]
        },
        submitLogin() {
            axios({
                url: `http://localhost:3000/user/signIn`,
                method: "POST",
                data: {
                    email: this.loginInput.email,
                    password: this.loginInput.password
                }
            })
                .then(({ data }) => {
                    localStorage.token = data.token
                    this.isLogin = true
                    this.loginUser = {
                        _id: data._id,
                        name: data.name,
                        email: data.email
                    }
                    this.show = "allArticle"
                    this.getArticles()
                    this.getAllArticles()
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getAllArticles() {
            axios({
                url: `http://localhost:3000/post/`,
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.allArticles = data.filter(el => {
                        el.createdAt = new Date(el.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        if (el.title.includes(this.searchAllArticle)) {
                            return el
                        }
                    })
                    this.filteredAllArticles = this.allArticles
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getArticles() {
            axios({
                url: `http://localhost:3000/post/findMine`,
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.articles = data.filter(el => {
                        console.log(el, '----')
                        el.createdAt = new Date(el.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        if (el.title.includes(this.search)) return el
                    })
                    this.filtered = this.articles
                })
                .catch(err => {
                    console.log(err);
                })
        },
        submitRegister() {
            axios({
                url: `http://localhost:3000/user/register`,
                method: "POST",
                data: {
                    name: this.registerInput.name,
                    email: this.registerInput.email,
                    password: this.registerInput.password
                }
            })
                .then(({ data }) => {
                    this.registerInput = {
                        name: "",
                        email: "",
                        password: ""
                    }
                    this.loginInput = {
                        email: "",
                        password: ""
                    }
                    this.show = "loginForm"
                })
                .catch(err => {
                    console.log(err)
                })
        },
        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.removeItem('token');
            this.isLogin = false;
            this.loginUser = {
                _id: "",
                name: "",
                email: "",
            }
            this.show = "loginForm";
        },
        showLogin() {
            this.show = "loginForm"
        },
        showRegister() {
            this.show = 'registerForm'
        },
        showAllArticle() {
            this.show = "allArticle";
        },
        showPostArticle() {
            this.show = "postArticle";
        },
        showListArticle() {
            this.show = "listArticle";
        },
        showEditArticle(id) {
            this.show = "editArticle";
        },
        createArticle() {
            console.log('masuk create')
            if (!this.newArticle.title) this.newArticle.title = "Untitled"
            this.show = ""
            this.loading = true
            axios({
                url: `http://localhost:3000/post`,
                method: "POST",
                data: {
                    title: this.newArticle.title,
                    content: this.newArticle.content,
                    image: this.newArticle.image,
                    tags: this.newArticle.tags
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    data.createdAt = new Date(data.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    this.loading = false
                    this.filtered.push(data)
                    this.filteredAllArticles.push(data)
                    this.show = 'listArticle'
                    this.newArticle = {
                        title: "",
                        content: "",
                        image: null,
                        tags: []
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deleteArticle(id) {
            axios({
                url: `http://localhost:3000/post/${id}`,
                method: "DELETE",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.filtered = this.filtered.filter(el => {
                        if (el._id !== data._id) return el
                    })
                    this.filteredAllArticles = this.filteredAllArticles.filter(el => {
                        if (el._id !== data._id) return el
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        },
        toEditPage(id) {
            axios({
                url: `http://localhost:3000/post/${id}`,
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.editedArticle = data
                    this.show = "editArticlePage"
                })
                .catch(err => {
                    console.log(err);
                })
        },
        editArticle(id) {
            if (!this.editedArticle.title) this.editedArticle.title = "Untitled"

            this.show = ""

            axios({
                url: `http://localhost:3000/post/${id}`,
                method: "PATCH",
                data: {
                    title: this.editedArticle.title,
                    content: this.editedArticle.content,
                    image: this.editedArticle.image,
                    tags: this.editedArticle.tags
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    data.createdAt = new Date(data.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    this.loading = false

                    this.filtered = this.filtered.map(el => {
                        if (el._id === id) el = data
                        return el
                    });
                    this.articles = this.filtered
                    this.filteredAllArticles = this.filteredAllArticles.map(el => {
                        if (el._id === id) el = data
                        return el
                    })
                    this.allArticles = this.filteredAllArticles
                    this.show = "listArticle"
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    watch: {
        search: function (value) {
            if (value === "") {
                this.filtered = this.articles
            } else {
                this.filtered = this.articles.filter(el => {
                    if (el.title.toLowerCase().includes(value.toLowerCase())) {
                        return el
                    }
                })
            }
        },
        searchAllArticle: function (value) {
            if (value === "") {
                this.filteredAllArticles = this.allArticles
            } else {
                this.filteredAllArticles = this.filteredAllArticles.filter(el => {
                    if (el.title.toLowerCase().includes(value.toLowerCase())) {
                        return el
                    }
                })
            }
        },
        searchTag: function (value) {
            if (value === "") {
                this.filtered = this.articles
            } else {
                this.filtered = this.articles.filter(el => {
                    let include = false
                    el.tags.forEach(tag => {
                        if (tag.toLowerCase().includes(value.toLowerCase())) include = true
                    });
                    if (include === true) return el
                })
            }
        },
        searchAllTag: function (value) {
            if (value === "") {
                this.filteredAllArticles = this.allArticles
            } else {
                this.filteredAllArticles = this.allArticles.filter(el => {
                    let include = false
                    el.tags.forEach(tag => {
                        if (tag.toLowerCase().includes(value.toLowerCase())) include = true
                    });
                    if (include === true) return el
                })
            }
        }
    }
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    axios({
        url: `http://localhost:3000/user/googleSignIn`,
        method: "POST",
        headers: {
            access_token: id_token
        }
    })
        .then(({ data }) => {
            localStorage.setItem('token', data.token)
            app.isLogin = true
            app.loginUser = {
                _id: data._id,
                name: data.name,
                email: data.email
            }
            app.getArticles()
            app.getAllArticles()
            app.show = "allArticle"
        })
        .catch(err => {
            console.log(err);
        })
}