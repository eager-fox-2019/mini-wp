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
            this.clearUserForm
        },
        toLogin(){
            this.usersign = 'login'
            this.clearUserForm
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
                    this.clearUserForm
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
                .then(function(res) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("username", res.username)
                    this.clearUserForm
                    isLogin = true
                    console.log("this.isLogin sekarang: ",this.isLogin);
                    this.usersign = 'logout'
                })
                .catch(err => {
                    console.log(err)
                })
        },
        userLogout(){
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            googleSignOut()
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
                        return new Date(a.updatedAt) - new Date(b.updatedAt);
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
                url: `http://localhost:3000/article/my-post`
            })
                .then(({data})=>{
                    data.sort(function(a,b){
                        return new Date(a.updatedAt) - new Date(b.updatedAt);
                    });
                    this.listArticles = data
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
                    id: this.listArticles[this.listArticles.length - 1].id + 1,
                    title: this.newTitle,
                    imgUrl: this.newImgUrl,
                    content: this.newPost
                }
            })
                .then(() => {
                    console.log("postArticle success")
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
                url: `http://localhost:3000/article/${id}`
            })
                .then(() => {
                    console.log("Delete success")
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
                url: `http://localhost:3000/article/${id}`
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
            return text.split(' ').slice(0,10).join(' ')
        },
        beforeEdit(id){
            axios({
                method: "GET",
                url: `http://localhost:3000/article/${id}`
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
                url: `http://localhost:3000/article/${this.selectedArticle.id}`,
                data: {
                    title: this.newTitle,
                    imgUrl: this.newImgUrl,
                    content: this.newPost
                }
            })
                .then(() => {
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