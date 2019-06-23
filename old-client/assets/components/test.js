Vue.component('content-collection', {
    props:["post"],
    data: function () {
      return {
        word: "CHANGE"
      }
    },
    mounted(){
        this.$root.$on("evento", data =>{
            this.word = data
        })
    },
    methods:{
        emit: function(){
            this.$root.$emit("showCard")
        }
    },
    template: `
    <ul class="collection">
        <li class="collection-item avatar">
            <img src="images/yuna.jpg" alt="" class="circle">
            <span class="title">{{post.title}}</span>
            <p class="truncate">{{post.content}}
            </p>
            <a class="waves-effect waves-light btn secondary-content" style="margin-top: 10px;" @click="emit">Read More</a>
        </li>
    </ul>
    `
  })