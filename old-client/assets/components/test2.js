Vue.component('content-display', {
    props: ['post'],
    data: function () {
      return {
        display: "none",
        // v-bind:class="[display ==='none' ? 'scale-out' : 'scale-out']"
      }
    },
    mounted(){
        this.$root.$on("showCard", () =>{
            if(this.display === "none"){
                this.display = "block"
            }else{
                this.display = "none"
            }
        })
    },
    methods:{
        lol: function(){
            this.$root.$emit("evento", this.word)
        }
    },
    template: `
    <div class="row z-depth-1 scale-transition"  v-bind:style="[display === 'none' ? {'display': 'block'} : {'display' : 'none'}]" style="display: none;">
        <div class="col s12">
            <h4 style="padding-left: 3%; margin-top: 3%;">{{post.title}}</h4>
            <div class="fixed-action-btn horizontal direction-left" style="position: relative;">
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">more_horiz</i></a>
                <ul style="padding-bottom: 56px;">
                    <li><a class="btn-floating red" v-on:click='del(post._id)'><i class="material-icons">delete</i></a></li>
                    <li><a class="btn-floating yellow darken-1 modal-trigger" href="#createBlog"><i class="material-icons">mode_edit</i></a></li>
                </ul>
                </div>
        </div>
        <div class="col s10 offset-s1 z-depth-1">
            <p>Posted by {{post.author.username}} <span class="right">Created at{{post.createdAt}}</span></p>
        </div>
        <div class="col s1"></div>

            <img class="col s8 offset-s2 materialboxed" style="margin-top: 2%;" v-bind:src="post.imgSrc">
    
        <div class="col s2"></div>
        <div class="col s12" style="padding-left: 5%; padding-right: 5%;">
            {{post.content}}
        </div>
    </div>
    `
  })