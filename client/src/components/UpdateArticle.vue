<template>
    <div class="container create-article mt-5">
        <h1>Update Article</h1>
        <form class="mt-5">
            <div class="form-group">
            <input v-model="newArticle.title" type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Title article">
            </div>
            <div class="form-group">
            <wysiwyg v-model="newArticle.content"></wysiwyg>
            </div>
            <div class="form-group">
                <VueTagsInput v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"> 
                </VueTagsInput>
            </div>
        </form>
        <div v-show='loading' class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div v-show="!loading" class="image-wrapper mt-3">
            <img v-bind:src="newArticle.featuredImage" alt="image edited" class="image-edit-source">
            <div class="image-edit-overlay">
                <input type="file" ref="file" v-on:change="handleFileUploadUpdate">
            </div>
        </div>
        <button @click="updateArticle" type="button" class="btn btn-primary btn-update" id="weird-button">Update</button>
    </div>
</template>

<script>
import axios from '../api/server'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
    props : ['article'],
    components : {
        VueTagsInput
    },
    data () {
        return {
            newArticle : {
                title : '',
                content : '',
                featuredImage : ''
            },
            isImageChange : false,
            loading : false,
            tag : '',
            tags : []
        }
    },
    created () {
        this.newArticle = this.article
        this.newArticle.tags.forEach((el,i) => {
            this.tags.push({
                text : this.newArticle.tags[i],
                tiClasses : ['ti-valid']
            })
        })
    },
    methods : {
        handleFileUploadUpdate() {
            this.newArticle.featuredImage = this.$refs.file.files[0]
            const formData = new FormData()
                  formData.append('image',this.newArticle.featuredImage)
            this.loading = true
            axios.post('/gcsUpload', formData )
            .then(({ data }) => {
                this.loading = false
                this.newArticle.featuredImage = data[0]
                this.tags = []
                return axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GVISION_KEY}`,{
                    "requests": [
                        {
                            "image": {
                                "source": {
                                    "gcsImageUri": `gs://${data[1]}`
                                } 
                            },
                            "features": [
                                {
                                    "type": "LABEL_DETECTION",
                                    "maxResults": 10
                                }
                            ]
                        }
                    ]
                })
            })
            .then(({ data }) => {
                let labelDetection = data.responses[0].labelAnnotations
                labelDetection.forEach((el,i) => {
                    this.tags.push({
                        text : el.description,
                        tiClasses : ['ti-valid']
                    })
                })
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
        },
        updateArticle() {
            let token = localStorage.getItem('token')
            let tags = this.tags.map(el => {
                return el.text
            })
            let article = { ...this.newArticle, ...{ tags }}
            axios.put(`/articles/${this.newArticle._id}`, article, 
            {
                headers: { token }
            })
            .then(({ data }) => {
                this.$emit('showPage','listArticle')
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
        }
    }
}
</script>

<style>

</style>

