<template>
    <!-- LEFT SIDE NAV BAR -->
    <header class="flex space-between preview-header">
        <section class="flex">
            <div class="flex">
                <board-title :board="board" @editTitle="onEditTitle" />
                <board-star @starred="onStar" :board="board" />
            </div>
            <board-workspace />
            <board-workspace-visible />
            <div class="preview-header-members flex">
                <board-members :board="board" />
            </div>
            <board-join :board="board" :loggedinUser="loggedinUser" @onJoinBoard="onJoinBoard" />
            <board-share />
        </section>

        <!-- RIGHT SIDE NAV BAR -->
        <section class="flex">
            <board-filter :board="board" style="position: relative"/>
            <div>
                <board-show-menu @saveImg="saveImg" @setBackground="setBackground" @modalStatus="toggleModalStatus" />
            </div>
        </section>
    </header>
</template>

<script>
import boardTitle from "../preview-header-cmps/board-title.vue"
import boardStar from "../preview-header-cmps/board-star.vue"
import boardWorkspace from "../preview-header-cmps/board-workspace.vue"
import boardWorkspaceVisible from "../preview-header-cmps/board-workspace-visible.vue"
import BoardMembers from "../preview-header-cmps/board-members.vue"
import boardShare from "../preview-header-cmps/board-share.vue"
import boardFilter from "../preview-header-cmps/board-filter.vue"
import boardShowMenu from "../preview-header-cmps/board-show-menu.vue"
import boardJoin from "../preview-header-cmps/board-join.vue"
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
    created() {
    },
    methods: {
        onStar(starredStatus) {
            this.$store.dispatch({ type: "onStarredUpdateBoards", starredStatus })
        },

        toggleModalStatus(modalStatus) {
            this.$emit("changeModalStatus", modalStatus)
        },
        onEditTitle(title) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            currBoard.title = title
            this.$store.dispatch({ type: "setBoard", currBoard })
        },
        onJoinBoard() {
            this.$store.dispatch({ type: "onJoinBoard" })
        },
        setBackground(background) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            currBoard.style.background = background
            this.$store.dispatch({ type: "setBoard", currBoard })
        },
        saveImg(background) {
            if (!background) return
            const currBoard = JSON.parse(JSON.stringify(this.board))
            if (!currBoard.backgrounds) {
                currBoard.backgrounds = []
            }
            if (currBoard.backgrounds.includes(background)) {
                return
            }
            currBoard.backgrounds.unshift(background)
            this.$store.dispatch({ type: "setBoard", currBoard })
        }
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },

    },
    mounted() { },
    unmounted() { },
    components: {
        boardTitle,
        boardStar,
        boardWorkspace,
        boardWorkspaceVisible,
        BoardMembers,
        boardShare,
        boardFilter,
        boardShowMenu,
        boardJoin,
    },
}
</script>
