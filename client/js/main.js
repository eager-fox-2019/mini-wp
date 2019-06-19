let app = new Vue ({
    el : '#app',
    data : {    
        menus : [
            'Home','Article','Create'
        ],
        endMenus : [
            'Sign in', 'Sign up'
        ],
        selectedPage : 'Create',
        tagInputed : []
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
        }
    }
})
