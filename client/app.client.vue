<template>
    <login 
        v-if="!loginData.loggedIn"
        v-on:successful-login="successfulLogin"></login>
    <admin-layout 
        v-else
        v-on:logout="logout">
        <article-list 
            v-if="currentPage === 'articleList'"
            v-on:search-article="searchArticle"
            v-bind:articles="[{title: 'test', description: 'yooow'}]"></article-list>
        <article-detail 
            v-if="currentPage === 'articleDetail'"></article-detail>
        <article-form 
            v-if="currentPage === 'articleForm'"
            v-bind:title.sync="pageFormArticle.title"
            v-bind:content.sync="pageFormArticle.content"></article-form>
    </admin-layout>
</template>

<script>
import adminLayout from './components/mainPageLayout.vue'
import login from './pages/login.vue'
import articleList from './pages/articleList.vue'
import articleDetail from './pages/articleDetail.vue'
import articleForm from './pages/articleForm.vue'

import { stripHtml, toast_error, toast_success, getFirstNString } from './helper/utils.js'
const { axios, axiosConfig, BASE_URL } = require('./helper/conn.ajax.js') 

const lifecycle = {
    created() {
        this.loginData.loggedIn = window.localStorage.getItem('loggedIn')
        this.loginData.email = window.localStorage.getItem('kecebadai-email')
        if (this.loginData.loggedIn) {
            this.setRouting('articleList')
            toast_success('Welcome back!')
            this.fetchArticles() 
        }
    }
}

const ajaxActions = {
    fetchArticles() {
        axios.get(`${BASE_URL}/article`, axiosConfig())
            .then(res => {
                let { data } = res
                this.articles = data.map(article => {
                    let description = stripHtml(article.content)
                    article.description = getFirstNString(description, 100) + '...'
                    return article
                })
            })
            .catch(toast_error)
    },
    postArticle() {
        let { title, content } = this.pageFormArticle
        axios.post(`${BASE_URL}/article`, {
            title,
            content
        }, axiosConfig())
            .then(() => {
                this.currentPage = 'pageArticleList'
                this.fetchArticles()
                toast_success('Sukses membuat artikel')
            })
            .catch(toast_error)
    },
    updateArticle() {
        let { title, content } = this.pageFormArticle
        axios.patch(`${BASE_URL}/article`, {
            title,
            content
        }, axiosConfig())
            .then(() => {
                toast_success('Sukses mengubah artikel')
                this.currentPage = 'pageArticleList'
                this.fetchArticles()
            })
            .catch(toast_error)
    },
}

const routing = {
    setRouting(page) {
        switch (page) {
            case 'login':
                window.history.pushState({}, document.title, '/admin/login')
                break
            case 'articleList':
                window.history.pushState({}, document.title, '/admin/list')
                break;
            default:
                break;
        }
        this.currentPage = page
    },
    initRouting(path) {

    },
}

const eventHandler = {
    successfulLogin(access_token, email) {
        this.loginData.loggedIn = true
        this.loginData.email = email
        this.loginData.token = access_token
        window.localStorage.setItem('loggedIn', 'true')
        window.localStorage.setItem('kecebadai-email', email)
        window.localStorage.setItem('kecebadai-token', access_token)
        toast_success("Login berhasil")
        this.setRouting('articleList')
    },
    logout() {
        window.localStorage.clear()
        this.setRouting('login')
        this.loginData.loggedIn = false
        this.loginData.email = ''
        this.loginData.token = ''
    },
    searchArticle(title) {
        debugger
    }
}

export default {
    created: lifecycle.created,
    data: {
        currentPage: 'login',
        articles: [],
        sidebarOpen: true,
        pageFormArticle: {
            edit: false, 
            title: '',
            content: '',
        },
        loginData: {
            loggedIn: false,
            email: '',
        },
    },
    components: {
        adminLayout,
        login,
        articleList,
        articleDetail,
        articleForm
    },
    methods: {
        ...ajaxActions,
        ...eventHandler,
        ...routing,
    }
}
</script>
