<template>
    <nav>
        <div class="nav-miniwp background-primary box-shadow-xxl">
            <div class="padding-xxl flex flex-row justify-content-flex-start align-items-center">
                <button v-if="!disableButton" v-on:click="toggleSidebar" class="button button-white button-border"><i class="fas fa-bars"></i></button>
                <h2 class="branding">KECE BADAI</h2>
            </div>
            <div class="nav-miniwp-control padding-xxl flex flex-row justify-content-flex-end align-items-center">
            <button v-if="!disableButton" v-on:click="$emit('add-form')" id="newArticle" class="button button-white button-text margin-m"> <i class="fas fa-feather-alt"></i> New
                Article</button>
            <button v-if="!disableButton" v-on:click="$emit('logout')" class="button button-warning"> Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['disableButton'],
    methods: {
        toggleSidebar() {
            this.$root.$emit('sidebar-toggle')
        }
    }
}
</script>
