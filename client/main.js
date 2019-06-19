var app = new Vue({
    el: '#app',
    components: {
        'editor': Editor
    },
    data: {
        isLogin: false,
        usersign: 'login',
        // newUser: {},
        userName: '',
        userEmail: '',
        userPsw: '',
        loadPage: "published",
        listArticles: [],
        listPersonalArticles: [],
        newTitle: "",
        newPost: "",
        newImgUrl: "",
        onSearch: false,
        searchText: "",
        selectedArticle: {}
    },
    created(){
        axios({
            method: "GET",
            url: `http://localhost:3000/article`
        })
        .then(({data})=>{
            this.listArticles = data
            console.log(data)
        })
        .catch(err => {
            console.log("Error from created")
            console.log(err)
        })
    },
    methods: {
        // User
        clearUserForm(){
            this.userName = ''
            this.userEmail = ''
            this.userPsw = ''
        },
        toRegister(){
            this.usersign = 'register'
            this.clearUserForm()
        },
        toLogin(){
            this.usersign = 'login'
            this.clearUserForm()
        },
        userRegister(){
            axios({
                method: "POST",
                url: `http://localhost:3000/user/create`,
                data: {
                    username: this.userName,
                    email: this.userEmail,
                    password: this.userPsw
                }
            })
                .then(() => {
                    console.log("New Account Created")
                    this.clearUserForm()
                })
                .catch(err => {
                    console.log("Error from userRegister: ", err)
                })
        },
        userLogin(){
            axios({
                method: "POST",
                data: {
                    email: this.userEmail,
                    password: this.userPsw
                },
                url: `http://localhost:3000/user/login`
            })
                .then(({data})=> {
                    console.log("Berhasil login")
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("username", data.username)
                    this.clearUserForm()
                    this.isLogin = true
                    this.usersign = 'logout'
                    this.getPersonalArticle()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        userLogout(){
            localStorage.clear()
            // googleSignOut()
            this.isLogin = false
            this.usersign = 'login'
        },
        // Article
        getArticle(){
            axios({
                method: "GET",
                url: `http://localhost:3000/article`
            })
                .then(({data})=>{
                    data.sort(function(a,b){
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                    });
                    this.listArticles = data
                })
                .catch(err => {
                    console.log("Error from getArticle: ", err)
                })
        },
        getPersonalArticle(){
            axios({
                method: "GET",
                url: `http://localhost:3000/article/mypost`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    console.log("Get personal article", data)
                    data.sort(function(a,b){
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                    });
                    this.listPersonalArticles = data
                })
                .catch(err => {
                    console.log("Error from getPersonalArticle: ", err)
                })
        },
        postArticle(){
            axios({
                method: "POST",
                url: `http://localhost:3000/article/create`,
                data: {
                    title: this.newTitle,
                    imgUrl: this.newImgUrl,
                    content: this.newPost
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(() => {
                    this.getArticle()
                    this.getPersonalArticle()
                    this.newTitle = ""
                    this.newImgUrl = ""
                    this.newPost = ""
                    this.loadPage = 'published'
                })
                .catch(err => {
                    console.log("Error from postArticle: ", err)
                })
        },
        deleteArticle(id){
            axios({
                method: "DELETE",
                url: `http://localhost:3000/article/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(() => {
                    console.log("Delete success")
                    this.getArticle()
                    this.getPersonalArticle()
                    this.loadPage = 'published'
                })
                .catch(err => {
                    console.log("Error from deleteArticle: ", err)
                })
        },
        toDraftPage(){
            this.loadPage = 'draft'
        },
        toPublishedPage(){
            this.loadPage = 'published'
        },
        toPersonalPostPage(){
            this.loadPage = 'privatepost'
        },
        changeSearch(){
            if(this.onSearch === false){
                this.onSearch = true
            } else {
                this.onSearch = false
                this.searchText = ''
            }
        },
        readMore(id){
            axios({
                method: "GET",
                url: `http://localhost:3000/article/read/${id}`
            })
                .then(({data})=>{
                    console.log("Get data:", data)
                    this.selectedArticle = data
                    this.loadPage = 'read-more'
                })
                .catch(err => {
                    console.log("Error from readMore: ", err)
                })
        },
        shortText(text){
            // return text.split(' ').slice(0,10).join(' ')
            let data = text.split(' ')
            let data1 = data.slice(0,10).join(' ')
            if(data.length > 10){
                return data1 + ' ...'
            }
            return data1
        },
        beforeEdit(id){
            axios({
                method: "GET",
                url: `http://localhost:3000/article/edit/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    console.log("Get data:", data)
                    this.newTitle = data.title
                    this.newImgUrl = data.imgUrl
                    this.newPost = data.content
                    this.selectedArticle = data
                    this.loadPage = 'edit-mode'
                })
                .catch(err => {
                    console.log("Error from beforeEdit: ", err)
                })
        },
        afterEdit(id){
            axios({
                method: "PATCH",
                url: `http://localhost:3000/article/${this.selectedArticle._id}`,
                data: {
                    title: this.newTitle,
                    imgUrl: this.newImgUrl,
                    content: this.newPost
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(() => {
                    this.getArticle()
                    this.getPersonalArticle()
                    this.newTitle = ""
                    this.newImgUrl = ""
                    this.newPost = ""
                    this.loadPage = 'published'
                })
                .catch(err => {
                    console.log("Error from afterEdit: ", err)
                })
        }
    },
    computed: {
        filteredList() {
            return this.listArticles.filter(post => {
                let onlist = `${post.title} ${post.content}`
                return onlist.toLowerCase().includes(this.searchText.toLowerCase())
            })
        },
        privateFilteredList() {
            return this.listPersonalArticles.filter(post => {
                let onlist = `${post.title} ${post.content}`
                return onlist.toLowerCase().includes(this.searchText.toLowerCase())
            })
        }
    }
})


function onSignIn(googleUser) {
    var idToken = googleUser.getAuthResponse().id_token;
    axios.post(`http://localhost:3000/user/google`, { idToken:idToken })
        .then(function({ data }) {
            // IMPORTANT! Saves the accessToken from server
            let profile = googleUser.getBasicProfile();
            localStorage.setItem('token', data.token);
            localStorage.setItem("username", profile.fullName())
            this.isLogin = true
            this.usersign = 'logout'     
        })
        .catch(function(err) {
            console.log(err);
        });
}
function googleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User (Google Account) signed out.');
    });
}