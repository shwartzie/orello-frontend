<template>
    <article>
        <app-header :class="isHidden" v-if="user"></app-header>
        <home-page-header :class="isHidden" v-else></home-page-header>
        <router-view @hideHeader="hideHeader"></router-view>
    </article>
</template>

<script>
//todo add a user getter

import appHeader from "./components/app-header.vue"
import homePageHeader from "./components/home-page-header.vue"


export default {
    name: "app",
    data() {
        return {
            user: false,
            isHeaderHidden: false
        }
    },
    methods: {
        hideHeader() {
            console.log('hi')
            this.isHeaderHidden = true
        }
    },
    computed: {
        isHidden() {
            return this.isHeaderHidden ? 'hidden' : ''
        }
    },
    components: {
        appHeader,
        homePageHeader
    },


}
</script>

