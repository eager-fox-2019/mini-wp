Vue.component('form-editor-article', {
    props: ['article'],
    data: function () {
      return {}
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    methods:{
        saveArticle(){
            this.$emit('save', this.article)
        },
        setThumbnail(pict){
            this.article.thumbnail= pict.target.files[0]
        }
    },
    template: `
        <div class="row" style="margin-top: 0; margin-left: 70px; margin-right: 20px">
            <div class="col-sm-10 offset-sm-2">
                <h3 style="text-align: center; color: darkblue" >New Article</h3>
                <form @submit="saveArticle" style="margin-left: 50px"></form>
                    <div class="row">
                        <div class="col-sm-1">
                            <label for="title">Title</label><br><br>
                            <label for="thubmnail">Thumbnail</label><br><br>
                            <label for="article">Article</label><br>
                        </div>
                        <div class="col-sm-10" style="margin-left: 20px">
                            <input type="text" class="form-control" v-model="article.title" placeholder="Enter title"><br>
                            <input type="file" class="form-control-file border" @change="setThumbnail" ref="pict">
                            <small class="form-text text-muted">Thumbnail image can't be changed later!</small><br>
                            <wysiwyg class="form-control-file" v-model="article.content"></wysiwyg>
                        </div>
                    </div><br>
                    <button type="button" class="btn btn-danger" @click="saveArticle" style="margin-left: 50%">Save</button>
                </form>
            </div>
        </div>
    `
  })
