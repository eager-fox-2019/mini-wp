<template>
    <div class="container create-article mt-5">
        <h1>Create New Article</h1>
        <form class="mt-5">
            <div class="form-group">
                <input v-model="newArticle.title" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Title article">
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
            <div v-show="!upload" class="form-group before-create">
                <input type="file" ref="file" v-on:change="handleFileUploadCreate" />
            </div>
        </form>
        <div v-show='loading' class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div v-show="upload" class="image-wrapper mt-3">
            <img v-bind:src="newArticle.featuredImage" alt="image" class="image-edit-source">
            <div class="image-edit-overlay">
                <input type="file" ref="file1" v-on:change="handleFileUploadCreateChange">
            </div>
        </div>
        <div>
            <button @click="createArticle" type="button" class="btn btn-primary"  >Create</button>
        </div>
    </div>
</template>

<script>
import axios from '../api/server'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
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
            upload : false,
            loading : false,
            tag : '',
            tags : []
        }
    },
    methods : {
        handleFileUploadCreate() {
            this.newArticle.featuredImage = this.$refs.file.files[0]
            const formData = new FormData()
                  formData.append('image',this.newArticle.featuredImage)
            this.loading = true
            axios.post('/gcsUpload', formData )
            .then(({ data }) =>{
                this.upload = true
                this.newArticle.featuredImage = data[0]
                this.loading = false
                process
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
            .then(({ data })=>{
                let labelDetection = data.responses[0].labelAnnotations
                labelDetection.forEach((el,i) =>{
                    this.tags.push({
                        text : el.description,
                        tiClasses : ['ti-valid']
                    })
                })
            })
            .catch(err =>{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
        },
        handleFileUploadCreateChange() {
            this.newArticle.featuredImage = this.$refs.file1.files[0]
            const formData = new FormData()
                formData.append('image',this.newArticle.featuredImage)
            this.loading = true
            axios.post('/gcsUpload', formData )
            .then(({ data }) =>{
                this.loading = false
                this.upload = true
                this.newArticle.featuredImage = data[0]
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
            .then(({ data })=>{
                let labelDetection = data.responses[0].labelAnnotations
                labelDetection.forEach((el,i) =>{
                    this.tags.push({
                        text : el.description,
                        tiClasses : ['ti-valid']
                    })
                })
            })
            .catch(err =>{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
        },
        createArticle() {
            let token = localStorage.getItem('token')
            let tags = this.tags.map(el => {
                    return el.text
            })
            let article = { ...this.newArticle, ...{ tags } }
            axios.post(`/articles`, article,
                { headers  : 
                    { token }
                }
            )
            .then(({ data }) =>{
                this.$emit('showPage','listArticle')
            })
            .catch(err =>{
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

<style scoped>

</style>
