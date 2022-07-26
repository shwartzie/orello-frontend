<template>
    <!-- LEFT SIDE NAV BAR -->
    <header class="flex space-between preview-header">
        <section class="flex">
            <div class="flex">
                <board-features :board="board" @editTitle="onEditTitle" />
                <board-star @starred="onStar" />
            </div>
            <board-workspace />
            <board-workspace-visible />
            <div class="preview-header-members flex"> 
                <board-members :board="board" />
            </div>
            <board-share />
        </section>

        <!-- RIGHT SIDE NAV BAR -->
        <section class="flex">
            <div>
                <board-show-menu @modalStatus="toggleModalStatus" />
            </div>
        </section>
    </header>
</template>

<script>

import boardFeatures from "../preview-header-cmps/board-features.vue"
import boardStar from "../preview-header-cmps/board-star.vue"
import boardWorkspace from '../preview-header-cmps/board-workspace.vue'
import boardWorkspaceVisible from '../preview-header-cmps/board-workspace-visible.vue'
import BoardMembers from "../preview-header-cmps/board-members.vue"
import boardShare from '../preview-header-cmps/board-share.vue'
import boardFilter from "../preview-header-cmps/board-filter.vue"
import boardShowMenu from '../preview-header-cmps/board-show-menu.vue'
export default {
    emits: ["changeModalStatus"],
    name: "preview-header",
    data() {
        return {
            user: { loggedIn: false },
        }
    },
    props: {
        board: Object,
    },
    created() { },
    methods: {
        onStar(starredStatus) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            currBoard.isStarred = starredStatus
            this.$store.dispatch({ type: "setBoard", currBoard, starredStatus })
        },
        toggleModalStatus(modalStatus) {
            this.$emit("changeModalStatus", modalStatus)
        },
        onEditTitle(title) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            currBoard.title = title
            this.$store.dispatch({ type: "setBoard", currBoard })
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
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
