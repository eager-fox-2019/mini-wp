const ax = axios.create ({
    baseURL : 'http://localhost:3000',
})


let app = new Vue ({
    el : '#app',
    data : {
        message : 'Message from Vue !',
        articles : [
            {
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
        selectedButton : 'Home',
        isLogin : false,
        loggedUser : 'Fadlul'
        
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
            console.log(input)
            this.selectedButton = input
            if(input === 'SignIn'){
                this.isLogin = true
                this.selectedButton = 'Home'
            } else if (input === 'Logout'){
                this.isLogin = false
                this.selectedButton = 'Profile'
            }
            console.log(isLogin)

        }

    }
})