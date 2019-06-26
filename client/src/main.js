import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import 'vuetify/dist/vuetify.min.css';
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {})
Vue.use(axios)
Vue.use(Vuetify)

new Vue(App).$mount('#app');