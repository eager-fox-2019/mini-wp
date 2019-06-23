<template>
    <div>
        <div v-on:click="showPerCategory('Fashion')" class="card">
            <img src="https://images.unsplash.com/photo-1505734169265-a86113baa6c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Fashion</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>

        <div class="card bg-primary text-white text-center p-3">
            <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                <footer class="blockquote-footer text-white">
                    <small>
                        aaSomeone famous in <cite title="Source Title">Source Title</cite>
                    </small>
                </footer>
            </blockquote>
        </div>

        <div v-on:click="showPerCategory('Technology')" class="card">
            <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Technology</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>

        <div class="card bg-primary text-white text-center p-3">
            <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                <footer class="blockquote-footer text-white">
                    <small>
                        aaSomeone famous in <cite title="Source Title">Source Title</cite>
                    </small>
                </footer>
            </blockquote>
        </div>

        <div v-on:click="showPerCategory('Food & Drink')" class="card">
            <img src="https://images.unsplash.com/photo-1559183533-ee5f4826d3db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=713&q=80"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Food & Drink</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="card p-3 text-right text-white bg-primary">
            <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">
                    <small class="text-white">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
        <div v-on:click="showPerCategory('Film')" class="card">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=740&q=80"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Film</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional
                    content.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>

        <div v-on:click="showPerCategory('Automotive')" class="card">
            <img src="https://images.unsplash.com/photo-1516951633167-16777c22b146?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Automotive</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="card text-center text-white bg-primary">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has a regular title and short paragraphy of text below it.
                </p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>

        <div v-on:click="showPerCategory('Education')" class="card">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=804&q=80"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Education</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data : function(){
        return {

        }
    },
    methods : {
        showPerCategory(category){
            console.log(category);
            
            this.$emit("changeCategory",`${category}`)
            // this.activePageInside = `${category}`
        }
    }
}
</script>

<style scoped>

</style>


