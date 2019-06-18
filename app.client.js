
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
        pageformArticle: {
            title: '',
            description: '',
        },
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

        },
        viewList() {
            this.pageArticleDetail.indexArticle = null
            this.currentPage = 'pageArticleList'
        },
        editForm(i) {

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
        }
    }
})