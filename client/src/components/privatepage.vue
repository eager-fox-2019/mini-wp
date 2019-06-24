<template>
    <div class="container-post">
        <div class="articles">
            <div class="card align-items-*-center" v-for="post in privateFilteredList" v-bind:key="post.id">
                <img class="card-img-top" v-bind:src="post.imgUrl" alt="Image">
                <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <div class="card-text" v-html="shortText(post.content)"></div>
                    <button @click="readMore(post._id)" class="btn btn-primary">Read more</button>
                    <button @click="beforeEdit(post._id)" class="btn btn-warning">Edit</button>
                    <button @click="deleteArticle(post._id)" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["filteredListProps"],
    methods:{
        shortTextFromChild(content){
            this.$emit("short-text", content)
        },
        readMoreFromChild(id){
            this.$emit("read-more", id)
        },
    }
}
</script>