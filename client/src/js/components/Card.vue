<template>
    <div 
        class="d-flex justify-content-between w-100"    
    >
        <div class="content">
            <div 
                class="d-flex justify-content-between"
            >
                <div 
                    class="cursor-pointer"
                    style="max-width: 145px;"
                    @click="clickCard(article._id)"                        
                >
                    <img 
                        :src="article.featured_image ? article.featured_image : 'https://via.placeholder.com/155x155' " 
                        alt="article.title"
                        style="width:100%;"
                    >
                </div>
                <div class="ml-20">
                    <div 
                        class="my-card-header cursor-pointer"
                        @click="clickCard(article._id)"            
                    >
                        {{article.title}}
                    </div>
                    <div 
                        class="my-card-content cursor-pointer"
                        v-html="article.content"
                        @click="clickCard(article._id)"                
                    ></div>
                    <div 
                        v-if="menus.home"
                        class="color-grey4 cursor-pointer"
                        style="margin-top: 21px;"
                        @click="clickCard(article._id)"            
                    >by {{article.userId.name}}</div>
                    <div
                        class="cursor-pointer"
                        style="color: #616161;
                            font-weight: 500;
                            margin-top: 5px;
                            font-size: 13px;"
                        @click="clickCard(article._id)"                
                    >{{new Date(article.updatedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</div>
                    <div v-if="article.tags">
                        <div 
                            v-for="(tag, index) in article.tags"
                            :key="index"
                            @click="searchByTag(tag)"
                            class="tag"         
                        ># {{tag}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action">
            <div class="btn 
                btn-link 
                cursor-pointer" 
                @click="clickEdit(article._id)"
                v-if="menus.list">Edit</div>
            <div class="color-red 
                fs-17
                pointer-underline" 
                @click="clickDelete(article._id)"
                v-if="menus.list">Delete</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'article': Object,
        'menus': Object
    },
    methods: {
        clickEdit(id) {
            this.$emit('click-edit', id)
        },
        clickDelete(id) {
            this.$emit('click-delete', id)
        },
        clickCard(id) {
            this.$emit('show-detail-card', id)
        },
        searchByTag(tagName) {
            this.$emit('search-by-tag', tagName)
        }
    },
}
</script>
