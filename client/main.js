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
            url: `http://localhost:3000/posts`
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
        postArticle(){
            axios({
                method: "POST",
                url: `http://localhost:3000/posts`,
                data: {
                    id: this.listArticles[this.listArticles.length - 1].id + 1,
                    title: this.newTitle,
                    imgUrl: this.newImgUrl,
                    content: this.newPost
                }
            })
            .then(({data}) => {
                console.log(data)
                console.log("Masuk ke then")
                this.listArticles.push(data)
                this.newTitle = ""
                this.newImgUrl = ""
                this.newPost = ""
                this.loadPage = 'published'
            })
            .catch(err => {
                console.log("Masuk error dari postArticle")
                console.log(err)
            })
        },
        deleteArticle(id){
            axios({
                method: "DELETE",
                url: `http://localhost:3000/posts/${id}`
            })
            .then(() => {
                console.log("Delete success")
                this.listArticles = this.listArticles.filter(post => post.id !== id)
            })
            .catch(err => {
                console.log("Masuk error dari delete")
                console.log(err)
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
                url: `http://localhost:3000/posts/${id}`
            })
            .then(({data})=>{
                console.log("Get data:", data)
                this.selectedArticle = data
                this.loadPage = 'read-more'
            })
            .catch(err => {
                console.log("Error from read more button")
                console.log(err)
            })
        },
        shortText(text){
            return text.split(' ').slice(0,2).join(' ')
            // let shortTextArr = text.split(' ')
            // shortTextArr =  shortTextArr.slice(0,2)
            // let shortText = shortTextArr.join(' ')
            // return shortText
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