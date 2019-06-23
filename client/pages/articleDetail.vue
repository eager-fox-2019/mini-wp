<template>
    <div v-if='currentPage === "pageArticleDetail"' class="main-content margin-s background-white padding-l box-shadow-m">
        <h3>{{articles[pageArticleDetail.indexArticle].title}}</h3>
        <br/>
        <div v-html="articles[pageArticleDetail.indexArticle].content"></div>
        <br/>
        <button v-on:click="viewList" class="button button-m button-primary">Article List</button>
    </div>
</template>
