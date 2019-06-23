Vue.component('preview-article', {
    props: ['article'],
    data(){
        return {}
    },
    methods:{
        closePreview(){
           this.$emit('close')
       }

    },
    template: `
    <div class="row">
        <div class="col">
            <div class="row ml-auto">
                <a href="#" @click.prevent="closePreview" style="margin-left: 90%; color: darkred">Close <i class="fas fa-times"></i></a>
            </div><br>
            <div class="row">
                <div class="col-sm-8 offset-sm-2 text-center">
                        <div class="row" style="width: 900px; height: 100px; text-align: center; margin-left: 10%; color: rgb(56, 4, 56);margin-bottom: -30px;">
                        <h3>{{article.title}}</h3>
                    </div>
                    <img :src="article.thumbnail" alt="thubmnail" style="border: 4px solid black; width: 350px; height: 300px">
                </div>
            </div><br>
            <div class="row">
                <div class="col sm-10 offset-sm-1">
                    <p v-html="article.content" style="color: black; font-size: 15px"></p>
                </div>
            </div>
        </div>
    </div>
    `
  })