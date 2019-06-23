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
                    v-bind:isLoginProps="isLogin"
                    v-bind:usersignProps="usersign"
                    v-bind:userNameProps="userName"
                    v-bind:userEmailProps="userEmail"
                    v-bind:userPswProps="userPsw"
                ></navright>
            </nav>
        </header>
        
        <!-- <main>
            <div class="middle">
                <div class="sidenav"> -->
                    <!-- <a href="#" @click.prevent="toPublishedPage"><i class="fas fa-columns"></i>Articles</a>
                    <a v-show="isLogin" href="#" @click.prevent="toPersonalPostPage"><i class="fas fa-signature"></i>Your Articles</a>
                    <a v-show="isLogin" href="#" @click.prevent="toDraftPage"><i class="fas fa-pencil-alt"></i>Write Article</a> -->

                    <!-- <a href="#"><i class="fas fa-chart-bar"></i>Stats</a>
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
                                accept="image/png, image/jpeg"> -->
                            <!-- <label for="imgUrl"><b>Image Url</b></label>
                            <input v-model="newImgUrl" type="text" class="form-control" placeholder="Enter url" name="imgUrl" id="imgUrl"><br> -->
                            <!-- <editor v-model="newPost" api-key="5t9c5vfi2kk6s9yazv87rfciyj6b720adar1ephqweq14uhp" :init="{plugins: 'wordcount'}">Write here</editor>
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
        </main>


        <footer class="page-footer font-small fixed-bottom" style="position: relative; background-color: #22344B; padding: 3rem">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="flex-center">
                            <a class="fb-ic" href="https://www.facebook.com/MelinA.Dew1" target="blank">
                                <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="li-ic" href="https://id.linkedin.com/in/melina-dewi-murjadi-097605142" target="blank">
                                <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="ins-ic" href="https://www.instagram.com/melinadm57/" target="blank">
                                <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright text-center" style="color: white; margin-top: 10px;">
                    © 2019 Copyright tidak sama dengan Copyleft
                </div>
            </div>
        </footer> -->
    </div>
</template>
<script>
import navleft from './components/navleft.vue';
import navright from './components/navright.vue';
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
    nav{
        background-color: #0073aa;
    }
    .nav-elm{
        justify-content: space-evenly;
    }
/* html, body, .contentwrapper{
    height: 100%;
    width: 100%;
}
.header {
    height: 10%
}
.maincontent {
    height: 90%
}
.sidebarwrapper{
    width: 20%;
    transition: width 0.5s;
}
.sidebarwrapper-closed{
    width: 0;
    transition: width 0.5s;
}
.content {
    overflow: auto;
    transition: width 0.5s;
}
.content-full {
    width: 100%;
}
.content-pushed {
    width: 80%;
} */
</style>