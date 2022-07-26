<template>
    <main class="container">
        <section class="boards-page">

            <h2> <img src="../assets/logo/templates.svg" alt="nope"> Most popular templates</h2>
            <boards-filter />
            <div class="board-display">
                <board-list
                    :boards="boards"
                    @goToBoard="setBoards"
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
        }
    },
    async created() {
    },
    methods: {
        setBoards(board) {
            this.$store.dispatch({type: 'updateBoard', board})
            this.$router.push(`/board/${board._id}`)
        },
    },
    computed: {
        // viewedBoards() {
        //     return this.$store.getters.viewedBoards
        // },
        boards() {
            return this.$store.getters.boards
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
