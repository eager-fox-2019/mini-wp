Vue.component('sidebar', {
    data: function () {
        return {
            collapsed: true
        }
    },
    methods: {
        toggleSidebar() {
            this.collapsed = !this.collapsed
        }
    },
    template: `
    <div id="sidebar" class="{{(collapsed? 'collapsed' : '')}}  flex flex-column justify-row-flex-start">
        <div class="nav-miniwp-sidebar background-primary-700" style="height: 80px;"></div>
        <div class="sidebar-content">
          <div class="flex flex-column justify-content-flex-start align-items-center padding-left-m padding-right-m padding-bottom-m">
            <p class="lead padding-top-m">Your Site</p>
            <button class="button button-block button-text align-left"><i class="fas fa-desktop"></i> View Site</button>
            <button class="button button-block button-text align-left"><i class="fas fa-chart-bar"></i> Stats</button>
            <button class="button button-block button-text align-left"><i class="fas fa-hiking"></i> Activity</button>
            <p class="lead padding-top-m">Manage</p>
            <button class="button button-block button-text align-left"><i class="fas fa-newspaper"></i> Manage Article</button>
            <button class="button button-block button-text align-left"><i class="fas fa-comment"></i> Manage Comment</button>
          </div>
        </div>
    </div>
    `
})