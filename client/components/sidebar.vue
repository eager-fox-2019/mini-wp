<template>
    <div id="sidebar" v-bind:class="{ collapsed: !sidebarOpen }" class="flex flex-column justify-row-flex-start">
        <div class="nav-miniwp-sidebar background-primary-700" style="height: 80px;"></div>
        <div class="sidebar-content">
          <div class="flex flex-column justify-content-flex-start align-items-center padding-left-m padding-right-m padding-bottom-m">
            <p class="lead padding-top-m">Your Site</p>
            <button class="button button-block button-text align-left"
                    v-on:click="$emit('set-route', 'publicPage')"><i class="fas fa-desktop"></i> View Site</button>
            <!-- <button class="button button-block button-text align-left"><i class="fas fa-chart-bar"></i> Stats</button> -->
            <!-- <button class="button button-block button-text align-left"><i class="fas fa-hiking"></i> Activity</button> -->
            <p class="lead padding-top-m">Manage</p>
            <button class="button button-block button-text align-left"
                    v-on:click="$emit('set-route', 'articleList')"><i class="fas fa-newspaper"></i> Manage Article</button>
            <!-- <button class="button button-block button-text align-left"><i class="fas fa-comment"></i> Manage Comment</button> -->
          </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$root.$on('sidebar-toggle', this.toggleSidebar)
    },
    beforeDestroy() {
        this.$root.$off('sidebar-toggle', this.toggleSidebar)
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen
        }
    },
    data() {
        return {
            sidebarOpen: false
        }
    },
}
</script>