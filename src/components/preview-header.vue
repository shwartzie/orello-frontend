<template>
    <!-- LEFT SIDE NAV BAR -->
    <header class="flex space-between preview-header">
        <section class="flex">
            <div class="flex">
                <board-features :board="board" :user="user" />
                <board-star @starred="onStar" />
            </div>
            <board-workspace/>
            <board-workspace-visible/>
            <board-members :board="board"/>
            <board-share/>
        </section>

    <!-- RIGHT SIDE NAV BAR -->
        <section class="flex">
            <div class="flex">
                <a class="board-header-btn">slack</a>
                <a class="board-header-btn power-up-btn">
                    <span> <i class="fa-solid fa-rocket"></i> </span>
                    power ups
                </a>
                <a class="board-header-btn automation-btn">
                    <span>
                        <i class="fa-solid fa-bolt"></i>
                    </span>
                    automation
                </a>
            </div>
            <div class="flex">
                <board-filter/>
                <board-show-menu/>
            </div>
        </section>
    </header>
</template>

<script>
import boardFeatures from "./preview-header-cmps/board-features.vue"
import boardStar from "./preview-header-cmps/board-star.vue"
import boardWorkspace from './preview-header-cmps/board-workspace.vue'
import boardWorkspaceVisible from './preview-header-cmps/board-workspace-visible.vue'
import BoardMembers from "./preview-header-cmps/board-members.vue"
import boardShare from './preview-header-cmps/board-share.vue'
import boardFilter from "./preview-header-cmps/board-filter.vue"
import boardShowMenu from './preview-header-cmps/board-show-menu.vue'
export default {
    name: "preview-header",
    data() {
        return {
            user: { loggedIn: false },
        }
    },
    props: {
        board: Object,
    },
    created() {},
    methods: {
        onStar(starredStatus) {
            const board = {...this.board}
            this.$store.dispatch({type: "setBoard", board, starredStatus})
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {
    boardFeatures,
    boardStar,
    boardWorkspace,
    boardWorkspaceVisible,
    BoardMembers,
    boardShare,
    boardFilter,
    boardShowMenu
},
}
</script>
