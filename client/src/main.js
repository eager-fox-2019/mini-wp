import Vue from 'vue';
import App from './App.vue';
import wysiwyg from "vue-wysiwyg";
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '435243723579-rk8fjkdnman011rj78bobfn8p41u40je.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }

// Vue.use(GAuth, gauthOption)
Vue.use(wysiwyg, {}); // config is optional. more below

new Vue(App).$mount('#app');