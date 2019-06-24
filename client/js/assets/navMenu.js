Vue.component('menu-bar', {
    data(){

    },
    props : ['filler'],
    template : `
        <i v-bind:class="filler.icon" class="mr-1 ml-5"></i> {{ filler.text }}<span class="sr-only">(current)</span>
    `
})