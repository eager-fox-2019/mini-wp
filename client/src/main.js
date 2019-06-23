
import Vue from 'vue';
import App from './App.vue';
import wysiwyg from 'vue-wysiwyg';

Vue.use(wysiwyg, {}); // config is optional. more below

new Vue(App).$mount('#app');




// var app = new Vue({
//   el: '#app',
//   data: {
//     isLogin: true,
//     message: 'Hello Vue!',
//     page: 'articleList',
//     articleTitle: '',
//     articleDescription: '',
//     articleSearchTitle: '',
//     titleEdit: '',
//     descriptionEdit: '',
//     idEdit: '',
//     articles: [],
//     selectedArticle: {}
//   },
//   components: {
//     'editor': Editor // <- Important part
//   },
//   created() {
//     axios({
//         method: 'GET',
//         url: 'http://localhost:3000/api/articles'
//       })
//       .then(({
//         data
//       }) => {
//         this.articles = data;
//       })
//       .catch((err) => {
//         console.log('anyong lou shan');
//       })
//   },
//   methods: {
//     changePage(pageString) {
//       this.page = pageString
//     },
//     addArticle() {
//       if (this.articleTitle.length == 0) {
//         Swal.fire({
//           title: 'Oops',
//           text: 'Title cannot be empty',
//           type: 'error',
//           confirmButtonText: 'Cool'
//         })
//         return '';
//       }
//       axios({
//           method: 'POST',
//           url: 'http://localhost:3000/api/articles',
//           data: {
//             title: this.articleTitle,
//             description: this.articleDescription
//           }
//         })
//         .then((response) => {
//           this.articleTitle = '';
//           this.articleDescription = '';
//           Swal.fire(
//             'Success',
//             'Data added succesfully',
//             'success'
//           )
//           this.articles.push(response.data);
//           this.changePage('articleList');
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     },
//     displayArticle(id) {
//       for (let article of this.articles) {
//         if (article._id == id) {
//           this.selectedArticle = article;
//         }
//       }
//       this.page = 'displayArticle';
//     },
//     showEditPage(id) {
//       for (const article of this.articles) {
//         if (id == article._id) {
//           this.selectedArticle = article;
//         }
//       }
//       this.idEdit = id;
//       this.titleEdit = this.selectedArticle.title;
//       this.descriptionEdit = this.selectedArticle.content;
//       this.page = 'editArticle';
//     },
//     editArticle() {
//       axios({
//           method: 'PATCH',
//           url: `http://localhost:3000/api/articles/${this.idEdit}`,
//           data: {
//             title: this.titleEdit,
//             description: this.descriptionEdit
//           }
//         })
//         .then((response) => {
//           let articleIndex = -1;
//           for (let i = 0; i < this.articles.length; i++) {
//             if (this.articles[i]._id == this.idEdit) {
//               articleIndex = i;
//             }
//           }
//           this.articles[articleIndex].title = this.titleEdit;
//           this.articles[articleIndex].content = this.descriptionEdit;
//           this.idEdit = '';
//           this.titleEdit = '';
//           this.descriptionEdit = '';
//           this.changePage('articleList');
//           Swal.fire(
//             'Success',
//             'Data edited succesfully',
//             'success'
//           );
//         })
//         .catch((err) => {
//           console.log(err);

//           Swal.fire({
//             title: 'Oops',
//             text: 'Something Wrong',
//             type: 'error',
//             confirmButtonText: 'Cool'
//           })
//         })
//     },
//     deleteArticle(id) {
//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then((result) => {
//         if (result.value) {
//           axios({
//             method: 'DELETE',
//             url: `http://localhost:3000/api/articles/${id}`
//           })
//           .then((response) => {
//             let articleIndex = -1;
//             for (let i = 0; i < this.articles.length; i++) {
//               if (this.articles[i]._id == this.idEdit) {
//                 articleIndex = i;
//               }
//             }
//             this.articles.splice(articleIndex, 1);
//             Swal.fire(
//               'Success',
//               'Data edited succesfully',
//               'success'
//             );
//             this.page = 'articleList';
//           })
//           .catch((err) => {
//             console.log(err);
//             Swal.fire({
//               title: 'Oops',
//               text: 'Something Wrong',
//               type: 'error',
//               confirmButtonText: 'Cool'
//             })
//           });
//         }
//       })
//     }
//   },
//   computed: {
//     filteredArticle() {
//       return this.articles.filter((article) => {
//         return article.title.toLowerCase().includes(this.articleSearchTitle.toLowerCase());
//       })
//     }
//   }
// })
