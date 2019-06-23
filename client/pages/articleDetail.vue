<template>
    <div class="main-content margin-s background-white padding-l box-shadow-m">
        <h3>{{title}}</h3>
        <br/>
        <div v-html="content"></div>
        <br/>
        <button v-on:click="$emit('clicked-list')" class="button button-m button-primary">Back To Article List</button>
    </div>
</template>

<script>
export default {
    props: ['title', 'content']
}
</script>

