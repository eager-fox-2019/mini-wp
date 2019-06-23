import Vue from 'vue';
import App from './component/App.vue';


// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import vueWysiwyg from './vueWysiwyg.js'
import './vueWysiwyg.css'

Vue.use(vueWysiwyg)
Vue.use(BootstrapVue)
new Vue(App).$mount('#app');