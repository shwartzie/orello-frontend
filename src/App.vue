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
            user: true,
            isHeaderHidden: false
        }
    },
<<<<<<< HEAD
=======
    created() {
        this.isHeaderHidden = false
        const { name } = this.$route
        if (name === 'signup' || name === 'login') {
            this.isHeaderHidden = true
        }
    },
>>>>>>> e701bc7068f104a14d79cd22311532fac55f8209
    components: {
        appHeader,
        homePageHeader
    },
    watch: {
        '$route.path': {
            handler(to, from) {
                if (to === '/signup' || to === '/login') {
                    this.isHeaderHidden = true
                }
                else {
                    this.isHeaderHidden = false
                }
            }
        }
    }
}

</script>

