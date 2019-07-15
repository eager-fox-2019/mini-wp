import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Vueditor from 'vueditor'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '313761182339-mjt8tld6afecdnkb8s9vscpg9q24o05f.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
import GSignInButton from 'vue-google-signin-button'

import 'vueditor/dist/style/vueditor.min.css'

// your config here
let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ],
  uploadUrl: '',
  id: '',
  classList: []
};

Vue.use(GSignInButton)
Vue.use(GAuth, gauthOption)
Vue.use(Vuex);
Vue.use(Vueditor, config);

new Vue({
  render: h => h(App)
}).$mount('#app')


