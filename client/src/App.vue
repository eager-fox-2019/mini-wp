<template>
    <div>
        <Header 
            :user="user"
            :searchValue="searchValue"
            :tags="tags"
            @go-to-article-page="goToArticlePage"
            @go-to-home-page="goToHomePage"
            @go-to-list-page="goToListPage"
            @search-article="searchArticle"
            @search-by-tag="searchByTag"
            @logout="logout"
        ></Header>
        
        <div style="height: 7.5em">&nbsp;</div>
        
        <LoginForm 
            :menus="menus" 
            :user="user" 
            @go-to-register-page="goToRegisterPage"
            @login="login"
        ></LoginForm>

        <RegisterForm 
          :menus="menus" 
          :user="user" 
          @register="register"
          @go-to-login-page="goToLoginPage"
        ></RegisterForm>

        <section id="home" v-if="menus.home && user.loggedIn===true">
          <div class="container d-flex flex-column">
            <div 
              :key="article.id"
              v-for="article in articles" 
              class="my-card 
                d-flex 
                justify-content-between"
            >
              <Card 
                :article="article"
                :menus="menus"
                @show-detail-card="showDetailCard"
                @search-by-tag="searchByTag"
              >
              </Card>
            </div>
          </div>
        </section>

        <section id="list" class="article--container container-md" v-if="menus.list && user.loggedIn===true">
          <div class="container" style="max-width: 1000px !important">
            <div class="row">
              <h4 class="text-center">Your Article</h4>
            </div>
          </div>

          <div class="d-flex flex-column">
            <div 
              class="my-card 
                d-flex 
                justify-content-between" 
              v-for="article in articles" 
              :key="article.id"
            >
              <Card 
                :article="article"
                :menus="menus"  
                @click-edit="fetchEdit"
                @click-delete="deleteArticle"
              >
              </Card>
            </div>
          </div>
        </section>

        <section id="article" v-else-if="menus.article && user.loggedIn===true">
          <ArticlePage
            :createpage="createPage"
            :newarticle="newArticle"
            @submit-create="createArticle"
            @submit-edit="editArticle"
          ></ArticlePage>
        </section>

        <section
          id="article-detail"
          v-else-if="menus.articleDetail && user.loggedIn===true"
        >
          <ArticleDetail
            :article="article"
            @back-to-article="goToHomePage"
            @search-by-tag="searchByTag"
          ></ArticleDetail>
        </section>

        <section
            v-else-if="menus.searchResult"
        >
            <SearchResultPage 
                :searchValue="searchValue"
                :articleSearchResult="articleSearchResult"
                @show-detail-card="showDetailCard"
                @search-article="searchArticle"
            ></SearchResultPage>
        </section>

        <Footer></Footer>
    </div>

</template>

<script>
const ARTICLE_PATH = `http://localhost:3000/articles`
const TAG_PATH = `http://localhost:3000/tags`
const USER_PATH = `http://localhost:3000/users`
// const ARTICLE_PATH = `http://35.247.176.207/articles`
// const TAG_PATH = `http://35.247.176.207/tags`
// const USER_PATH = `http://35.247.176.207/users`

import ArticleDetail from './js/components/ArticleDetail'
import ArticlePage from './js/components/ArticlePage'
import Card from './js/components/Card'
import Footer from './js/components/Footer'
import Header from './js/components/Header'
import LoginForm from './js/components/LoginForm'
import RegisterForm from './js/components/RegisterForm'
import SearchResultPage from './js/components/SearchResultPage'

export default {
    components: {
        ArticleDetail,
        ArticlePage,
        Card,
        Footer,
        Header,
        LoginForm,
        RegisterForm,
        SearchResultPage
    },
    data() {
        return {
            articles: [],
            user: {
                loggedIn: false,
                name: '',
                email: ''
            },
            newArticle: {
                title: '',
                content: '',
                id: '',
                featured_image: '',
                tags: []
            },
            article: {
                title: '',
                content: '',
                id: '',
                featured_image: '',
                tags: []
            },
            homeArticles: [],
            auth2: '',
            createPage: true,
            searchValue: '',
            menus:
            {
                login: true,
                register: false,
                home: false,
                list: false,
                article: false,
                articleDetail: false,
                searchResult: false
            },
            toggled: false,
            auth2: '',
            articleSearchResult: [],
            tags:[]
        }
    },
    mounted() {
        if(localStorage.token) {
            this.user.loggedIn = true
            this.user.name=localStorage.name
            this.goToHomePage()
            this.fetchArticles()
            this.fetchTags()
        }

        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        });

        gapi.load('auth2', function() {
            gapi.auth2.init();
        });
    },
    methods: {
        searchArticle: function(searchValue) {
            this.searchValue = searchValue

            let config = {
                headers: {
                  token: localStorage.token
                }
            }

            axios
            .get(`${ARTICLE_PATH}?q=${searchValue}`, config)
            .then(({data}) => {
                this.goToSearchResultPage()
                this.articleSearchResult=data
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        searchByTag: function(searchValue) {
            this.searchValue = searchValue

            let config = {
                headers: {
                  token: localStorage.token
                }
            }

            axios
            .get(`${TAG_PATH}/name?q=${searchValue}`, config)
            .then(({data}) => {
                this.searchValue=searchValue
                this.goToSearchResultPage()
                this.articleSearchResult=data[0].articleId
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        login: function(userForm) {
            axios
            .post(`${USER_PATH}/signin`, {
                email: userForm.email,
                password: userForm.password
            })
            .then(user => {
                userForm={}
                localStorage.token = user.data.token
                localStorage.name = user.data.name
                this.user.name=localStorage.name
                this.user.loggedIn=true
                this.fetchArticles()
                this.fetchTags()
                this.goToHomePage()
            })
            .catch(err => {
                userForm={}

                Swal.fire({
                    type: 'error',
                    text: `${err.response.data.err}`
                })
            })
        },
        onSignIn: function(googleUser) {
            const token = googleUser.getAuthResponse().id_token;

            let config = {
                headers: {
                  token
                }
            }

            axios
            .post(`${USER_PATH}/signinGoogle`, {}, config)
            .then( ({data}) => {
                localStorage.token = data.token
                localStorage.name = data.name
                this.user.name=data.name
                this.user.loggedIn=true
                this.fetchArticles()
                this.fetchTags()
                this.goToHomePage()
            })
            .catch(err => {
                console.log(err);
            })
        },
        register: function(userForm) {
            axios
            .post(`${USER_PATH}/signup`, {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password
            })
            .then(user => {
                userForm= {}
                this.goToLoginPage()
            })
            .catch(err => {
                userForm= {}
                console.log(err);
            })
        },
        logout: function() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                gapi.signin2.render('google-signin-button');
            });

            localStorage.clear()

            this.articles=[]
            this.tags=[]
            this.user.loggedIn=false
            this.goToRegisterPage()
        },
        fetchArticles: function() {
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            this.createPage=false
            axios
            .get(`${ARTICLE_PATH}`, config)
            .then(({data}) => {
                this.articles = data
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        fetchMyArticles: function() {
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            this.createPage=false
            axios
            .get(`${ARTICLE_PATH}/myarticle`, config)
            .then(({data}) => {
                this.articles=data
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        fetchTags() {
            let config = {
                headers: {
                  token: localStorage.token
                }
            }

            axios
            .get(`${TAG_PATH}?limit=6`, config)
            .then(({data}) => {
                this.tags=data
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        createArticle: function(data) {
            let formData = new FormData()
            formData.append('title', this.newArticle.title)
            formData.append('content', this.newArticle.content)

            if(data.featured_image) {
                this.fetchTags()
                formData.append('featured_image', this.newArticle.featured_image)
            }

            if(data.tags.length>0) {
                formData.append('tags', JSON.stringify(this.newArticle.tags))
            }

            let config = {
                headers: {
                  token: localStorage.token
                }
            }

            axios
            .post(`${ARTICLE_PATH}`, formData, config)
            .then( ({data}) => {
                this.fetchTags()
                this.articles.push(data)
                this.goToListPage()
            })
            .catch(err => {
                console.log(err);
            })
        },
        showDetailCard: function (id) {
            let config = {
                headers: {
                  token: localStorage.token
                }
            }

            axios
            .get(`${ARTICLE_PATH}/${id}`, config)
            .then(({data}) => {
                this.article=data
                this.goToArticleDetailPage()
            })
            .catch(err => {
                console.log(err);
            })
        },
        editArticle: function() {
            let formData = new FormData()
            formData.append('title', this.newArticle.title)
            formData.append('content', this.newArticle.content)

            if(this.newArticle.featured_image) {
                formData.append('featured_image', this.newArticle.featured_image)
            }

            if(this.newArticle.tags.length>0) {
                formData.append('tags', JSON.stringify(this.newArticle.tags))
            }

            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            const id = this.newArticle.id

            axios
            .patch(`${ARTICLE_PATH}/${id}`, formData, config)
            .then( ({data}) => {
                this.articles=this.articles.map(e=> {
                    if(e._id===this.newArticle.id) {
                        e.title=data.title
                        e.content=data.content
                        e.tags=data.tags
                        e.featured_image=data.featured_image
                    }

                    return e
                })

                this.newArticle={}

                this.goToListPage()
            })
            .catch(err => {
                console.log(err);
            })
        },
        fetchEdit: function(id) {
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            this.goToArticlePage()
            axios
            .get(`${ARTICLE_PATH}/${id}`, config)
            .then(({data}) => {
                this.newArticle.title=data.title
                this.newArticle.content=data.content
                this.newArticle.id=data._id
                this.newArticle.tags=data.tags

                this.createPage=false
                this.fetchTags()
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteArticle: function(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    let config = {
                        headers: {
                          token: localStorage.token,
                          id: localStorage.id
                        }
                    }

                    axios
                    .delete(`${ARTICLE_PATH}/${id}`, config)
                    .then((deleted) => {
                        this.articles = this.articles.filter(article => {
                            if(article._id!==id) {
                                return article
                            }
                        })

                        Swal.fire(
                            'Deleted!',
                            'Your article has been deleted.',
                            'success'
                        )
                    })
                    .catch(err => {
                        console.log(err);
                    })

                }
              })
        },
        goToLoginPage: function() {
            this.menus.login=true
            this.menus.register=false
            this.menus.home=false
            this.menus.list=false
            this.menus.article=false
            this.menus.articleDetail=false
            this.menus.searchResult=false
        },
        goToRegisterPage: function() {
            this.menus.login=false
            this.menus.register=true
            this.menus.home=false
            this.menus.list=false
            this.menus.article=false
            this.menus.articleDetail=false
            this.menus.searchResult=false
        },
        goToHomePage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.home=true
            this.menus.list=false
            this.menus.article=false
            this.menus.articleDetail=false
            this.menus.searchResult=false
        },
        goToListPage: function() {
            this.fetchMyArticles()
            this.menus.login=false
            this.menus.register=false
            this.menus.home=false
            this.menus.list=true
            this.menus.article=false
            this.menus.articleDetail=false
            this.menus.searchResult=false
        },
        goToArticlePage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.home=false
            this.menus.list=false
            this.menus.article=true
            this.menus.articleDetail=false
            this.menus.searchResult=false

            this.createPage=true
            this.newArticle={}
        },
        goToArticleDetailPage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.home=false
            this.menus.list=false
            this.menus.article=false
            this.menus.articleDetail=true
            this.menus.searchResult=false
        },
        goToSearchResultPage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.home=false
            this.menus.list=false
            this.menus.article=false
            this.menus.articleDetail=false
            this.menus.searchResult=true
        },
        menuToggle: function() {
            this.toggled = !this.toggled
        }
    },
    filters: {
        moment: function (date) {
          return moment(date).format('dddd');
        }
    }
}
</script>

<style>

</style>
