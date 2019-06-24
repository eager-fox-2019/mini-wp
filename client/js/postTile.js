Vue.component('Posttile', {
    data() {
        return {
            dImg: `https://www.mlmgroup.com/wp-content/uploads/2017/04/structural-engineering-mlm.jpg`,
        }
    },
    props: ['article'],
    computed:{
        isAuthor:function(){
            return this.$parent.user_id === this.article.author
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.article._id)
        },
        remove() {
            this.$emit('remove', this.article._id)
        },
        read() {
            this.$emit('read', this.article._id)
        }
    },

    template: /*html*/`
    <div class ="row border">
        <div class="col-4 p-4">
            <img :src="article.featured_image"  class='post-tile'>
        </div>
        <div class="col-8 p-1">
            <h5 class="p-2">{{article.title}}</h5>
                <!--<div class="p-2" v-html= "article.content"></div>-->                
                <div class= "p-2">
                    <button class="btn btn-primary p-2 " @click="read">read more</button> 
                    <button v-if="isAuthor" class="btn btn-secondary p-2" @click="edit">edit</button> 
                    <button v-if="isAuthor" class="btn btn-danger p-2" @click="remove" >delete</button>                                                                   
                </div>
        </div>
     </div>
    `
})