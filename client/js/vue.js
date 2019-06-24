new Vue({
    el: '#miniWP',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        article: {
            title: '',
            content: '',
            created_at: '',
            author: '',
            imageName: '',
            imageUrl: '',
        },
        user: {
            email: '',
            password: ''
        },
        articles: [],
        error: {},
        isLogin: false
    },

    created() {
        axios({
            method: 'get',
            url: 'http://localhost:3000/articles',
        })
        .then( (dataArticles) => {
            for (var i=0; i<dataArticles.data.length; i++) {
                this.articles.push(dataArticles.data[i])
            }
            console.log(dataArticles)
        })
        .catch( (err) => {
            this.error = {
                message: "Failed getting information from server",
                detail: err
            }
        })
    },
    methods: {
        submitArticle: function() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/articles',
                data: {
                    title: this.article.title,
                    content: this.article.content,
                    created_at: new Date(),
                    author: this.article.author,
                    imageName: this.article.imageName,
                    imageUrl: this.article.imageUrl
                }
            })
            .then( (newArticle) => {
                this.articles.push({
                    title: newArticle.title,
                    content: newArticle.content,
                    created_at: newArticle.created_at,
                    imageName: newArticle.imageName,
                    imageUrl: newArticle.imageUrl,
                    author: newArticle.author
                })
                this.article.content = ''
                this.article.title = ''
                this.article.created_at = ''
                this.article.author = ''
                this.article.imageName = ''
                this.article.imageUrl = ''
            })
            .catch( (err) => {
                this.error = {
                    message: `Failed create new article`,
                    detail: err
                }
            })
        },
        login: function() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then( (response) => {
                this.isLogin = true;
            })
            .catch( (err) => {
                this.error = "Login Failed"
            })
        }
    }
})