<template>
    <div>
    <v-toolbar color="blue-grey darken-4" dark fixed app clipped-right>
                    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                    <v-toolbar-title>Minimum Wordpress</v-toolbar-title>
                    <i class="fas fa-pen-alt"></i>...
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-navigation-drawer v-model="drawer" fixed app>
                    <v-container grid-list-md>
                        <v-layout row wrap ml-5>
                            <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
                                <v-avatar :tile="tile" :size="avatarSize" color="grey lighten-4">
                                    <img :src="image" alt="avatar">
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                        <v-layout ml-4 mt-4>
                            <div>
                                <h2>Hi {{first_name}} {{last_name}}..</h2>
                            </div>
                        </v-layout>
                    </v-container>
                    <v-list dense>
                        <v-list-tile @click.stop="left = !left" @click="navigation('myarticle')">
                            <v-list-tile-action>
                                <v-icon>class</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>My Articles</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click.stop="left = !left" @click="navigation('allarticle')">
                            <v-list-tile-action>
                                <v-icon>class</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>All Articles</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <!-- <v-list-tile @click.stop="left = !left" @click="navigation('bookmark')">
                            <v-list-tile-action>
                                <v-icon>star_border</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Bookmark</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile> -->
                        <v-list-tile @click.stop="left = !left" @click="navigation('tags')">
                            <v-list-tile-action>
                                <v-icon>label_outline</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Tags</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click.stop="left = !left" @click="navigation('create')">
                            <v-list-tile-action>
                                <v-icon>create</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>new article</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <v-layout ml-5 pl-4>
                        <v-btn color="white" @click="setLogin">Logout</v-btn>
                    </v-layout>
                </v-navigation-drawer>
                <v-navigation-drawer v-model="left" temporary fixed></v-navigation-drawer>
                <v-navigation-drawer v-model="right" right temporary fixed></v-navigation-drawer>
    </div>
</template>


<script>
export default {
    data(){
        return{
            first_name:localStorage.getItem("first_name"),
            last_name:localStorage.getItem("last_name"),
            image:localStorage.getItem("image"),
            drawer: null,
            tile:false,
            avatarSize:120,
            show:false,
        }
    },
    methods:{
        setLogin(){
            this.$emit('set-logout',false)
        },
        navigation(val){
            this.$emit('set-page',val)
        }
    }
}
</script>