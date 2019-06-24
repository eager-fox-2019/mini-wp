import Vue from 'vue';
import App from './App.vue';
import VoerroTagsInput from '@voerro/vue-tagsinput';

Vue.component('tags-input', VoerroTagsInput);
Vue.use(CKEditor);

new Vue(App).$mount('#app');

// function onSignIn(googleUser) {
//   console.log('halo');
  
//   let id_token = googleUser.getAuthResponse().id_token;
//   axios({
//     method: "POST",
//     url: `/users/signingoogle`,
//     data: {
//       id_token
//     }
//   })
//     .then(({ data }) => {
//       if (data.newPass) {
//         app.showMessage(
//           `You Have Been Logged In Successfully. Hurry up change your password now, your password is ${
//             data.newPass
//           }`,
//           "info"
//         );
//       } else {
//         app.showMessage(`You Have Been Logged In Successfully`, "success");
//       }
//       localStorage.setItem("signedInVia", true);
//       localStorage.setItem("access-token", data["access-token"]);
//       app.getAllPosts();
//       app.emptyLogRegForm();
//       app.showLogRegPage = false;
//       app.showMainPage = true;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }