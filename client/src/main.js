import Vue from 'vue';
import App from './App.vue';
import vueWysiwyg from './vueWysiwyg';

Vue.use(vueWysiwyg)
new Vue(App).$mount('#app');
