
var app = new Vue({
    el : '#app',
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
        image : null,
        last_nameRegister: "",
        singlePostArticle : {
            author : "",
            image : "",
            content : "",
            title : "",
            category:"",
            createdAt : "",
            
        },
        newArticle : {
            newArticleId : "",
            newArticleTitle : "",
            newArticleContent : "",
            newArticleCreatedAt: "",
            newArticleCategory : ""
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    methods : {
        getImage(event) {
        this.image = event.target.files[0]
        
        },
        addNewArticle(){
            console.log("masuk create Data");
            let formData = new FormData()
            formData.append('title', this.newArticle.newArticleTitle)
            formData.append('image', this.image)
            formData.append('content',this.newArticle.newArticleContent)
            formData.append('category',this.newArticle.newArticleCategory)
            console.log(formData, 'ini form data')
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
                  this.newArticle.newArticleTitle = ""
                  this.newArticle.newArticleImage = ""
                  this.newArticle.newArticleContent = ""
                  this.newArticle.newArticleCategory = ""
                  this.allArticle.push(data)
                  this.userPostOnly.push(data)
                  this.activePageInside = "MyPostOnly"
                })
                .catch((err)=>{
                    console.log(err);
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
            console.log(data);
            
            // alert(data.title)
            this.newArticle.newArticleId = data._id
            this.newArticle.newArticleTitle = data.title
            this.newArticle.newArticleImage = data.image
            this.newArticle.newArticleContent = data.content
            this.newArticle.newArticleCategory = data.category
            this.activePageInside = 'editArticle'
        },
        submitEditArticle(){
            axios({
                method: 'put',
                url: `http://localhost:3100/article/${this.newArticle.newArticleId}`,
                responseType: 'json',
                data : {
                    title : this.newArticle.newArticleTitle,
                    image : this.newArticle.newArticleImage,
                    content : this.newArticle.newArticleContent,
                    category : this.newArticle.newArticleCategory,
                },
                headers: {
                    token : localStorage.getItem('token')
                }
                
              })
              .then( ({data}) => {
                  this.newArticle.newArticleTitle = ""
                  this.newArticle.newArticleImage = ""
                  this.newArticle.newArticleContent = ""
                  this.newArticle.newArticleCategory = ""
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
        showPerCategory(category){
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
        // filteredArticle() {
        //     console.log("Masuk boss");
        //     if(this.searchResult !== null){
        //         let filter = this.allArticle.filter(filterResult => {
        //             return filterResult.title.toLowerCase().includes(this.searchResult.toLowerCase())
        //         })
        //     if (filter.length === 0) return this.article
        //     else return filter
        //     }
                
        // },
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
})


$('#body-row .collapse').collapse('hide'); 
$('#collapse-icon').addClass('fa-angle-double-left'); 
$('[data-toggle=sidebar-colapse]').click(function() {
    SidebarCollapse();
});
function SidebarCollapse () {
    console.log("Masuk");
    
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    // $('#mainContent').css('margin-left',"230")
    
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    $('#mainContent').toggleClass('mainContent-expanded mainContent-collapsed');
    
    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $('.sidebar-separator-title');
    if ( SeparatorTitle.hasClass('d-flex') ) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }
    
    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}

