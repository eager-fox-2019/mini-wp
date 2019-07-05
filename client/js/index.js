const ax = axios.create ({
    baseURL : 'http://localhost:3000'
})


let app = new Vue ({
    el : '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
      data() {
        return {
          text: '',
        };
      },
    data : {
        text : '',
        message : 'Message from Vue !',
        articles : [
            {
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            },{
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            },{
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            },{
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            },{
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            },{
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            },{
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9zdbNJUjOAZQhXhdtBJzMoSRLLbyqY4ca5uwsfDAGXjrTkeEOg',
                title : 'Makan Ayam',
                text : 'kemarin saya makan ayam, eh ternyata yang dikasih ayaman rotan',
                date : 'barusan'
            }
        ],
        listMenu : [
                { 
                    text : 'Home',
                    icon : 'fas fa-home'
                },
                { 
                    text : 'Profile',
                    icon : 'fas fa-user'
                },
                { 
                    text : 'Articles',
                    icon : 'fas fa-newspaper'
                }
            ],
        navMenu : [
            {
                text : 'New Articles',
                icon : 'fas fa-edit'
            }
        ],
        selectedButton : '',
        isLogin : localStorage.getItem('token') ? true : false,
        isRegister : false,
        loggedUser : {
            name : localStorage.getItem('username'),
            email : localStorage.getItem('email')
        },
        userLogin : {
            email : '',
            password: ''
        },
        userRegis : {
            email : '',
            username : '',
            password: ''
        }

        
    },
    methods : {
        getArticle : function(){
            ax.get('/allData')
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err)
                })

        },
        change(input){
            
            this.selectedButton = input
            if(input === 'SignIn'){
                // this.signIn()
                this.isRegister = false
                this.selectedButton = ''

            } else if (input === 'Logout'){
                this.signedOut()
                
            } else if (input === 'loginGoogle'){
                this.onSignIn()

            } else if (input === '') {
                this.selectedButton = ''
            } else if (input === 'Register'){
                this.isRegister = true
                this.selectedButton = ''
            }
            
            console.log(input)
            

        },
        onSignIn(googleUser) {
            
            var profile = googleUser.getBasicProfile();
            
            this.loggedUser = {
                id : profile.getId(),
                name : profile.getName(),
                image : profile.getImageUrl(),
                email : profile.getEmail()
            }
            
            this.isLogin = true
        },
        signedOut(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(() => {
              console.log('User signed out.');
              localStorage.clear()
              this.isLogin = false
              this.selectedButton = ''
            });
        },
        signIn(input){
            console.log(input, 'logeeeeeeeeeeeeeeen')
            ax({
                url : '/user/login',
                method : "POST",
                data : {
                    email : input.email,
                    password : input.password
                }
            })
                .then(( {data} ) => {
                    console.log(data)
                    localStorage.setItem('token', data.access_token)
                    localStorage.setItem('userId', data.userId)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('username', data.username)
                    this.loggedUser = {
                        name : data.username,
                        email : data.email,
                    }
                    this.userLogin = {
                        email : '',
                        password: ''
                    }
                    this.isLogin = true
                })
                .catch(err => {
                    console.log(err)
                    this.userLogin = {
                        email : '',
                        password: ''
                    }
                })
            
        },
        submitLogin(){
            console.log({email : this.userLogin.email, password : this.userLogin.password })
            let {email, password } = this.userLogin
            let obj = {email, password}
            this.signIn(obj)
        },
        submitRegis(){
            console.log({email : this.userRegis.email, username : this.userRegis.username, password : this.userRegis.password })
            let {email, username, password } = this.userRegis
            let obj = {email, username, password }
            ax({
                url : '/user/register',
                method : "POST",
                data : obj
            })
                .then(({ data }) => {
                    console.log(data)

                    this.userRegis = {
                        email : '',
                        username : '',
                        password: ''
                    }
                    
                    this.isRegister = false
                    this.signIn(data)
                    
                })
                .catch(err => {
                    console.log(err)
                    this.userRegis = {
                        email : '',
                        username : '',
                        password: ''
                    }
                    console.log(this.userRegis)
                })
        }

        
          

    }
})

function googleSignIn(googleUser){
    console.log('masuk googleSignIn function');
    app.onSignIn(googleUser)
    
}