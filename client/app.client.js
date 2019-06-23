import Vue from 'vue'
import App from './app.client.vue'

new Vue(App).$mount('#app')

// const BASE_URL = `http://localhost:3000`
// ({
//     el: '#app',
//     components: {
//         wysiwyg: vueWysiwyg.default.component,
//     },
//     data: {
//         articles: [],
//         sidebarOpen: true,
//         currentPage: 'pageArticleList',
//         pageArticleList: {
//             searchTitle: ''
//         },
//         pageArticleDetail: {
//             indexArticle: null,
//         },
//         pageFormArticle: {
//             edit: false,
//             title: '',
//             content: '',
//         },
//         pageLogin: {
//             email: '',
//             password: '',
//         },
//         loginData: {
//             loggedIn: false,
//             email: '',
//             token: '',
//         },
//     }, 
//     created() {
//         this.loginData.loggedIn = window.localStorage.getItem('loggedIn')
//         this.loginData.email = window.localStorage.getItem('miniwp-email')
//         this.loginData.token = window.localStorage.getItem('miniwp-token')
//         if (this.loginData.loggedIn) {
//             toast_success('Welcome back!')
//         }
//         this.fetchArticles() 
//     },
//     methods: {
//         axiosConfig() {
//             return {
//                 headers: {
//                     token: this.loginData.token,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         },
//         fetchArticles() {
//             axios.get(`${BASE_URL}/article`, this.axiosConfig())
//                 .then(res => {
//                     let { data } = res
//                     this.articles = data.map(article => {
//                         let description = stripHtml(article.content)
//                         article.description = getFirstNString(description, 100) + '...'
//                         return article
//                     })
//                 })
//                 .catch(toast_error)
//         },
//         postArticle() {
//             let { title, content } = this.pageFormArticle
//             axios.post(`${BASE_URL}/article`, {
//                 title,
//                 content
//             }, this.axiosConfig())
//                 .then(() => {
//                     toast_success('Sukses membuat artikel')
//                     this.currentPage = 'pageArticleList'
//                     this.fetchArticles()
//                 })
//                 .catch(toast_error)
//         },
//         updateArticle() {
//             let { title, content } = this.pageFormArticle
//             axios.patch(`${BASE_URL}/article`, {
//                 title,
//                 content
//             }, this.axiosConfig())
//                 .then(() => {
//                     toast_success('Sukses mengubah artikel')
//                     this.currentPage = 'pageArticleList'
//                     this.fetchArticles()
//                 })
//                 .catch(toast_error)
//         },
//         toggleSidebar() {
//             this.sidebarOpen = !this.sidebarOpen
//         },
//         viewArticle(i) {
//             this.pageArticleDetail.indexArticle = i
//             this.currentPage = 'pageArticleDetail'
//         }, 
//         addForm() {
//             this.pageFormArticle.edit = false
//             this.pageFormArticle.title = ''
//             this.pageFormArticle.content = ''
//             this.currentPage = 'pageFormArticle'
//         },
//         viewList() {
//             this.pageArticleDetail.indexArticle = null
//             this.currentPage = 'pageArticleList'
//         },
//         editForm(i) {
//             this.pageFormArticle.edit = true,
//             this.pageFormArticle.title = this.articles[i].title
//             this.pageFormArticle.content = this.articles[i].content
//             this.currentPage = 'pageFormArticle'
//         },
//         login() {
//             let { email, password } = this.pageLogin
//             this.pageLogin.email = ''
//             this.pageLogin.password = ''
//             axios.post(`${BASE_URL}/user/login`, 
//                 {
//                     email,
//                     password
//                 }, this.axiosConfig())
//                 .then(res => {
//                     let {data} = res
//                     this.loginData.loggedIn = true
//                     this.loginData.email = data.email
//                     this.loginData.token = data.access_token
//                     window.localStorage.setItem('loggedIn', 'true')
//                     window.localStorage.setItem('miniwp-email', data.email)
//                     window.localStorage.setItem('miniwp-token', data.access_token)
//                     toast_success("Login berhasil")
//                 })
//                 .catch(toast_error) 
//         },
//         register() {
//             let { email, password } = this.pageLogin
//             this.pageLogin.email = ''
//             this.pageLogin.password = ''
//             axios.post(`${BASE_URL}/user/register`,
//                 {
//                     email,
//                     password
//                 }, this.axiosConfig())
//                 .then(() => {
//                     toast_success('Register Berhasil')
//                 })
//                 .catch(toast_error) 
//         },
//         logout() {
//             window.localStorage.removeItem('loggedIn')
//             window.localStorage.removeItem('miniwp-email')
//             window.localStorage.removeItem('miniwp-token')
//             this.loginData.loggedIn = false
//             this.loginData.email = ''
//             this.loginData.token = ''
//         }
//     },
//     computed: {
//         filteredArticle() {
//             let filter = this.pageArticleList.searchTitle
//             if (filter === '') {
//                 return this.articles
//             } else {
//                 return this.articles.filter(article => article.title.includes(filter))
//             }
//         },
        
//     }
// })