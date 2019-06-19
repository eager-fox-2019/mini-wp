const BASE_URL = `http://localhost:3000`
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
        },
        pageLogin: {
            email: '',
            password: '',
        },
        loginData: {
            loggedIn: false,
            email: '',
        },
        axiosConfig: {
            token: ''
        }
    }, 
    created() {
        this.loginData.loggedIn = window.localStorage.getItem('loggedIn')
        this.loginData.email = window.localStorage.getItem('miniwp-email')
        this.axiosConfig.token = window.localStorage.getItem('miniwp-token')
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
        },
        login() {
            let { email, password } = this.pageLogin
            this.pageLogin.email = ''
            this.pageLogin.password = ''
            axios.post(`${BASE_URL}/user/login`, 
                {
                    email,
                    password
                }, this.axiosConfig)
                .then(res => {
                    let {data} = res
                    this.loginData.loggedIn = true
                    this.loginData.email = data.email
                    this.axiosConfig.token = data.access_token
                    window.localStorage.setItem('loggedIn', 'true')
                    window.localStorage.setItem('miniwp-email', data.email)
                    window.localStorage.setItem('miniwp-token', data.access_token)
                })
                .catch(toast_error) 
        },
        register() {
            let { email, password } = this.pageLogin
            this.pageLogin.email = ''
            this.pageLogin.password = ''
            axios.post(`${BASE_URL}/user/register`,
                {
                    email,
                    password
                }, this.axiosConfig)
                .then(() => {
                    toast_success('Register Berhasil')
                })
                .catch(toast_error) 
        },
        logout() {
            window.localStorage.removeItem('loggedIn')
            window.localStorage.removeItem('miniwp-email')
            window.localStorage.removeItem('miniwp-token')
            this.loginData.loggedIn = false
            this.loginData.email = ''
            this.axiosConfig.token = ''
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
        
    }
})