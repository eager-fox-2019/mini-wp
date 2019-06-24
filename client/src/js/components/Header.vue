<template>
    <div>
        <header 
            id="header" 
            class="my-nav 
                my-nav--fixed 
                white 
                border-bottom"
            v-show="user.loggedIn"
        >
            <div class="main">
                <div 
                    class="icon"
                    @click="toHomePage()"
                ><span class="font-noto">Momenku</span></div>
                <div 
                    id="navbarSupportedContent" 
                    class="d-flex" 
                    v-if="user.loggedIn"
                    style="width: 26em;
                        justify-content: flex-end;"
                >
                    <div class="mr-2 relative">
                        <form 
                            @submit.prevent="searchArticle"
                        >
                            <input 
                                type="search" 
                                class="form-control" 
                                placeholder="Search Momenku"
                                aria-describedby="button-addon2" 
                                v-model.trim="search"
                            >
                            <button 
                                class="search-icon"
                                type="submit"
                            ><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                    <div>
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                            <span 
                                id="navbarDropdown" 
                                class="nav-link dropdown-toggle color-grey4 cursor-pointer" 
                                style="display:inline-block"
                                role="button" 
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false"
                            ><i class="far fa-user-circle color-grey4" style="margin-right:5px;"></i></span>

                            <div 
                                class="dropdown-menu 
                                    dropdown-menu-right" 
                                aria-labelledby="navbarDropdown"
                            >
                                <div
                                    class="mb-2"
                                    style="padding: .25rem 1.5rem; font-weight:600;"
                                >{{user.name ? user.name : 'User'}}</div>
                                <span
                                    class="dropdown-item
                                        cursor-pointer"
                                    @click="toArticlePage"
                                >
                                    New Article
                                </span>
                                <span
                                    class="dropdown-item
                                        cursor-pointer"
                                    @click="toListPage"
                                >
                                    My Articles
                                </span>
                                <div class="dropdown-divider"></div>
                                <span
                                    class="dropdown-item 
                                        cursor-pointer"
                                    @click="clickLogout"
                                >Logout</span>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="sub">
                <ul id="list-sub">
                    <li
                        @click="toHomePage()"
                    >HOME</li>
                    <li 
                        v-for="tag in tags"
                        :key="tag._id"
                        @click="searchByTag(tag.name)"
                    >{{tag.name}}</li>
                </ul>   
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: this.searchValue
        }
    },
    props: {
        'user': Object,
        'searchValue': String,
        'tags': Array
    },
    methods: {
        clickLogout() {
            this.$emit('logout')
        },
        toArticlePage() {
            this.$emit('go-to-article-page')
        },
        toHomePage() {
            this.$emit('go-to-home-page')
        },
        toListPage() {
            this.$emit('go-to-list-page')
        },
        searchArticle() {
            this.$emit('search-article', this.search)
            this.search=''
        },
        searchByTag(tagName) {
            this.$emit('search-by-tag', tagName)
        }
    }
}
</script>

<style>

</style>
