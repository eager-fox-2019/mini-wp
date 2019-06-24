Vue.component('Reader', {
    props: ['article'],
    components: {
        vuewysiwyg: vueWysiwyg.default.component,
    },
    methods: {},
    template:/*html*/ `
    <div class="col p-2" >
        <div class="container">
            <h3>{{article.title}}</h3>
            <img :src="article.featured_image">
            <div v-html="article.content">
            </div>
            <div class="container">
                tag:
                <div class="row">
                <div v-for="tag in article.tags">
                    {{tag}}
                </div>                                
                </div>                                
            </div>
        </div>
    </div>
`
})