<template>
    <div>
            <div class="col-10 offset-1 ">
                        <section v-if="searchResult !== null">
                        <div @click="generateSinglePostArticle(post)"  v-for="post in filteredArticleCategory" :key="post._id" class="card w-75 my-2">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <img :src=post.image class="card-img" alt="..." height="150" width="100px">
                                    </div>
                                    <div class="col-8">
                                        <div class="row mt-2">
                                            <div class="col-12">

                                                <h3 class="card-title">{{post.title}}</h3>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 mb-5 text-truncate">
                                                <p class="card-text text-truncate">{{post.content}}</p>
                                            </div>
                                        </div>
                                        <div style="display: flex;justify-content:flex-end;margin-bottom: -10px;" class="">
                                            <p class="card-text"><small class="text-muted">{{`${post.UserId.first_name} ${post.UserId.last_name}`}} &nbsp;</small></p>
                                            <p class="card-text"><small class="text-muted">{{post.createdAt.substring(0, 10)}}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </section>
                    </div>
    </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>

</style>


