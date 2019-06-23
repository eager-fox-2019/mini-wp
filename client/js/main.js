new Vue ({
    el : '#app',
    data : {   
        menus : [
            'Home','Article','Create'
        ],
        endMenus : [
            'Sign in', 'Sign up'
        ],
        selectedPage : 'Landing',
        isLogin : false ,
        tagInputed : [],
        users : [],
        quill : '',
        editorData: ""
    },
    methods : {
        selectPage(page){
            this.selectedPage = page
        },
        onSignIn(googleUser){
            console.log ('di google signInd')
            let id_token = googleUser.getAuthResponse().id_token;
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/login/google',
                data :{
                    idtoken :id_token
                }
                .then(response => {
                    localStorage.setItem('token',`${response.token}`)
                    console.log ('berhasil set localstorage')
                })
            })
        },
        onSignOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
            });
        },
        inputTag(inputed){
            let tags = inputed.split(',')
            console.log (tags)
            tags.forEach(element => {
                tagInputed.push(element)
                
            });
        },
        submitArticle(){
            console.log(this.quill.root.innerHTML);
            // console.log(raw)
            this.editorData = this.quill.root.innerHTML
        }
    },
    created : function() {
        console.log ('masuk axios')
        axios ({
            method :'GET',
            url : 'http://localhost:3000/users/'
            // responseType : 'json'
        })
            .then(response => {
                console.log('masuk then')
                console.log (response)
                this.users = response.data
            })
            .catch(err=> {
                console.log('masuk catch')
                console.log (err)
            })
    },
    mounted(){
        this.quill = new Quill('#editor', {
            theme: 'snow'
            });
    }
})
