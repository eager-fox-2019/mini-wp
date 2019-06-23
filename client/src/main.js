import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import wysiwyg from "vue-wysiwyg";
import GSignInButton from 'vue-google-signin-button'
import 'vuetify/dist/vuetify.min.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(GSignInButton)
Vue.use(wysiwyg, {
  hideModules: { "bold": true },
  iconOverrides: { "bold": "<i class='your-custom-icon'></i>" },
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  },
  maxHeight: "500px",
  forcePlainTextOnPaste: true
});
Vue.use( Vuetify )

Vue.config.devtools = true
new Vue(App).$mount('#app');