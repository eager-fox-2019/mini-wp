let baseUrl = `http://localhost:3000`;

new Vue({
  el: '#app',
  data:{
     newArticle: {
             title: '',
             content:'',
             picture:''
     },
     datauser:{
             username: '',
             email: '',
             password: ''
     },
     articles: [],
     editType: false,
     logintype: false,
     datackeditor:{

     }
  },
  created(){
          console.log(this.logintype);
   axios({
       method: "GET",
       url: `${baseUrl}/articles`
   })
   .then(({data})=>{      
       this.articles = data

   })
   .catch((err)=>{
       console.log(err);
       
   })
},
  methods:{
     login(){
        axios({
                method: "POST",
                url:`${baseUrl}/users/login`,
                data: {
                        email: this.datauser.email,
                        password: this.datauser.password
                }
        })
        .then(({data})=>{
                console.log(data,'login');
                
                localStorage.setItem('token',data.token)
                this.logintype =true
                
        })
        .catch((err)=>{
                console.log(err);
                
        })
     },
     register(){
        axios({
                method: "POST",
                url:`${baseUrl}/users/register`,
                data: {
                        username: this.datauser.username,
                        email: this.datauser.email,
                        password: this.datauser.password
                }
        })
        .then(({data})=>{
                console.log(data,"regis");
                
        })
        .catch((err)=>{
                console.log(err);
                
        })
     },
     addArticle(){
             console.log('add');
             console.log(this.newArticle);
        axios({
                method: "POST",
                url: `${baseUrl}/articles`,
                data : {
                        title: this.newArticle.title,
                        content: this.newArticle.content,
                        picture: this.newArticle.picture
                }
            })
            .then(({data})=>{   
                this.articles.push(data)
                console.log(this.articles);
                
            })
            .catch((err)=>{
                console.log(err);
        
            })
     },
     previewFile(event){
        console.log(event.target.files);
     },
     removeArticle(post){
             axios({
                     method: "DELETE",
                     url: `${baseUrl}/articles/${post._id}`
             })
             .then(({data}) =>{
                let index = this.articles.indexOf(post)
                this.articles.splice(index,1)
             })
             .catch((err)=>{
                     console.log(err);      
             })
     },
     editArticle(post){
             console.log(post);
             
        axios({
                method: "PUT",
                url: `${baseUrl}/articles/${post._id}`,
                data : {
                        title: this.newArticle.title,
                        content: this.newArticle.content
                }
        })
        .then(({data}) =>{
                console.log(data+'======');
                
        })
        .catch((err)=>{
                console.log(err);      
        })
     }
  }
})


        // var editor
        // ClassicEditor
        // .create( document.querySelector( '#ckeditor' ) )
        // .then( neweditor => {
        //         console.log( 'ini ck',neweditor.getData() );
        //         neweditor.setData( '<p>Some text.</p>' );
        //         editor = neweditor
        //         console.log(editor.getData());

        // } )
        // .catch( error => {
        //         console.error( error );
        // } );     

        