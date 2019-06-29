import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from '../src/App.vue'
import router from './router'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = new Vue({
    router,
    render: h=>h(App)
}).$mount('#app')