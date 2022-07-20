<template>
    <article>
        <app-header v-if="user"></app-header>
        <home-page-header v-else></home-page-header>
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
            user: true
        }
    },
    components: {
        appHeader,
        homePageHeader
    },
}
</script>

<style>
</style>
