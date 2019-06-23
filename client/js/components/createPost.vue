<template>
    <div v-if="show === 'createPost'">
        <div>
            <h1>Write your article here!</h1>
            <form @submit.prevent="createPost">
                Title: <br>
                <input type="text" v-model="newPost.title"><br>
                Description: <br>
                <wysiwyg v-model="newPost.content"></wysiwyg>
                Image:<br>
                <input type="file" class="form-control-file" v-on:change="uploadImage"><br>
                Add tags:<br>
                <div class="input-group mb-3">
                    <input v-model="currentTag" type="text" class="form-control"
                        placeholder="Insert tag here">
                    <div class="input-group-append">
                        <button @click.prevent="addTag" class="btn btn-outline-secondary"
                            type="button">Button</button>
                    </div>
                </div><br>
                <h6>Tags:</h6>
                <ul :key="tag.id" v-for="tag in newPost.tags">
                    <li>{{ tag }}</li>
                    <button type="submit" class="btn btn-danger"
                        @click.prevent="removeTag(tag)">Delete</button>
                </ul>

                <button type="submit">Confirm</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        newPost: Object
    },
    data(){
        return{
            
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,

    },
    methods:{
        createPost(){
            this.$emit(createPost)
        },
        removeTag(tag){
            this.$emit('removeTag', tag)
        },
        addTag(){
            this.$emit(addTag)
        }
    }
}
</script>

<style scoped>

</style>
