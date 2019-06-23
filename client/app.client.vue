<template>
    <login 
        v-if="!loginData.loggedIn"
        v-on:successful-login="successfulLogin"></login>
    <admin-layout 
        v-else
        v-on:logout="logout"
        v-on:clicked-new-article="showNewForm">
        <article-list 
            v-if="currentPage === 'articleList'"
            v-on:search-article="searchArticle"
            v-bind:articles="articles"
            v-bind:currentfilter="pageArticleList.currentFilter"
            v-on:clicked-detail="showDetail"
            v-on:clicked-form="showEditForm"></article-list>
        <article-detail 
            v-if="currentPage === 'articleDetail'"
            v-bind:title="pageArticleDetail.title"
            v-bind:content="pageArticleDetail.content"
            v-on:clicked-list="showList"></article-detail>
        <article-form 
            v-if="currentPage === 'articleForm'"
            v-bind:title.sync="pageFormArticle.title"
            v-bind:content.sync="pageFormArticle.content"
            v-on:update-image="setImage"
            v-bind:edit="pageFormArticle.edit"
            v-on:clicked-list="showList"
            v-on:clicked-submit-new="postArticle"
            v-on:clicked-submit-edit="updateArticle"></article-form>
    </admin-layout>
</template>

<script>
import adminLayout from './components/adminLayout.vue'
import login from './pages/login.vue'
import articleList from './pages/articleList.vue'
import articleDetail from './pages/articleDetail.vue'
import articleForm from './pages/articleForm.vue'

import { stripHtml, toast_error, toast_success, getFirstNString } from './helper/utils.js'
const { axios, axiosConfig, BASE_URL } = require('./helper/conn.ajax.js') 
const APP_STATE = require('./app.state')

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
    fetchArticles(title) {
        let url = `${BASE_URL}/article`
        if (title) url += '?title='+title
        axios.get(url, axiosConfig())
            .then(res => {
                let { data } = res
                this.articles = data.map(article => {
                    let description = stripHtml(article.content)
                    article.description = getFirstNString(description, 100) + '...'
                    if (!article.image) article.image = "/assets/img/colors-contemporary-fashion-965324.jpg"
                    return article
                })
            })
            .catch(toast_error)
    },
    postArticle() {
        debugger
        let { title, content, image } = this.pageFormArticle
        let formData = new FormData() 
        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', image)
        axios.post(`${BASE_URL}/article`, formData, {...axiosConfig(), 'Content-Type': 'multipart/form-data'})
            .then(() => {
                this.currentPage = 'pageArticleList'
                this.fetchArticles()
                toast_success('Sukses membuat artikel')
            })
            .catch(toast_error)
    },
    updateArticle() {
        let { title, content, image } = this.pageFormArticle
        let formData = new FormData() 
        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', image)
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
    searchArticle(title) {
        this.fetchArticles(title)
        this.pageArticleList.currentFilter = title
    }
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
            case 'articleDetail':
                window.history.pushState({}, document.title, '/admin/detail')
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
        this.loginData.loggedIn = false
        this.loginData.email = ''
        this.loginData.token = ''
        toast_success("Bye bye")
        this.setRouting('login')
    },
    showDetail(i) {
        this.pageArticleDetail = this.articles[i]
        this.setRouting('articleDetail')
    },
    showEditForm(i) {
        let article = this.articles[i]
        this.pageFormArticle.edit = true
        this.pageFormArticle.title = article.title
        this.pageFormArticle.content = article.content
        this.setRouting('articleForm')
    },
    showNewForm() {
        this.pageFormArticle.edit = false 
        this.pageFormArticle.title = ''
        this.pageFormArticle.content = ''
        this.setRouting('articleForm')
    },
    showList() {
        this.setRouting('articleList')
    },
    setImage(files) {
        if (!files.length) return;
        this.pageFormArticle.image = files[0]
    }
}

export default {
    created: lifecycle.created,
    data: APP_STATE,
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
