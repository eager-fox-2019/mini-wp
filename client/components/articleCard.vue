<template>
    <div class="card margin-m">
        <div class="media media-1 spinner">
            <img src="../assets/img/colors-contemporary-fashion-965324.jpg" />
        </div>
        <p class="padding-left-m padding-top-s lead">{{title}}</p>
        <p class="padding-left-m padding-bottom-m padding-right-m" v-html="description"></p>
        <div class="margin-right-2 button-group button-group-block">
            <button v-on:click="$emit('clicked-form', index)" class="button button-s button-primary">Manage</button>
            <button v-on:click="$emit('clicked-detail', index)" class="button button-s button-war">View</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'description', 'index'],
    }
</script>