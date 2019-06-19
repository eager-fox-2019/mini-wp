Vue.component('card', {
    props: ['title', 'description', 'index'],
    template: `
        <div class="card margin-m">
            <div class="media media-1 spinner">
            <img src="assets/img/colors-contemporary-fashion-965324.jpg" />
            </div>
            <p class="padding-left-m padding-top-s lead">{{title}}</p>
            <p class="padding-left-m padding-bottom-m padding-right-m">{{description}}</p>
            <div class="margin-right-2 button-group button-group-block">
            <button v-on:click="() => this.$root.editForm(index)" class="button button-s button-primary">Manage</button>
            <button v-on:click="() => this.$root.viewArticle(index)" class="button button-s button-war">View</button>
            </div>
        </div>
    `
})