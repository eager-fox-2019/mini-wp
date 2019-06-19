// Window.Vue = require("vue")
// $(document).ready(function(){

// })


// Vue.component('dropdown-trigger', function(){
//     template: '<a/>'
// })

const vm = new Vue({
    el: "#app",
    data:{
        test: "DDDDDDDD",
        isLogin: false,
        registerUsername: "",
        registerPassword: "",
        registerEmail: "",
        loginUsername: "",
        loginPassword: "",
        showCard: false,
        displayType: "none",
        loggedUser: "",
        posts:[],
        input:{
            title: null,
            content: null,
            imgSrc: null
        }
    },
    created(){
        if(sessionStorage.getItem("jwt")){
            this.isLogin = true
        }
        axios.request({
            method: "GET",
            url: "http://localhost:3000/articles/all"
        })
        .then(articles =>{
            var asd = articles.data
            console.log(asd)
            this.posts = articles.data
        })
        .catch(err =>{
            console.log(err.response.data)
        })
    },

    methods:{
        testmethod: function(){
            this.test = "SUCCESS"
            console.log("DD TESTING")
        },

        registerUser: function(){
            axios.request({
                method: "POST",
                url: "http://localhost:3000/users/register",
                data:{
                    username: this.registerUsername,
                    email: this.registerEmail,
                    password: this.registerPassword
                }
            })
            .then(userInfo =>{
                this.registerUsername = ""
                this.registerEmail = ""
                this.registerPassword = ""
                console.log(`Hello ${userInfo.data.username}, you are now registered to our website`)
            })
            .catch(err =>{
                console.log(err.response.data)
            })
        },

        createNewBlog: function(){
            console.log("PLSS")
            console.log(this.input)
            this.posts.push(this.input)
        },

        openRead: function(){
            console.log("ASD")
            if(this.showCard === false){
                this.displayType = false
                this.showCard = true
            }else{
                this.displayType = true
                this.showCard = false
            }

            // $('.fixed-action-btn').floatingActionButton();
        },

        del: function(index){
            var username = sessionStorage.getItem("username")
            axios.request({
                method: "DELETE",
                headers:{
                    token: sessionStorage.getItem("jwt")
                },
                url: `http://localhost:3000/articles/${username}/delete?article=${index}`
            })
            .then(deleted =>{
                this.posts.splice(index, 1)
                console.log(deleted.data)
            })
            .catch(err =>{
                console.log(err.response.data)
            })
        },

        onSignIn: function(){
            this.isLogin = true
        },

        signIn: function(){
            axios.request({
                method: "POST",
                url: "http://localhost:3000/users/signin",
                data:{
                    username: this.loginUsername,
                    password: this.loginPassword 
                }
            })
            .then(userInfo =>{
                sessionStorage.setItem("jwt", userInfo.data.access_token)
                sessionStorage.setItem("username", userInfo.data.username)
                this.isLogin = true
                this.loggedUser = this.loginUsername
            })
            .catch(err =>{
                console.log(err.response)
            })
        },

        signOut: function(){
            this.isLogin = false
            sessionStorage.setItem("jwt", "")
            sessionStorage.setItem("username", "")
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log("user signed out")
        });
        },

        createArticle: function(){
            var username = sessionStorage.getItem("username")
            console.log(username)
            axios.request({
                method: "POST",
                url: `http://localhost:3000/articles/${username}/add`,
                headers:{
                    "token": sessionStorage.getItem("jwt")
                },
                data:{
                    title: this.input.title,
                    content: this.input.content,
                    imgSrc: this.input.imgSrc
                }
            })
            .then(created =>{
                this.posts.push(created.data)
            })
            .catch(err =>{
                console.log(err.response)
            })
        }
    },


    mounted: function(){
        $('.modal').modal();
        $(".dropdown-trigger").dropdown({coverTrigger: false});
        $('.fixed-action-btn').floatingActionButton({hoverEnabled: false});
        $('.materialboxed').materialbox();
        $('.tabs').tabs();
        // const CKeditor = ClassicEditor
        //         .create( document.querySelector( '#editor' ) )
        //         .catch( error => {
        //             console.error( error );
        //         } );
    },
    updated: function(){
        $('.fixed-action-btn').floatingActionButton({hoverEnabled: false});
    }
})





function onSignIn(googleUser){
    this.isLogin = true
    var id_token = googleUser.getAuthResponse().id_token;
    axios.request({
        method: "POST",
        url: "http://localhost:3000/users/googlesignin",
        data:{
            idtoken: id_token
        }
    })
    .then(token =>{
        console.log(token)
        sessionStorage.setItem("jwt", token.data.access_token)
        sessionStorage.setItem("username", token.data.username)
    })
    .catch(err =>{
        console.log(err)
    })
}



function testing(){
    console.log("TESTSETST")
}

function showCard(current){
    var card = $(current).parent().parent().next()
    if(card.attr("style") === ""){
        card.hide(500)
    }else{
        card.show(500)
    }
    if(card.attr("class") === "row z-depth-1 scale-transition scale-out"){
        $(card).removeClass("scale-out")
    }else{
        $(card).addClass("scale-out")
    }
}

// $('#createBlog').find('input, textarea, checkbox').on('change', function() {
//     console.log("DDDD")
//     // M.Modal.init($("#createBlog"), {
//     //     outDuration: 5000
//     // })
//     // $("#createBlog").modal({
//     //             outDuration: 5000
//     //         });
//     var r = confirm("Discard changes and exit?");
//     if(r){
//        var instance=  M.Modal.getInstance($("#createBlog"))
//         instance.close()
//         console.log("ok")
//         // $("#createBlog").modal();
//     }else{   
//         console.log("cancel")
     
//     }
// });

