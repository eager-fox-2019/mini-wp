
var vueApp = new Vue({
    el: '#app',
    data: {
        articles: [
            
        ],
        sidebarOpen: true
    }, 
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen
        }
    }
})