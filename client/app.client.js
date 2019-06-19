
var vueApp = new Vue({
    el: '#app',
    data: {
        articles: [
            {
                title: 'test0',
                description: 'yowww'
            },
            {
                title: 'test1',
                description: 'yowww'
            },
            {
                title: 'test2',
                description: 'yowww'
            },
            {
                title: 'test3',
                description: 'yowww'
            },
        ],
        sidebarOpen: true,
        currentPage: 'pageArticleList',
        pageArticleList: {
            searchTitle: ''
        },
        pageArticleDetail: {
            indexArticle: null,
        },
        pageFormArticle: {
            edit: false,
            title: '',
            content: '',
        }
    }, 
    created() {
        
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen
        },
        viewArticle(i) {
            this.pageArticleDetail.indexArticle = i
            this.currentPage = 'pageArticleDetail'
        }, 
        addForm() {
            this.pageFormArticle.edit = false
            this.pageFormArticle.title = ''
            this.pageFormArticle.content = ''
            this.currentPage = 'pageFormArticle'
        },
        viewList() {
            this.pageArticleDetail.indexArticle = null
            this.currentPage = 'pageArticleList'
        },
        editForm(i) {
            this.pageFormArticle.edit = true,
            this.pageFormArticle.title = this.articles[i].title
            this.pageFormArticle.content = this.articles[i].content
            this.currentPage = 'pageFormArticle'
        }
    },
    computed: {
        filteredArticle() {
            let filter = this.pageArticleList.searchTitle
            if (filter === '') {
                return this.articles
            } else {
                return this.articles.filter(article => article.title.includes(filter))
            }
        },
        loginData() {
            return {
                email: window.localStorage.getItem('miniwp-email'),
                token: window.localStorage.getItem('miniwp-token')
            }  
        }
    }
})