import Vue from 'vue/dist/vue.esm';
import ax from './helpers/axiosInstance';

import RegisterLogin from './registerlogin.vue';
import NavComponent from './navcomponent.vue';
import TipTap from './tiptap.vue';
import ArticleCard from './articlecard.vue';
import MyArticle from './myarticle.vue';
import TiptapViewer from './tiptapviewer.vue';

let headers = { 'Authorization': localStorage.getItem('token') };

let app = new Vue({
  el: '#app',
  components: {
    RegisterLogin, NavComponent, TipTap, ArticleCard, MyArticle, TiptapViewer,
  },
  data: {
    alert: '',
    section: 0,
    detailSection: false,
    editSection: false,
    loggedIn: false,
    editor: {
      title: '',
      content: '',
      tags: '',
    },
    clearEditor: false,
    file: null,
    allArticles: [],
    myArticles: [],
    selectedTag: null,
    selectedArticle: null,
  },
  methods: {
    showAlert(str) {
      this.alert = str;
      setTimeout(() => {
        this.alert = '';
      }, 1800);
    },
    goTo(num) {
      this.section = num;
      this.detailSection = false;
      this.editSection = false;
      this.selectedArticle = null;
      if(num === 3) {
        this.editor.title = ''
        this.editor.content = ''
        this.editor.tags = ''
        this.file = null
      } else if(num === 4) {
        console.log(headers)
        ax.get('/articles', { headers })
          .then(({data}) => {
            console.log(data)
            this.allArticles = data
          })
          .catch(err => console.log(err))
      } else if(num === 5) {
        console.log(headers)
        ax.get('/articles/user', { headers })
          .then(({data}) => {
            console.log(data)
            this.myArticles = data
          })
          .catch(err => console.log(err))
      } else if(num === 6) {

      }
    },
    updateEditor(str) {
      this.editor.content = str
    },
    fileSelect(event) {
      this.file = event.target.files[0]
    },
    clearFile() {
      this.file = null
    },
    saveArticle() {
      let formData = new FormData()
      formData.append('title', this.editor.title);
      formData.append('content', this.editor.content);
      formData.append('created_at', new Date());
      formData.append('file', this.file)
      formData.append('tags', this.tagArray)
      this.alert = 'Loading ...';

      ax.post('articles', formData, { headers })
        .then(({data}) => {
          console.log(data)
          this.showAlert('Success')
          this.clearEditor = true;
          this.editor.title = ''
          this.editor.content = ''
          this.editor.tags = ''
          this.file = null
        })
        .catch(err => {
          this.showAlert('Failed')
        })
        .finally(() => {
          this.clearEditor = false;
        })
    },
    updateArticle() {
      let data = {
        title: this.editor.title,
        content: this.editor.content,
        tags: this.tagArray,
      }
      this.alert = 'Loading ...';

      let id = this.selectedArticle._id
      ax.patch(`articles/${id}`, data, { headers })
        .then(({data}) => {
          console.log(data)
          this.showAlert('Updated')
          this.clearEditor = true;
          this.editor.title = ''
          this.editor.content = ''
          this.editor.tags = ''
        })
        .catch(err => {
          this.showAlert('Failed')
        })
        .finally(() => {
          this.goTo(5);
          this.clearEditor = false;
        })
    },
    selectTag(str) {
      if(this.selectedTag === str) {
        this.selectedTag = null;
      } else {
        this.selectedTag = str;
      }
    },
    detail(a) {
      this.selectedArticle = a;
      this.detailSection = true;
    },
    edit(a) {
      this.selectedArticle = a;
      this.editSection = true;
      this.editor.title = a.title
      this.editor.tags = a.tags.join(', ')
    },
    delete1(a) {
      let id = a._id;
      ax.delete(`articles/${id}`, { headers })
        .then(() => {
          this.goTo(5);
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      ax.post('users/check', {}, { headers })
        .then(({data}) => {
          console.log(data)
          this.loggedIn = true;
          this.goTo(4);
        })
        .catch(err => console.log(err.response.data))
        .finally(() => {
          document.getElementById('app').style.visibility = 'visible'
        })
    } else {
        document.getElementById('app').style.visibility = 'visible'
    }
  },
  computed: {
    filename() {
      if(this.file) return this.file.name
    },
    tagArray() {
      let str = this.editor.tags.toLowerCase().trim()
      let str2 = ''
      // ignore (spaces after commas) and (spaces after spaces)
      for(let i = 0; i < str.length; i ++) {
        if(!(str[i] === ' ' && (str[i-1] === ',' || str[i-1] === ' '))) {
          str2 += str[i]
        }
      }
      // unique values only
      return str2.split(',').filter((val, index, self) => {
        if(val === '') {
          return false;
        }
        return self.indexOf(val) === index;
      });
    },
    currentTags() {
      let input;
      let output = [];
      if(this.section === 4) { input = this.allArticles; }
      else if(this.section === 5) { input = this.myArticles; }
      else return [];
      for(let article of input) {
        for(let tag of article.tags) {
          if(output.indexOf(tag) === -1 && (tag !== '')) {
            output.push(tag);
          }
        }
      }
      return output;
    },
    filteredArticles() {
      if(this.section === 4) {
        if(this.selectedTag == null) {
          return this.allArticles
        } else {
          return this.allArticles.filter(article => article.tags.includes(this.selectedTag))
        }
      } else if(this.section === 5) {
        if(this.selectedTag == null) {
          return this.myArticles
        } else {
          return this.myArticles.filter(article => article.tags.includes(this.selectedTag))
        }
      }
    }
  },
  // watch: {
    
  // },
})