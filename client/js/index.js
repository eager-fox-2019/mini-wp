const baseURL= 'http://localhost:3000'

 new Vue({
  el: '#app',
  data: {
    homepage:true,
    loginPage:false,
    registerPage: false,
    navbarLogin: false,
    sideNav: false,
    postCardContainer:false,
    draftContainer: false,
    navbarNoLogin: true,
    editPage: '',
    previewPage:'',

    firstName:"",
    lastName:"",
    email: "",
    password: "",

    searchValue:'',
    article:{
      title: '',
      thumbnail: '',
      content: ''
    },
    articles: [],
    newArticle:{
      title: '',
      thumbnail: '',
      content: ''
    },
    editedArticle:{
      id:'',
      title: '',
      thumbnail: '',
      content: ''
    },
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  created(){
    this.checkLogin()
  },

  methods:{

    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.registerPage = true
    },
    
    checkLogin(){

      if (localStorage.token != undefined) {
        this.firstName = localStorage.getItem('firstName')
        this.lastName = localStorage.getItem('lastName')
        this.email = localStorage.getItem('email')
        this.islogin()
      }
      else {
        this.email = ''
        this.password = ''
        this.noLogin()
      }
    },

    toLogin(){
      console.log('masuk to login')
      this.homepage=false
      this.registerPage=false
      this.loginPage=true
    },

    toRegister(){
      this.homepage= false
      this.registerPage= true
    },

    islogin(){
      this.homepage=false
      this.navbarNoLogin=false
      this.loginPage= false
      this.registerPage= false
      this.navbarLogin= true
      this.sideNav = true
      this.postCardContainer=true
      this.draftContainer= false
      this.editPage=''
      this.previewPage=''
      this.fetchPublish()
    },

    noLogin(){
      this.homepage=true
      this.loginPage=false
      this.registerPage= false
      this.navbarNoLogin=true
      this.navbarLogin= false
      this.sideNav= false
      this.postCardContainer=false
      this.editPage= ''
    },

    toNewPost(){
      this.navbarLogin= true
      this.sideNav = true
      this.editPage= 'newpost'
      this.postCardContainer=false
      this.draftContainer= false

    },

    toDraftPost(){
      this.homepage=false
      this.loginPage= false
      this.registerPage= false
      this.navbarLogin= true
      this.sideNav = true
      this.postCardContainer=false
      this.draftContainer= true
      this.editPage= ''
      this.fetchDraft()
    },

    toPreview(id){
      this.homepage=false
      this.loginPage=false
      this.registerPage= false
      this.navbarLogin= false
      this.sideNav= false
      this.postCardContainer=false
      this.draftContainer= false
      this.editPage= ''
      this.previewPage='preview'

      axios({
        method: "get",
        url: `${baseURL}/articles/${id}`,
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.article.title= data.title
        this.article.thumbnail= data.thumbnail
        this.article.content= data.content
      })
      .catch(function(err){
        console.log('masuk error di toPreview js')
        console.log(err)
      })
    },

    toEdit(id){
      console.log(id, 'id edit')
      this.navbarLogin= true
      this.sideNav = true
      this.editPage= 'editpost'
      this.postCardContainer=false
      this.draftContainer= false
      axios({
        method: "get",
        url: `${baseURL}/articles/${id}`,
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(article=>{
        console.log(article.data);
        this.editedArticle.id= id
        this.editedArticle.title= article.data.title
        this.editedArticle.thumbnail= article.data.thumbnail
        this.editedArticle.content= article.data.content
        console.log(this.editedArticle)
      })
      .catch(function(err){
        console.log('masuk error')
        console.log(err)
      })
    },
    submitLogin(){
      console.log('masuk')
      axios({
        method: "post",
        url: `${baseURL}/users/login`,
        data:{
          email: this.email,
          password: this.password
        }
      })
     .then(({data}) => {
       console.log('masuk login')
       console.log(data.userId,'=====')
       this.email=''
       this.password=''
       localStorage.setItem('firstName', data.firstName)
       localStorage.setItem('lastName', data.lastName)
       localStorage.setItem('userId', data.userId)
       localStorage.setItem('token', data.token)
       this.firstName = localStorage.getItem('firstName')
       this.islogin()

     })
     .catch(function(err){
      console.log('masuk error')
      console.log(err, 'ini errroorrrr')
    })
    },
    submitRegister(){
      console.log('masuk submit register')
      let newUser={
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
      }
      axios({
        method: "post",
        url: `${baseURL}/users/register`,
        data:newUser
      })
      .then(({data})=>{
        this.submitLogin()
        console.log(data)
        this.firstName=''
        this.lastName=''
        this.email= data.email,
        this.password= data.password
        
      })
      .catch(function(err){
        console.log('masuk error')
        console.log(err)
      })
    },

    // onSignIn(googleUser) {
    //   console.log('masuk google sign in')
      
    //   var id_token = googleUser.getAuthResponse().id_token;
    //     console.log(id_token, 'ini id token')
    //       axios({
    //         method:'POST',
    //         url: "http://localhost:3000/users/loginGoogle",
    //         data:{
    //             idToken: id_token
    //         },
    //       })
    //      .done(function(Data){
    //        console.log(Data)
    //         localStorage.setItem('firstName', data.firstName)
    //         localStorage.setItem('lastName', data.lastName)
    //         localStorage.setItem('userId', data.userId)
    //         localStorage.setItem('token', data.token)
    //         this.islogin()
    //      })
    //      .fail(function(err){
    //       console.log(err)
      
    //      })
    //   },
      
    logout(){
      Swal.fire({
        title: 'Are you sure to sign out?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.firstName=''
          localStorage.removeItem('firstName')
          localStorage.removeItem('lastName')
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          this.noLogin()

          var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
            .then(function(){
              console.log('User signed out')
              this.noLogin()
            })
            .catch(function(err){
              console.log(err)
            })
          
          
        }
      })
    },

    saveArticle(){
      console.log(this.newArticle.thumbnail, 'ini new article')
      let formData = new FormData()
      formData.append('title', this.newArticle.title)
      formData.append('thumbnail', this.newArticle.thumbnail)
      formData.append('content', this.newArticle.content)
      formData.append('userId', localStorage.getItem('userId'))


      console.log(formData)

      axios({
        method: "post",
        url: `${baseURL}/articles/draft`,
        data: formData,
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data)
        Swal.fire(
          'Your article have been saved!',
          'Saved!',
          'success'
        )
          this.newArticle.title=''
          this.newArticle.thumbnail=''
          this.newArticle.content=''
           this.toDraftPost()
      })
      .catch(function(err){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Fill All The content!',
        })
        console.log('masuk error')
        console.log(err)
      })
    },

    postArticle(){
      console.log('masuk post article')
      axios({
        method: "post",
        url: `${baseURL}/articles/published`,
        data:{
          title: this.newArticle.title,
          thumbnail: this.newArticle.thumbnail,
          content: this.newArticle.content,
          userId: localStorage.getItem('userId')
        },
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data)
        Swal.fire(
          'Your article have been published!',
          'Published!',
          'success'
        )
        this.islogin()
      })
      .catch(function(err){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Fill All The content!',
        })
        console.log('masuk error publish')
        console.log(err)
      })
    },

    postDraftArticle(id){
      axios({
        method: "patch",
        url: `${baseURL}/articles/${id}`,
        data:{
          field: 'status',
          value: 'published'
        },
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data)
        Swal.fire(
          'Your article have been published!',
          'Success!',
          'success'
        )
        this.toDraftPost()
      })
      .catch(function(err){
        console.log('masuk error publish')
        console.log(err)
      })
    },

    fetchDraft(){
      axios({
        method: "get",
        url: `${baseURL}/articles/draft/${localStorage.userId}`,
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{

        console.log(data)
        this.articles= data
      })
      .catch(function(err){
        console.log('masuk error')
        console.log(err)
      })
    },

    fetchPublish(){
      console.log('masuk fetch client', localStorage.getItem('userId') )
      let id= localStorage.getItem('userId')
      axios({
        method: "get",
        url: `${baseURL}/articles/published/${id}`,
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        // console.log('ini hasil datanya', data)
        this.articles= data
      })
      .catch(function(err){
        console.log('masuk error')
        console.log(err)
      })
    },

    saveEditArticle(){
      console.log(this.editedArticle, 'ini data yang masuk saveEditArticle')
      let formData = new FormData()
      formData.append('title', this.editedArticle.title)
      formData.append('thumbnail', this.editedArticle.thumbnail)
      formData.append('content', this.editedArticle.content)

      axios({
        method: "put",
        url: `${baseURL}/articles/${this.editedArticle.id}`,
        data: formData,
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        // console.log(data)
        Swal.fire(
          'Your article have been saved!',
          'Saved!',
          'success'
        )
          this.editedArticle.title=''
          this.editedArticle.thumbnail=''
          this.editedArticle.content=''
          this.islogin()
      })
      .catch(function(err){
        console.log('masuk error')
        console.log(err)
      })
    },

    deleteArticle(id){
      console.log(id, 'id delete')
      Swal.fire({
        title: 'Delete this items?',
        text: name,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if(result.value){
          axios({
            method: "delete",
            url: `${baseURL}/articles/${id}`,
            headers:{
              'token': localStorage.getItem('token')
            }
          })
          .then(data=>{
            Swal.fire(
              'Your article have been deleted!',
              'Deleted!',
              'success'
            )
            this.fetchDraft()
          })
          .catch(function(err){
            console.log('masuk error')
            console.log(err)
          })
        }
      })
      
    }
    
  },
  
  computed:{
    filterArticle(){
      let dataFilter= this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.searchValue.toLowerCase())
      })

      if(dataFilter.length === 0) return this.articles
        else return dataFilter
    }
  }
  
})
  