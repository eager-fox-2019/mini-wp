var app = new Vue({
    el: '#app',
    components: {
        'editor': Editor
    },
    data: {
        isLogin: true,
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