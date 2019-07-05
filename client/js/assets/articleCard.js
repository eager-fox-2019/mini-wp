Vue.component('article-card',{
    data(){
        return {

        }
    },
    props : ['article'],
    template : `
    <div>
        <img class="card-img-top" v-bind:src="article.img" alt="Card image cap">
        <div class="card-body">
        
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text">{{ article.text }}</p>
        <p class="card-text"><small class="text-muted">{{ article.date }}</small></p>
        </div>
    </div>
    `
})