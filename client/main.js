
var app = new Vue({
    el : '#app',
    data :  {
        allArticle : [],
        automotiveArticle: [],
        educationArticle: [],
        fashionArticle: [],
        fdArticle: [],
        technologyArticle: [],
        filmArticle: [],
        searchResult : "",
        activePage : 'nologinuser',
        activePageInside : "nologinuser",
        emailLogin : "",
        passwordLogin : "",
        emailregister : "",
        passwordregister : "",
        first_nameRegister: "",
        last_nameRegister: "",
        newArticle : {
            newArticleTitle : "",
            newArticleImage : "",
            newArticleContent : "",
            newArticleCreatedAt: "",
            newArticleCategory : ""
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    methods : {
        addNewArticle(){
            console.log("masuk create Data");
            
            axios({
                method: 'post',
                url: 'http://localhost:3100/article',
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
                    this.article.push(data)
                    this.activePageInside = "mypost"
                })
                .catch((err)=>{
                    console.log(err);
                })
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
                    this.checkLogin()
                    
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
                    console.log(err);
                    swal(`${err.response.data.message}`)
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
        getArticle(){
            axios({
                method: 'get',
                url: 'http://localhost:3100/article',
                responseType: 'json'
              })
                .then( ({data}) => {
                   for (let i = 0; i < data.length; i++) {
                    this.allArticle.push(data[i])
                    if(data[i].category === "Film"){                
                        this.filmArticle.push(data[i])
                    } else if(data[i].category === "Food & Drink"){                
                        this.fdArticle.push(data[i])
                    } else if(data[i].category === "Automotive"){                
                        this.automotiveArticle.push(data[i])
                    } else if(data[i].category === "Education"){                
                        this.educationArticle.push(data[i])
                    } else if(data[i].category === "Fashion"){                
                        this.fashionArticle.push(data[i])
                    } else if(data[i].category === "Technology"){                
                        this.technologyArticle.push(data[i])
                    }
                       
                   } 
                
                })
                .catch((err)=>{
                    console.log("masuk error");
    
                    console.log(err);
                    
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

            let filter = this.allArticle.filter(filterResult => { 
                if(this.activePageInside === "mypost"){
                    return this.allArticle
                } else {
                    return filterResult.category === this.activePageInside
                }
                
            })
        if (filter.length === 0) return this.article
        else return filter
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

