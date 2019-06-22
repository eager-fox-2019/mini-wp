let app = new Vue ({
    el : '#app',
    data : {   
        menus : [
            'Home','Article','Create'
        ],
        endMenus : [
            'Sign in', 'Sign up'
        ],
        selectedPage : 'Landing',
        tagInputed : [],
        users : [],
        quill : '',
        editorData: ""
    },
    methods : {
        selectPage(page){
            this.selectedPage = page
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
