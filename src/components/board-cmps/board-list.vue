
<template>
    <component :is="currCmps" :boards="boards" @goToBoard="goToBoard"></component>
</template>

<script>
import { userService } from '../../services/user.service.js'
import { utilService } from '../../services/util.service.js'
import starredBoards from './board-list-cmps/starred-boards.vue'
import allBoards from './board-list-cmps/all-boards.vue'
import workspace from './board-list-cmps/workspace.vue'
import templateBoards from './board-list-cmps/template-boards.vue'
import recentlyViewed from './/board-list-cmps/recently-viewed.vue'
export default {
    name: "board-list",
    emits: ["goToBoard"],
    props: {
        boards: {
            type: Array,
        },
        filterBy: Object,
        loggedinUser: Object,
    },
    data() {
        return {
            currCmps: 'allBoards',
        }
    },

    created() {
        const user = userService.getLoggedinUser()
        if (user) {
            this.$store.commit({ type: 'setLoggedinUser', user })
        } else {
            this.$store.dispatch({ type: 'setGuestUser' })
        }
    },
    methods: {
        goToBoard(board) {
            this.$emit("goToBoard", { ...board })
        },
        switchCmp() {
            if (this.filterBy === null) {
                this.currCmps = this.allBoards
                return
            }
            if (this.filterBy.value === 'ALL') {
                this.currCmps = 'allBoards'
            } else if (this.filterBy.value === 'Popular Template') {
                console.log('this.filterBy.value:',this.filterBy.value);
                this.currCmps = 'templateBoards'
            } else if (this.filterBy.value === 'Starred Boards') {
                this.currCmps = 'starredBoards'
            } else if (this.filterBy.value === 'Recently Viewed') {
                this.currCmps = 'recentlyViewed'
            } else if (this.filterBy.value === 'Workspace') {
                this.currCmps = 'workspace'
            }
        }
    },
    watch: {
        filterBy() {
            this.currCmps = this.filterBy
            this.switchCmp()
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        starredBoards,
        allBoards,
        recentlyViewed,
        templateBoards,
        workspace
    },
}
</script>

<style>
</style>
