<template>
    <div>
         <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="position: fixed; z-index:2;right:0;left:0;">
                    <a class="navbar-brand" href="#"><b>HackPost</b></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
            
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
            
                        </ul>
                        <form v-on:submit.prevent="" class="form-inline my-2 my-lg-0">
                            <input  class="form-control mr-sm-2" type="text" id="searchInput" placeholder="Search" v-model="searchResult">
                        </form>
                    </div>
                </nav>

                    <!-- sidebarr -->
        <div class="row" id="body-row">
            <div id="sidebar-container" class="sidebar-expanded d-none d-md-block" style="display: none;">
                <ul class="list-group">
                    
                    <!-- login form -->
                    <section v-if="activePage === 'nologinuser'" id="loginthing">
                            <a  href="#submenu2" data-toggle="collapse" aria-expanded="false"
                            class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-start align-items-center">
                                <span class="mr-3"><i class="fas fa-user"></i></span>
                                <span class="menu-collapsed">Login</span>
                                <span class="ml-auto"><i class="fas fa-caret-down"></i></span>
                            </div>
                        </a>
                        <div  id='submenu2' class="collapse sidebar-submenu">
                                <form  v-on:submit.prevent="login()" class="mx-2 my-2 ">
                                        <div class="form-group ">
                                          <input v-model="emailLogin" type="email" class="form-control text-white" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email" style="background: none"> 
                                        </div>
                                        <div class="form-group">
                                          <input v-model="passwordLogin" type="password" class="form-control text-white" id="passwordLogin" placeholder="Password" style="background: none">
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block ">login</button>
                                    </form>
                                    <div style="color: white" class="text-center">
                                        <h6>OR</h6>
                                        <GoogleLogin type="button" class="btn btn-primary mt-2"  :onSuccess="onSuccess" :onFailure="onFailure"> <i class="fab fa-google mr-2"></i> Google SignIn</GoogleLogin>
                                    </div>
                        </div>
                    </section>
                    <!-- end login -->
                    
                    <!-- register -->
                    <section v-if="activePage === 'nologinuser'" id="registerthing">
                            <a  href="#submenu3" data-toggle="collapse" aria-expanded="false"
                        class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="mr-3"><i class="far fa-user"></i></span>
                            <span class="menu-collapsed">Register</span>
                            <span class="ml-auto"><i class="fas fa-caret-down"></i></span>
                        </div>
                    </a>
                    <div  id='submenu3' class="collapse sidebar-submenu">
                            <form  v-on:submit.prevent="register()" class="mx-2 my-2 ">
                                    <div class="form-group">
                                            <input v-model="first_nameRegister" type="text" class="form-control text-white" id="firstNameRegister" aria-describedby="emailHelp" placeholder=" First Name" style="background: none"> 
                                          </div>
                                          <div class="form-group">
                                            <input v-model="last_nameRegister" type="text" class="form-control text-white" id="lastNameRegister" placeholder="Last Name" style="background: none">
                                          </div>
                                    <div class="form-group">
                                      <input v-model="emailregister" type="email" class="form-control text-white" id="emailRegister" aria-describedby="emailHelp" placeholder=" email" style="background: none"> 
                                    </div>
                                    <div class="form-group">
                                      <input v-model="passwordregister" type="password" class="form-control text-white" id="passwordRegister" placeholder="Password" style="background: none">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block ">register</button>
                                </form>
                    </div>
                    </section>
                    <!-- end register form -->
                    
                    <section v-if="activePage === 'userLogin'">
                            
                    <a  v-on:click.prevent="showFormNewArticle()" href="#"
                        class="bg-dark list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="mr-3"><i class="far fa-plus-square"></i></span>
                            <span v-on:click="showFormNewArticle()" class="menu-collapsed">New Post</span>
                        </div>
                    </a>
                </section>
                    <a v-if="activePage === 'nologinuser' || activePage === 'userLogin'" v-on:click.prevent="showCategory()" href="#"
                        class="bg-dark list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="mr-3"><i class="far fa-newspaper"></i></span>
                            <span class="menu-collapsed">Category</span>
                        </div>
                    </a>

                    <section v-if="activePage === 'userLogin'">

                    <a  v-on:click.prevent="showMyPost()" href="#"
                        class="bg-dark list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="mr-3"><i class="fas fa-tasks"></i></span>
                            <span class="menu-collapsed">My Post</span>
                        </div>
                    </a>

                    <a  href="#submenu2" data-toggle="collapse" aria-expanded="false"
                        class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="mr-3"><i class="fas fa-user"></i></span>
                            <span class="menu-collapsed">Profile</span>
                            <span class="ml-auto"><i class="fas fa-caret-down"></i></span>
                        </div>
                    </a>
                    <div id='submenu2' class="collapse sidebar-submenu">
                        <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                            <span class="menu-collapsed">Settings</span>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                            <span class="menu-collapsed">Password</span>
                        </a>
                    </div>

                </ul>
                <div v-if="activePage === 'userLogin'" class="col-12">
                        <button @click="logout()" type="submit" class="btn btn-primary btn-block  my-2">Log Out</button>
                    </div>
            </div>
            
            <!-- MAIN -->


            <div id="mainContent" class="col" style="margin-left: 230px">

                <!-- form add new post -->
                <div v-if="activePageInside === 'newArticle'" id="newArticalForm" class="row" style="margin-top: 10%">
                    <formAddNewArticle @newArticle="addNewArticle" :errorNoImage="errorNoImagepr"></formAddNewArticle>
                </div>
                <!-- end form new post -->


                <!-- edit article -->
                <div v-if="activePageInside === 'editArticle'" id="newArticalForm" class="row" style="margin-top: 10%">
                        <editArticle @aditArticle="submitEditArticle" v-bind:article="dataEditArticle" > </editArticle>
                    </div>
                <!-- end edit artivcle -->
                    

                <!-- category -->

                <div v-if="activePageInside === 'category' || activePageInside === 'nologinuser'" class="card-columns" style="margin-top: 10%">
                    
                    <categoryPage @changeCategory="chooseCategory"></categoryPage>


                </div>

                <!-- end category -->

                <!-- allpost -->
                <div v-if="checkPage" class="row" style="margin-top: 8%">
                    <div class="col-10 offset-1 ">
                        <section v-if="searchResult !== null">
                        <div @click="generateSinglePostArticle(post)"  v-for="post in filteredArticleCategory" :key="post._id" class="card w-75 my-2">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <img :src=post.image class="card-img" alt="..." height="150" width="100px">
                                    </div>
                                    <div class="col-8">
                                        <div class="row mt-2">
                                            <div class="col-12">

                                                <h3 class="card-title">{{post.title}}</h3>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 mb-5 text-truncate">
                                                <p class="card-text text-truncate" v-html="post.content"></p>
                                            </div>
                                        </div>
                                        <div style="display: flex;justify-content:flex-end;margin-bottom: -10px;" class="">
                                            <p class="card-text"><small class="text-muted">{{`${post.UserId.first_name} ${post.UserId.last_name}`}} &nbsp;</small></p>
                                            <p class="card-text"><small class="text-muted">{{post.createdAt.substring(0, 10)}}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </section>
                    </div>
                </div>

                <!-- end alpost -->

                <!-- MypostOnly -->

                <div v-if="activePageInside === 'MyPostOnly'" class="row" style="margin-top: 8%">
                    <div class="col-10 offset-1 ">
                        <div   v-for="post in userPostOnly" :key="post._id" class="card w-100 my-2 ">
                            <div  class="card-body bg-light ">
                                <div class="row  ">
                                    <div class="col-1">
                                        <img :src=post.image class="card-img " alt="..." height="40" width="20px" >
                                    </div>
                                    <div class="col-11">
                                        <div class="row">
                                                <div class="col-10">
                                                        <h5 class="card-text "><b>{{post.title}}</b></h5>
                                                    </div>
                                                    <div class="col-2 d-flex justify-content-end">
                                                       <h4><span><i @click="editArticle(post)" class="far fa-edit"></i></span>
                                                        <span><i @click="deleteArticle(post)" class="fas fa-trash"></i></span>
                                                    </h4>  
                                                    </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
                <!-- end my post only -->

                <!-- single article -->
                <div v-if="activePageInside === 'singlePage'" class="row" style="margin-top: 8%">
                    <div class="col-10 offset-1 ">
                        <div class="card mb-3 bg-light">
                            <div class="card-header bg-primary d-flex justify-content-between">
                                    <span>{{singlePostArticle.author}}</span>
                                    <span>{{singlePostArticle.createdAt}}</span>
                            </div>
                            <div class="card-img-top p-3">  
                                <img :src=singlePostArticle.image class="card-img-top">
                            </div>
                            <div class="card-body">
                              <h5 class="card-title">{{singlePostArticle.title}}</h5>
                              <p class="card-text" v-html="singlePostArticle.content"></p>
                              <p class="card-text"><small class="text-muted">{{singlePostArticle.category}}</small></p>
                            </div>
                          </div>

                    </div>
                </div>
                <!-- single article -->

            </div>
        </div>
    </div>
</template>


<script>
import formAddNewArticle from "./FormAddNewArticle"
import categoryPage from "./categoryPage"
import editArticle from "./editArticle"
import GoogleLogin from 'vue-google-login'
export default {
    data :  {
        allArticle : [],
        searchResult : "",
        userPostOnly : [],
        activePage : 'nologinuser',
        activePageInside : "nologinuser",
        emailLogin : "",
        passwordLogin : "",
        emailregister : "",
        passwordregister : "",
        first_nameRegister: "",
        last_nameRegister: "",
        errorNoImagepr : "",
        singlePostArticle : {
            author : "",
            image : "",
            content : "",
            title : "",
            category:"",
            createdAt : "",
        },
        dataEditArticle : {
            ArticleId : "",
            wArticleTitle : "",
            ArticleImage : "",
            ArticleContent : "",
            ArticleCategory : ""
        }
        
    },
    components: {
        formAddNewArticle,
        categoryPage,
         GoogleLogin,
         editArticle
        // wysiwyg: vueWysiwyg.default.component,
      },
    methods : {
        onSuccess(googleUser){
            let id_token = googleUser.getAuthResponse().id_token
            axios({
                method: 'post',
                url: 'http://localhost:3100/user/googlelogin',
                responseType: 'json',
                data: {
                    token : id_token
                }
              })
                .then( ({data}) => {
                    this.activePage = 'userLogin'
                    this.activePageInside = 'category'
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userid', data.id)
                    this.checkLogin()
                    this.getArticle()
                    
                this.article = data
                })
                .catch((err)=>{
                    swal(`${err.response.data.message}`)
                })
        },
        onFailure(err){
            console.log(err)
        },
        getImage(event) {
        this.image = event.target.files[0]
        
        },
        addNewArticle(data){
            console.log("masuk create Data");
            console.log(data.image, "hasil emit");
            
            if(data.image === null  ){
                console.log("aaaaa");
                
            }
            let formData = new FormData()
            formData.append('title',  data.title)
            formData.append('image',  data.image)
            formData.append('content', data.content)
            formData.append('category', data.category)
            console.log(formData, "ini formData");
            
            axios({
                method: 'post',
                url: 'http://localhost:3100/article',
                responseType: 'json',
                data :formData,
                headers: {
                    token : localStorage.getItem('token')
                }
                
              })
              .then( ({data}) => {
                  this.getArticle()
                //   this.allArticle.push(data)
                //   this.userPostOnly.push(data)
                  this.activePageInside = "MyPostOnly"
                })
                .catch((err)=>{
                    console.log(err);
                    this.errorNoImagepr = "You Must Add Thummnail for posting a ne article"
                })
        },
        deleteArticle(data){
            
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: "DELETE",
                        url: `http://localhost:3100/article/${data._id}`,
                        headers: {
                            "token" : localStorage.getItem('token')
                        }
                    })            
                    .then(({data}) => {
                        this.getArticle()
                         this.activePageInside = 'MyPostOnly'
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            title: 'Failed to delete article!',
                            text: `${err.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
                }
            })

        },
        editArticle(data){
            this.dataEditArticle.ArticleId = data._id
            this.dataEditArticle.ArticleTitle = data.title
            this.dataEditArticle.ArticleImage = data.image
            this.dataEditArticle.ArticleContent = data.content
            this.dataEditArticle.ArticleCategory = data.category
            console.log(this.dataEditArticle);
            this.activePageInside = 'editArticle'
        },
        submitEditArticle(data){
            // console.log(data);
            console.log(`http://localhost:3100/article/${data.id}`);
            
            axios({
                method: 'put',
                url: `http://localhost:3100/article/${data.id}`,
                responseType: 'json',
                data : {
                    title : data.title,
                    image : data.image,
                    content : data.content,
                    category : data.category,
                },
                headers: {
                    token : localStorage.getItem('token')
                }
                
              })
              .then( ({data}) => {
                  this.dataEditArticle.ArticleId = "",
                  this.dataEditArticle.ArticleTitle = "",
                  this.dataEditArticle.ArticleImage = "",
                  this.dataEditArticle.ArticleContent = "",
                  this.dataEditArticle.ArticleCategory = "",
                  this.getArticle()
                  this.activePageInside = "MyPostOnly"
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        generateSinglePostArticle(data){
            // alert(data.title)
            this.activePageInside ='singlePage'
            this.singlePostArticle.author = `${data.UserId.first_name} ${data.UserId.last_name}` 
            this.singlePostArticle.image = data.image
            this.singlePostArticle.content = data.content
            this.singlePostArticle.title = data.title
            this.singlePostArticle.createdAt = data.createdAt
            this.singlePostArticle.category = data.category
        },
        login(){
            axios({
                method: 'post',
                url: 'http://localhost:3100/user/login',
                responseType: 'json',
                data: {
                    email : this.emailLogin,
                    password : this.passwordLogin
                }
              })
                .then( ({data}) => {
                    this.activePage = 'userLogin'
                    this.activePageInside = 'category'
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userid', data.id)
                    this.checkLogin()
                    this.getArticle()
                    
                this.article = data
                })
                .catch((err)=>{
                    swal(`${err.response.data.message}`)
                })
        },
        register(){
            axios({
                method: 'post',
                url: 'http://localhost:3100/user/register',
                responseType: 'json',
                data: {
                    first_name: this.first_nameRegister,
                    last_name: this.last_nameRegister,
                    email : this.emailregister,
                    password : this.passwordregister
                    
                }
              })
                .then( ({data}) => {
                   swal(data)
                })
                .catch((err)=>{
                    console.log(err.response);
                    swal(`${err.response.data.errorArr[0].message}`)
                })
        },
        logout(){
            this.activePage = 'nologinuser'
            localStorage.clear()
            this.checkLogin()
        },
        showFormNewArticle(){
            this.activePageInside = 'newArticle'
        },
        showCategory(){
            this.activePageInside = 'category'
        },
        chooseCategory(category){
            this.activePageInside = `${category}`
        },
        showMyPost(){
            this.activePageInside = 'MyPostOnly'
        },
        getArticle(){ 
            this.allArticle = []
            this.userPostOnly = []
            axios({
                method: 'get',
                url: 'http://localhost:3100/article',
                responseType: 'json'
              })
                .then( ({data}) => {
                    let userid = localStorage.getItem('userid')
                    this.allArticle = data
                    for (let i = 0; i < data.length; i++) {
                        // console.log("id user login", userid,);
                        // console.log('id userartcile', data[i].UserId);
                
                        if(data[i].UserId._id === localStorage.getItem('userid')){
                            console.log("dapet nih sama");
                            
                            this.userPostOnly.push(data[i])
                        }
                        
                    }
                })
                .catch((err)=>{
                    
                })
        },
        checkLogin(){
            if (localStorage.getItem('token')) {
                this.activePage = 'userLogin'
            }
        }
    },
    computed : {
        filteredArticleCategory(){

            if(this.searchResult !== "") {
                let filter = this.allArticle.filter(filterResult => {
                    return filterResult.title.toLowerCase().includes(this.searchResult.toLowerCase())
                })
                if (filter.length === 0) return this.article
                else return filter
                        
            } else {
                let filter = this.allArticle.filter(filterResult => { 
                    if(this.activePageInside === "mypost"){
                        return this.allArticle
                    } else {
                        return filterResult.category === this.activePageInside
                    }
                    
                })
            if (filter.length === 0) return this.article
            else return filter
            }

            
        },
        checkPage(){
            if(this.activePageInside === "allpost" ||
            this.activePageInside === "Fashion" ||
            this.activePageInside === "Technology" ||
            this.activePageInside === "Food & Drink" ||
            this.activePageInside === "Film" ||
            this.activePageInside === "Automotive" ||
            this.activePageInside === "mypost" ||
            this.activePageInside === "Education"){
                    return true;
            }
        }
    },
    created : function(){
        this.getArticle()
        this.checkLogin()
    }
}
</script>

<style scoped>

</style>


