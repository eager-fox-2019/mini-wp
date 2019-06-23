import Vue from 'vue';
import App from './App.vue';
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {})
new Vue(App).$mount('#app');