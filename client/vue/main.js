// const axios = require('axios')
let ax = axios.create({
    baseURL : 'http://localhost:3000/'
})

let instanceVue = new Vue({
    el: '#app',
    components: {
      wysiwyg: vueWysiwyg.default.component,
    },
    data() {
      return {
        text: '',
      };
    },
    data: {
      message: 'Hello Vue!',
      newSomething: '',
      theThing: ['misal ini', 'ini apa?', 'kalo yg ini apa lagi?', 'ahahaaa'],
      nav: ['Home', 'Login', 'Register', 'Search'],
      isLogin: localStorage.getItem("token") ? true : false,
      notDummy : '',
      dummy:[{
          title : 'judul',
          image : 'http://bisniswisata.co.id/wp-content/uploads/2015/11/unik-menarik.jpg',
          description : 'ini apa hayo',
          updated : '3 minutes ago'
      }, {
        title : 'nya',
        image : 'https://pbs.twimg.com/profile_images/568377282088402944/p66QDF-R.jpeg',
        description : 'url',
        updated : '2 minutes ago'
      }, {
        title : 'harusnya',
        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ8q2G4f1AQRVaIVGPDVMpcx_4TvCLZjUEsAS6t-_qSbG8E8-63w',
        description : 'deskripsinya',
        updated : '10 minutes ago'
      }, {
        title : 'urut',
        image : 'https://picjumbo.com/wp-content/uploads/freedom-free-photo-1080x720.jpg',
        description : 'pendek',
        updated : '7 minutes ago'
      }],
      dooob : '',
      user : localStorage.getItem("username") ? localStorage.getItem("username") : '' ,
      userLogin : {
        inputLoginEmail : '',
        inputLoginPassword : ''
      },
      inputArticle : {
        inputTitle : '',
        inputImages : '',
        text : ''
      },
      ownerData : '',
      detail : '',
      register : {
        emailRegister : '',
        passwordRegister : '',
        usernameRegister : ''
      },
      temp : '',
    },
    methods: {
      getImage(file){
        console.log(file.target.files)
      },
        registerFunction(){
          console.log('masuk mana ya?')
          ax({
            method : 'post',
            url : '/user/signup',
            data : {
              email : this.register.emailRegister,
              password : this.register.passwordRegister
            }
          })
          .then(({data}) => {
            console.log(data)
            this.dooob = 'registerDone'
          })
        },
        addSomething(){
            this.theThing.push(this.newSomething)
            this.newSomething = ''
        },
        goLogin(){
            this.isLogin = true
            this.getData()
        },
        goLogout(){
            this.isLogin = false
            localStorage.clear()
        },
        respond(v){
            this.dooob = v
            console.log(this.dooob)
        },
        toEdit(p1, p2){
          this.dooob = p1
          this.temp = p2
          console.log(this.temp)
        },
        data() {
            return {
              text: '',
            };
        },
        runLogin(){
            let dataObj = {email : this.userLogin.inputLoginEmail, password : this.userLogin.inputLoginPassword}
            // this.isLogin = true
            console.log(dataObj)
            console.log('run login masuk')
            ax({
                method : 'post',
                url : '/user/signin',
                data : {
                    email : this.userLogin.inputLoginEmail, 
                    password : this.userLogin.inputLoginPassword
                }
            })
            .then(({data}) => {
                console.log('success')
                console.log(data.payload)
                this.isLogin = true
                this.user = data.payload.email
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", data.payload.email)
                localStorage.setItem("id", data.payload.id)
                this.getData()
                // res.status(200).json(login)
            })
            .catch(err => {
                console.log('err', err)
            })
        },
        getData(){
          console.log('masuk ax?')
          // let token = localStorage.getItem("token")
          ax({
            method : 'get',
            url : '/article/showAll',
            headers : {
              token : localStorage.getItem("token")
            }
          })
          .then(({data}) => {
            console.log('nemu data ga')
            console.log(data, 'ini data')
            // this.notDummy = ''
            this.notDummy = data
          })
          .catch(err => {
            console.log('error')
            console.log(err.message)
          })
        },
        ownerArticle(){
          let authoID = localStorage.getItem("id")
          console.log(authoID)
          ax({
            method : 'get',
            url : `/article/findOne/${authoID}`,
            headers : {
              token : localStorage.getItem("token")
            }
          })
          .then(({data}) => {
            console.log(data, 'data seperti apa?')
            this.dooob = 'own'
            this.ownerData = data
          })
          // .catch(err)
        },
        // findDetail(theId){
        //  
        // },
        uploadImg(){
          console.log(this.$ref.image.files[0])
        },
        submitArticle(){
          console.log('go submit')
          ax({
            method : 'post',
            url : `/article/create`,
            headers : {
              token : localStorage.getItem("token")
            },
            data : {
              title : this.inputArticle.inputTitle,
              content : this.inputArticle.text,
              // images : this.$ref.image.files[0]
            }
          })
          .then(() => {
            console.log('keluar nich')
            this.dooob = ''
            this.getData()
          })
        },
        showDetail(details){
          this.detail = details
          this.dooob = 'details'
        },
        goDelete(artId){
          let theId = localStorage.getItem("id")
          console.log(theId, 'suuup yo')
          ax({
            method : 'delete',
            url : `/article/delete/${theId}/${artId}`,
            headers : {
              token : localStorage.getItem("token")
            }
          })
          .then(()=> {
            console.log('mantap deleted')
            this.dooob = ''
            this.getData()
          })
          .catch(()=>{
            console.log('salah ni ')
          })
        },
        goEdit(){
          console.log('ini ada di function edit')
          let IdUser = localStorage.getItem("id")
          console.log(IdUser)
          ax({
            method : 'patch',
            url : `/article/edit/${IdUser}/${this.temp}`,
            headers : {
              token : localStorage.getItem("token")
            },
            data : {
              title : this.inputArticle.inputTitle,
              content : this.inputArticle.text,
              images : this.inputArticle.inputImages
            }
          })
          .then(() => {
            console.log('done edit')
            this.dooob = ''
            this.getData()
          })
        }
    },
    created : function(){
      // console.log(this.getData())
      this.getData()
    }
  })


  /*
  semua pake v if,
  kalo gia belo login maka yang nongol apa dan kalo udah login yang nongon apa, nanti ada pembedanya
  */