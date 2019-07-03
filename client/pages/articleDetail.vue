<template>
    <div class="main-content margin-s background-white padding-l box-shadow-m">
        <div class="flex flex-row">
            <div style="width: 300px; height: 300px;">
                <div class="media media-1 spinner">
                    <img v-bind:src="image" />
                </div>
            </div>
            <div class="padding-left-xl">
                <h3>{{title}}</h3>
                <br/>
                <div v-html="content"></div>
                <br/>
                <button v-if="!disableButton" v-on:click="$emit('clicked-list')" class="button button-m button-primary">Back To Article List</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'content', 'image', 'disableButton']
}
</script>

