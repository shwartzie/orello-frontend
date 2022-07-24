<template>
    <main class="container">
        <section class="boards-page">
            <h2>Most popular templates</h2>
            <boards-filter />
            <div class="board-display" v-if="boardsRes">
                <board-list
                    :recentlyViewedBoards="boardsRes"
                    :staticBoardsToShow="staticBoardsToShow"
                    @viewedBoards="setBoards"
                />
            </div>
        </section>
    </main>
</template>

<script>
import boardsFilter from "../components/board-cmps/boards-filter.vue"
import boardList from "../components/board-cmps/board-list.vue"
export default {
    name: "boards",
    data() {
        return {
            boardsRes: null
        }
    },
    async created() {
        this.boardsRes = await this.viewedBoards
    },
    methods: {
        setBoards(viewedBoards, board) {
            this.$store.dispatch({type: 'setBoards', viewedBoards, board})
            this.$router.push(`/board/${board._id}`)
        },
    },
    computed: {
        viewedBoards() {
            return this.$store.getters.viewedBoards
        },
        staticBoardsToShow() {
            return this.$store.getters.staticBoardsToShow
        },
        userBoards() {
            //todo: get logged in user boards saved in his Workspace and display it
            return
        },
    },
    components: {
        boardsFilter,
        boardList,
    },
}
</script>

<style>
.container {
    margin: auto;
}
</style>
