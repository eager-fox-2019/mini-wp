<template>
    <div>
        <header>
            <nav class="navbar navbar-dark fixed-top" style="background-color:#0073aa; padding: 0;">
                <navleft @to-published-page="toPublishedPage"></navleft>
                <navright @user-logout="userLogout"
                    @user-login="userLogin"
                    @to-register="toRegister"
                    @user-register="userRegister"
                    @to-login="toLogin"
                ></navright>
            </nav>
        </header>
        
        <!-- <main>
            <div class="middle">
                <div class="sidenav">
                    <a href="#" @click.prevent="toPublishedPage"><i class="fas fa-columns"></i>Articles</a>
                    <a v-show="isLogin" href="#" @click.prevent="toPersonalPostPage"><i class="fas fa-signature"></i>Your Articles</a>
                    <a v-show="isLogin" href="#" @click.prevent="toDraftPage"><i class="fas fa-pencil-alt"></i>Write Article</a>

                    <a href="#"><i class="fas fa-chart-bar"></i>Stats</a>
                    <a href="#"><i class="fas fa-columns"></i>Plan</a>
                    <a href="#" data-toggle="collapse" data-target="#site-side"><i class="fas fa-pencil-alt"></i>Site</a>
                    <div id="site-side" class="collapse">
                        <ul>
                            <li><a href="#" @click="toPublishedPage">Pages</a></li>
                            <li><a href="#" id="posts" @click="toPersonalPostPage">Posts</a></li>
                            <li><a href="#">Media</a></li>
                            <li><a href="#">Comments</a></li>
                            <li><a href="#">Feedback</a></li>
                        </ul>
                    </div>
                    <a href="#" data-toggle="collapse" data-target="#design-side"><i class="fas fa-signature"></i>Design</a>
                    <div id="design-side" class="collapse">
                        <ul>
                            <li><a href="#">Customize</a></li>
                            <li><a href="#">Themes</a></li>
                        </ul>
                    </div> 
                    <a href="#" data-toggle="collapse" data-target="#tools-side"><i class="fas fa-wrench"></i>Tools</a>
                    <div id="tools-side" class="collapse">
                        <ul>
                            <li><a href="#">Plugins</a></li>
                            <li><a href="#">Import</a></li>
                            <li><a href="#">Export</a></li>
                            <li><a href="#">Marketing</a></li>
                            <li><a href="#">Earn</a></li>
                            <li><a href="#">Activity</a></li>
                        </ul>
                    </div>
                    <a href="#" data-toggle="collapse" data-target="#manage-side"><i class="fas fa-cog"></i>Manage</a>
                    <div id="manage-side" class="collapse">
                        <ul>
                            <li><a href="#">Domains</a></li>
                            <li><a href="#">People</a></li>
                            <li><a href="#">Settings</a></li>
                        </ul>
                    </div>
                </div>

                <div class="article-container d-flex justify-content-center align-items-center">
                    <div v-show="loadPage === 'published'">
                        <div class="container-nav">
                            <div v-show="onSearch === false" style="display: flex">
                                <div>
                                    <div class="container-nav-link">
                                        <a @click.prevent="toPublishedPage">Published</a>
                                    </div>
                                    <div class="container-nav-link">
                                        <a @click.prevent="toDraftPage">Drafts</a>
                                    </div>
                                </div>
                            </div>
                            <div v-show="onSearch" style="width: 100%">
                                <div class="md-form">
                                    <input v-model="searchText" class="form-control" type="text" placeholder="Search" aria-label="Search">
                                </div>
                            </div>
                            <div class="container-nav-link">
                                <i @click="changeSearch" class="fas fa-search" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="container-post">
                            <div class="articles">
                                <div class="card align-items-*-center" v-for="post in filteredList">
                                    <img class="card-img-top" v-bind:src="post.imgUrl" alt="Image">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ post.title }}</h5>
                                        <div class="card-text" v-html="shortText(post.content)"></div>
                                        <button @click="readMore(post._id)" class="btn btn-primary">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="loadPage === 'privatepost'">
                        <div class="container-nav">
                            <div v-show="onSearch === false" style="display: flex">
                                <div>
                                    <div class="container-nav-link">
                                        <a @click.prevent="toPublishedPage">Published</a>
                                    </div>
                                    <div class="container-nav-link">
                                        <a @click.prevent="toDraftPage">Drafts</a>
                                    </div>
                                </div>
                            </div>
                            <div v-show="onSearch">
                                <div class="md-form mt-0">
                                    <input v-model="searchText" class="form-control" type="text" placeholder="Search" aria-label="Search">
                                </div>
                            </div>
                            <div class="container-nav-link">
                                <i @click="changeSearch" class="fas fa-search" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="container-post">
                            <div class="articles">
                                <div class="card align-items-*-center" v-for="post in privateFilteredList">
                                    <img class="card-img-top" v-bind:src="post.imgUrl" alt="Image">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ post.title }}</h5>
                                        <div class="card-text" v-html="shortText(post.content)"></div>
                                        <button @click="readMore(post._id)" class="btn btn-primary">Read more</button>
                                        <button @click="beforeEdit(post._id)" class="btn btn-warning">Edit</button>
                                        <button @click="deleteArticle(post._id)" class="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="loadPage === 'draft' || loadPage === 'edit-mode'">
                        <form style="height: 80%; width:80%" enctype="multipart/form-data">
                            <label for="title"><b>Title</b></label>
                            <input v-model="newTitle" type="text" class="form-control" placeholder="Enter title" name="title" id="title" required><br>
                            <label for="newImgUrl">Choose feature image:</label>
                            <img id="imgShow" v-bind:src="uploadImg" alt="your image" />
                            <input type="file" class="form-control" placeholder="Browse an image"
                                id="imgUrl" name="imgUrl" v-on:change="readURL"
                                accept="image/png, image/jpeg">
                            <label for="imgUrl"><b>Image Url</b></label>
                            <input v-model="newImgUrl" type="text" class="form-control" placeholder="Enter url" name="imgUrl" id="imgUrl"><br>
                            <editor v-model="newPost" api-key="5t9c5vfi2kk6s9yazv87rfciyj6b720adar1ephqweq14uhp" :init="{plugins: 'wordcount'}">Write here</editor>
                            <br>
                            <div v-show="loadPage === 'draft'">
                                <button @click.prevent="postArticle" class="btn btn-primary">Publish</button>
                            </div>
                            <div v-show="loadPage === 'edit-mode'">
                                <button @click.prevent="afterEdit" class="btn btn-primary">Update</button>
                                <button @click.prevent="deleteArticle(selectedArticle._id)" class="btn btn-danger">Delete</button>
                            </div>
                        </form>
                    </div>

                    <div v-show="loadPage === 'read-more'">
                        <div class="container-post">
                            <div class="articles">
                                <div class="card align-items-*-center">
                                    <img class="card-img-top-display" v-bind:src="selectedArticle.imgUrl" alt="Image">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ selectedArticle.title }}</h5>
                                        <div class="card-text" v-html="selectedArticle.content"></div>
                                        <button @click.prevent="toPublishedPage" class="btn btn-primary">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main> -->


        <footer class="page-footer font-small fixed-bottom" style="position: relative; background-color: #22344B; padding: 3rem">
            <foot></foot>
        </footer>
    </div>
</template>
<script>
import navleft from './components/navleft.vue';
import navright from './components/navright.vue';
import foot from './components/foot.vue';
export default {
    data() {
        return {
            isLogin: false,
            usersign: 'login',
            userName: '',
            userEmail: '',
            userPsw: '',
            loadPage: 'published'
        }
    },
    components: {
        navleft,
        navright
    },
    methods:{
        toPublishedPage(){
            console.log("Masuk fungsi toPublishedPage")
            this.loadPage = 'published' // klik root 1x untuk cek hasil
        },
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
            // googleSignOut()
            // var auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     console.log('User (Google Account) signed out.');
            // });
            this.toPublishedPage()
            this.isLogin = false
            this.usersign = 'login'
            Swal.fire({
                title: 'Success!',
                text: `Success logout`,
                type: 'success',
                showConfirmButton: false
            })
        },
    }
}
</script>
<style>
    *{
        margin: 0;
        padding: 0;
    }

    html{
        height: 100%;
    }

    body{
        margin:0;
        height: 100%;
    }

    #app{
        display: flex;
        flex-flow: column nowrap;
    }

    .article-container{ 
        height:100%;
        width:80%;
        background: rgba(111,147,173, 0.1);
        margin-left:20%;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .container-nav{
        margin: 50px auto;
        width: 1000px;
        padding: 10px;
        background-color: white;
        display: flex;
        justify-content: space-between;
    }

    .container-nav-link{
        flex-wrap: wrap;
        display: inline-block;
        height: 50px;
        width: 100px;
        line-height: 50px;
        padding-left: 20px;
    }

    .container-nav-search{
        display: inline-block;
        height: 50px;
        width: 90%;
        line-height: 50px;
        padding-left: 20px;
        flex-grow: 8;
    }

    .container-nav-link :hover{
        border-bottom: #0073aa
    }

    .container-post{
        align-content: center;
    }

    .card{
        width: 1000px;
    }

    nav{
        background-color: #0073aa;
    }

    .nav-elm{
        justify-content: space-evenly;
    }

    .sidenav {
        height: 100%;
        width: 270px;
        position: fixed;
        z-index: 1;
        left: 0;
        background-color: white;
        overflow: auto;
        flex: 2;
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }
    
    .sidenav a:hover {
        color: #f1f1f1;
    }

    .sidenav i{
        width:20%;
    }

    .content{
        display: inline-block;
        vertical-align: top;
        height: 100%;
        width: 82%;
        overflow: auto;
        background: rgba(111,147,173, 0.1);
    }

    .card-img-top{
        height: 500px;
    }

    .card-img-top-display{
        height: 100%;
        width: 100%;
    }

    .card{
        margin-bottom: 40px;
    }

    .fa {
        padding: 20px;
        font-size: 30px;
        width: 30px;
        text-align: center;
        text-decoration: none;
        border-radius: 50%;
        background: gray;
        color: white;
    }

    .fa:hover {
        opacity: 0.7;
    }

    footer {
        flex-shrink: 0;
        height: 10rem;
        position: relative;
        padding: 3rem;
        right: 0;
        bottom: 0;
        padding: 1rem;
        background-color: #22344B;
        text-align: center;
    }
</style>