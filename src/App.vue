<template>
    <article>
        <app-header v-if="user && !isHeaderHidden"></app-header>
        <home-page-header v-else-if="!isHeaderHidden"></home-page-header>
        <router-view></router-view>
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
    created() {
        console.log(this.$route.name)
        this.isHeaderHidden = false
        const { name } = this.$route
        if (name === 'signup' || name === 'login') {
            this.isHeaderHidden = true
        }
    },
    components: {
        appHeader,
        homePageHeader
    },


}
</script>

