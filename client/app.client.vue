<template>
    <login v-if="!loginData.loggedIn"></login>
    <admin-layout v-else>
        <article-list 
            v-if="currentPage === 'articleList'"></article-list>
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
import { stripHtml, toast_error, toast_success, getFirstNString } from './helper'
import axios from 'axios'
const BASE_URL = `http://localhost:3000`

const lifecycle = {
    created() {
        this.loginData.loggedIn = window.localStorage.getItem('loggedIn')
        this.loginData.email = window.localStorage.getItem('kecebadai-email')
        if (this.loginData.loggedIn) {
            toast_success('Welcome back!')
        }
        this.fetchArticles() 
    }
}

const methods = {
    axiosConfig() {
        return {
            headers: {
                token: window.localStorage.getItem('kecebadai-token'),
                'Content-Type': 'application/json'
            }
        }
    },
    fetchArticles() {
        axios.get(`${BASE_URL}/article`, this.axiosConfig())
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
        }, this.axiosConfig())
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
        }, this.axiosConfig())
            .then(() => {
                toast_success('Sukses mengubah artikel')
                this.currentPage = 'pageArticleList'
                this.fetchArticles()
            })
            .catch(toast_error)
    },
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
    methods
}
</script>
