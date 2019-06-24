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
        selectedArticle: {},
        uploadImg: "http://www.jaipuriaschoolkanpurroad.in/gorakhpur-website/wp-content/uploads/2016/11/blank-img.jpg"
    },
    created(){
        if(localStorage.getItem("token")){
            this.isLogin = true
            this.usersign = 'logout'
            this.getPersonalArticle()
        }
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
                    Swal.fire({
                        title: 'Success!',
                        text: `New Account Created`,
                        type: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.clearUserForm()
                })
                .catch(err => {
                    console.log("Error from userRegister: ", err)
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'Cool'
                    })
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
                    Swal.fire({
                        title: 'Success!',
                        text: `Success login`,
                        type: 'success',
                        showConfirmButton: false
                    })
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("username", data.username)
                    this.clearUserForm()
                    this.isLogin = true
                    this.usersign = 'logout'
                    this.getPersonalArticle()
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
                })
        },
        userLogout(){
            localStorage.clear()
            googleSignOut()
            this.isLogin = false
            this.usersign = 'login'
            Swal.fire({
                title: 'Success!',
                text: `Success logout`,
                type: 'success',
                showConfirmButton: false
            })
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
                    console.log(data[0])
                })
                .catch(err => {
                    console.log("Error from getArticle: ", err)
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
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
                    data.sort(function(a,b){
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                    });
                    this.listPersonalArticles = data
                })
                .catch(err => {
                    console.log("Error from getPersonalArticle: ", err)
                })
        },
        readURL(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
                this.newImgUrl = files[0]
            this.uploadImg = URL.createObjectURL(file);
        },
        postArticle(){
            let formData = new FormData();
            formData.set("title", this.newTitle);
            formData.append("imgUrl", this.newImgUrl);
            formData.set("content", this.newPost);
            axios({
                method: "POST",
                url: `http://localhost:3000/article/create`,
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                },
                config: { headers: {'Content-Type': 'multipart/form-data' }}
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
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
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
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
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
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
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
                    Swal.fire({
                        title: 'Error!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
                })
        },
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
            debugger
            let profile = googleUser.getBasicProfile();
            localStorage.setItem('token', data.token);
            localStorage.setItem("username", profile.getName())
            app.isLogin = true
            app.usersign = 'logout'     
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

// function facebookSignIn() {
//     FB.login(function(response) {
//         if (response.authResponse) {
//          console.log('Welcome!  Fetching your information.... ');
//          FB.api('/me', function(response) {
//            console.log('Good to see you, ' + response.name + '.');
//          });
//         } else {
//          console.log('User cancelled login or did not fully authorize.');
//         }
//     });
// }

// function facebookLoginStatus(){
//     FB.getLoginStatus(function(response) {
//         if (response.status === 'connected') {
//           console.log(response.authResponse.accessToken);
//         }
//     });
// }