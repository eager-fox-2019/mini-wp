<template>
<b-col cols='4'>
<b-card
    v-if='article.image'
    :title=article.title
    :img-src=article.image
    img-alt="Image"
    img-top
    tag="article"
    class="mb-2"
  >
    <b-card-text>
        {{article.content}}
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
<b-card
    v-else
    :title=article.title
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
        {{article.content}}
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
  </b-col>
</template>
<script>
export default{
    name:'ArticleCard',
    props:['article']

}
</script>