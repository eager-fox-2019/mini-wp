<template>
    <div class="main-content margin-s background-white padding-l box-shadow-m">
        <h3 v-if='edit'>Edit Article</h3>
        <h3 v-else>Add New Article</h3>
        <br/>
        <input 
            v-on:change="$emit('update:title', $event.target.value)"
            v-bind:value="title"
            type="text"
            placeholder="Title"/>
        <wysiwyg 
            v-on:change="(val) => $emit('update:content', val)"
            v-model="content"
            ></wysiwyg>
        <br/>
        <button 
            v-if="edit" 
            v-on:click="updateArticle" 
            class="button button-m button-primary button-border">
                Submit
        </button>
        <button 
            v-else 
            v-on:click="$emit('clicked-submit-new')" 
            class="button button-m button-primary button-border">
                Submit
        </button>
        <button 
            v-on:click="$emit('clicked-list')" 
            class="button button-m button-error button-border">
                Cancel
        </button>
    </div>
</template>

<script>
import vueWysiwyg from '../assets/js/wsiwig'

export default {
    props: ['title', 'content', 'edit'],
    components: {
        wysiwyg: vueWysiwyg.component,
    }
}
</script>
