<template>
    <div>
        <Navbar @showPage="contentPage = $event" @initial="$emit('initial')"> </Navbar>
        <div class="row home">
            <div class="col-2 p-1 side-bar">
                <NavbarSide @showPage="contentPage = $event"></NavbarSide>
            </div>
            <div class="col-10">
                <ListArticle v-if="contentPage == 'listArticle'" @showPage="contentPage= $event[0] , article = $event[1]" :tag="tag"></ListArticle>
                <CreateArticle v-if="contentPage == 'createArticle'" @showPage="contentPage = $event" > </CreateArticle>
                <UpdateArticle v-if="contentPage == 'updateArticle'" @showPage="contentPage = $event" :article="article" > </UpdateArticle>
                <DetailArticle v-if="contentPage == 'detailArticle'" @showPage="contentPage = $event[0], tag = $event[1]" :article="article"></DetailArticle>
                <TagFilterArticle v-if="contentPage == 'tagFilterArticle'" @showPage="contentPage = $event" :tag="tag" ></TagFilterArticle>  
                <Conversation v-if="contentPage == 'conversation'"></Conversation>              
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import NavbarSide from './NavbarSide'
import ListArticle from './ListArticle'
import CreateArticle from './CreateArticle'
import UpdateArticle from './UpdateArticle'
import DetailArticle from './DetailArticle'
import TagFilterArticle from './TagFilterArticle'
import Conversation from './Conversation'

export default {
    components : {
        Navbar,
        NavbarSide,
        ListArticle,
        CreateArticle,
        UpdateArticle,
        DetailArticle,
        TagFilterArticle,
        Conversation
    },
    data () {
        return {
            contentPage : 'listArticle',
            article : '',
            tag : ''
        }
    }
}
</script>

<style>

</style>
