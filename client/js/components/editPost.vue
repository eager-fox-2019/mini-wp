<template>
    <div v-if="show === 'editPostPage'">
        <div>
            <h1>Edit here!</h1>
            <form @submit.prevent="editPost(editedPost._id)">
                Title: <br>
                <input type="text" v-model="editedPost.title"><br>
                Description: <br>
                <wysiwyg v-model="editedPost.content">{{editedPost.content}}</wysiwyg>
                Image<br>
                <input type="file" class="form-control-file" v-on:change="changeImage">
                Add tags:<br>
                <div class="input-group mb-3">
                    <input v-model="currentTagEdit" type="text" class="form-control"
                        placeholder="Insert tag here">
                    <div class="input-group-append">
                        <button @click.prevent="addTagEdit" class="btn btn-outline-secondary"
                            type="button">Button</button>
                    </div>
                </div><br>
                Tags:<br>
                <ul :key="tag.id" v-for="tag in editedPost.tags">
                    <li>{{ tag }}</li>
                    <button type="submit" class="btn btn-danger"
                        @click.prevent="removeTagEdit(tag)">Delete</button>
                </ul>
                <button type="submit">Confirm</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        editedPost: Object
    },
    data(){
        return{

        }
    },
    methods:{
        editPost(id){
            this.$emit('editPost', id)
        },
        addTagEdit(){
            this.$emit(addTagEdit)
        },
        removeTagEdit(tag){
            this.$emit('removeTagEdit', tag)
        }
    }
}
</script>

<style scoped>

</style>

