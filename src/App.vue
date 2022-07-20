<template>
    <article>
        <app-header v-if="user && !isHeaderHidden"></app-header>
        <home-page-header v-else-if="!isHeaderHidden"></home-page-header>
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
            // this.isHeaderHidden = true
        }
    },
    computed: {
        isHidden() {
            console.log(this.$router.query.params)
            console.log(this.$router.query.query)
            // return this.isHeaderHidden ? 'hidden' : ''
        },
    },
    mounted() {

        console.log('hi!!')
        console.log(this.$route.name)
    },
    components: {
        appHeader,
        homePageHeader
    },


}
</script>

