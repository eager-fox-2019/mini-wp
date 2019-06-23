Vue.component('list-blog', {
    props : ['each'],
    data(){
        return {

        }
    },
    methods : {
        findDetail(val){
            // console.log(val)
        let articleID = val
          console.log(articleID)
          ax({
            method : 'get',
            url : `/article/findOneArticle/${articleID}`,
            headers : {
              token : localStorage.getItem("token")
            }
          })
          .then(({data}) => {
            console.log(data, 'data seperti apa?')
            this.$emit('detail-card', data)
            this.dooob = 'details'
            // this.ownerData = data
            // this.detail = data
          })
        }
    }, 
    template : `
    <div class="row no-gutters">
        <div class="col-md-4">
        <img v-bind:src="each.images" class="card-img" alt="..." style="height: 100%; object-fit: cover">
        </div>
        <!-- <div class="col-md-5" style="background-color: #044589"> -->
        <div class="col-md-8" style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url('https://images.unsplash.com/photo-1450704944629-6a65f6810cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1947&q=80'); color: honeydew">
        <div class="card-body">
            <h5 class="card-title">{{each.title}}</h5>
            <p class="card-text"><small class="text-muted">{{each.created_at}}</small></p>
            <p class="card-text"><small class="text-muted">{{each.author}}</small></p>
            <button v-on:click.prevent="findDetail(each._id)" type="button" class="btn btn-info">Detail</button>
        </div>
        </div>
    </div>
    `
})