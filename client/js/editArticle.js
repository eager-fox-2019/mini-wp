Vue.component('Editor', {
    props: ['article'],
    components: {
        vuewysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        patch(e) {
            this.$emit('patch', this.article)
        },
        tagUpdate(tags){
            this.article.tags = tags
        },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            let image = new Image();
            let reader = new FileReader();
            let vm = this;

            reader.onload = (e) => {
                vm.article.featured_image = e.target.result;
            };            
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.article.featured_image = '';
            this.$refs['file-input'].reset();
        }
    },
    template: /*html*/`
    <div class="col p-2" >
        <div class="container">
            <form @submit.prevent="patch">
                <div class="form-group">
                    <label>title:</label>
                    <input type="text" class="form-control" v-model="article.title">
                </div>
                <div class="form-group">
                        <!--<p>Select an image:</p>-->
                        <!--<input type="file" @change="onFileChange">-->
                    <div class="container fluid">
                        <div class="row">
                            <div style="width:90%">
                                <b-form-file @change="onFileChange"  ref="file-input"  placeholder="Choose a file..." drop-placeholder="Drop file here..."></b-form-file>
                            </div>
                            <div class="px-3 py-1">
                                <b-button variant="danger" @click="removeImage" size="sm">reset</b-button>    
                            </div>
                            <div class="col-sm-12 p-2" :class="{border:Boolean(article.featured_image)}">
                                <b-img :src="article.featured_image" fluid size="sm" />                                
                            </div>                            
                        </div>
                    </div>      
                </div>  
                
                <div class="form-group">
                    <label for="post-content">
                        <p>content:</p>
                    </label>
                    <vuewysiwyg v-model="article.content"></vuewysiwyg>
                </div>
                <div style="padding-bottom:4px">  
                    <label for="post-tags">
                        <p>tags:</p>
                    </label>                  
                    <TagInput :startingChips="article.tags" @updated="tagUpdate"/>
                </div>
                <b-button type="submit" variant="primary">Submit</b-button>
            </form>
            <div></div>
        </div>
    </div>
`
})