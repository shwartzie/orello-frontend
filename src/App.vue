<template>
    <article>
        <app-header v-if="isAppHeader && !isHeaderHidden"></app-header>
        <home-page-header v-else-if="!isHeaderHidden"></home-page-header>
        <router-view @setHeader="onSetHeader"></router-view>
    </article>
</template>

<script>
//todo add a user getter

import appHeader from "./components/headers/app-header.vue"
import homePageHeader from "./components/headers/home-page-header.vue"
import { userService } from './services/user.service.js'
import { socketService } from './services/socket.service'
export default {
    name: "app",
    data() {
        return {
            isAppHeader: true,
            isHeaderHidden: false
        }
    },
    created() {
        const user = userService.getLoggedinUser()
        console.log(user);
        if (user) {
            this.$store.commit({ type: 'setLoggedinUser', user })
        }
        this.$store.dispatch({ type: 'loadBoards' })
        // socketService.on('something-changed', this.updateBoard)


    },
    components: {
        appHeader,
        homePageHeader
    },
    methods: {
        updateBoard() {
            socketService.emit('updateBoard', board)
        },
        onSetHeader(bol) {
            this.isAppHeader = bol
            this.isHeaderHidden = false
        },


    },
    watch: {
        '$route.path': {
            handler(to) {
                if (to === '/signup' || to === '/login') {
                    this.isHeaderHidden = true
                }
            }
        }
    }
}

</script>

