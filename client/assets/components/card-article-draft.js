Vue.component('card-article-draft', {
    props: ['article'],
    data(){
        return {}
    },
    methods:{
        editArtcl(article){
            this.$emit('edit', article)
        },
        deleteArtcl(article){
            this.$emit('remove', article)
        },
        postArticle(article){
            this.$emit('post', article)
        },
        previewArticle(article){
            this.$emit('preview', article)
        }

    },
    template: `
    <div class="row d-flex flex-row-reverse" id="draftPost" style="margin-right: 10px; margin-left: 30px">
        <div class="card" style=" width: 900px; height: 120px">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <h5>{{article.title}}</h5>
                        <p> Created At: {{article.createdAt.substring(0,10)}}</p>
                    </div>
                    <div class="col-sm-6 ">
                        <img class="img-thumbnail" :src="article.thumbnail" alt="thumbnail" style="width: 80px; height: 100px; margin-top: -10px"  />
                        <button @click.prevent="previewArticle(article._id)" type="button" class="btn" style="font-size: 16px; color: #03a575"><i class="fas fa-share"></i> Preview</button>
                        <button type="button" class="btn">
                            <a @click.prevent="editArtcl(article._id)">
                                <i class="fas fa-edit" style="font-size: 23px"></i>
                            </a>
                        </button>
                        <button type="button" class="btn">
                            <a @click.prevent="postArticle(article._id)">
                                <i class="fas fa-upload" style="font-size: 23px"></i>
                            </a>
                        </button> 
                        <button type="button" class="btn">
                            <a @click.prevent="deleteArtcl(article._id)">
                                <i class="fas fa-trash-alt" style="font-size: 23px"></i>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
  })