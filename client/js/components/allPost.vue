<template>
    <div v-if="show === 'allPost'">
        <div class="container">
            <div class="accordion" id="accordionExample">
                <!--  Search by Title -->
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Search by Title
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <input class="input-group" type="text" v-model="searchAllPost"
                            placeholder="You can search here">

                    </div>
                </div>
                
                 <!--  Search by Tag -->
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#collapseTwo" aria-expanded="false"
                                aria-controls="collapseTwo">
                                Search by Tag
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                        data-parent="#accordionExample">
                        <input class="input-group" type="text" v-model="searchAllTag"
                            placeholder="You can search here">

                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex justify-content-between">
            <div class="col-md-4" :key="post.id" v-for="post in filteredAllPosts" style="padding: 50px;">
                <div class="card">
                    <div class="card-body" style="background-color: #F1E7FE;">
                        <img v-bind:src="articlecomponent.image" style="height: 250px; width: 100%;">
                        <h5 style="font-weight: bold;" class="card-title">{{ articlecomponent.title }}</h5>
                        <h6>{{ articlecomponent.createdAt }}</h6>
                        <p class="card-text" v-html="articlecomponent.content"></p>
                        <div>                
                            <ul class="tags" :key="tag.id" v-for="tag in articlecomponent.tags">
                                <li>{{ tag }}</li>
                            </ul>
                        </div>
                        <button type="submit" class="btn btn-warning"
                            @click="toEditPage(articlecomponent._id)">Edit</button>
                        <button type="submit" class="btn btn-danger"
                            @click="deleteArticle(articlecomponent._id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>
