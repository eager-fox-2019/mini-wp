import Vue from 'vue'
import App from './App.vue'
import VueTruncate from 'vue-truncate-filter'
import {
    createRouter
} from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueScrollReveal from 'vue-scroll-reveal'
import Sticky from 'vue-sticky-directive'
import Quill from 'vue-quill'
Vue.use(Quill)
Vue.use(require('vue-moment'))
let router = createRouter()
Vue.use(VueScrollReveal, {
    class: 'v-scroll-reveal',
    duration: 800,
    scale: 1,
    distance: '10px'
})
Vue.use(Sticky)
Vue.use(VueTruncate)
Vue.use(Buefy)
new Vue({
    router,
    render: h => h(App)
}).$mount("#app")