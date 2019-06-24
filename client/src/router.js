import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import article from './views/article.vue'
import layout from './views/layout.vue'
import newarticle from './views/article-new.vue'
import articleuser from './views/article-user.vue'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [{
                path: '/',
                name: 'home page',
                component: home
            },
            {
                path: '/layout',
                name: 'layout',
                component: layout
            },
            {
                path: '/article/new',
                name: 'new article',
                component: newarticle
            },
            {
                path: '/article/:title',
                name: 'article',
                component: article
            },
            {
                path: '/article/:title/edit',
                name: 'edit article',
                component: newarticle
            },
            {
                path: '/your-stories',
                name: 'your-stories',
                component: articleuser
            }
        ]
    })
}