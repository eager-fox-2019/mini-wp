new Vue({
    el: "#app",
    data: {
        pageStatus: "",
        search : false,
        mainStatus: "articleList"
    },
    methods : {
        toRegis(){
            this.pageStatus = 'regis'
        },
        toLogin(){
            this.pageStatus = 'login'
        },
        searchButton(){
            if(this.search){
                this.search = false
            }else{
                this.search = true
            }
        },
        userArticle(){
            this.mainStatus = 'userArticle'   
        },
        detailArticle(){
            this.mainStatus = 'detailArticle'   
        },
        newArticle(){
            this.mainStatus = 'newArticle'   
        },
        articleList(){
            this.mainStatus = 'articleList'   
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.pageStatus = "home"
        }else{
            this.pageStatus = "login"
        }
    },
})