<template>
    <main class="container">
        <section class="boards-page">

            <h2> <img src="../assets/logo/templates.svg" alt="nope"> Most popular templates</h2>
            <boards-filter @setFilterBoards="setFilterBoards"/>
            <div class="board-display">
                <board-list :boards="boards" @goToBoard="setBoards" :loggedinUser="loggedinUser"  />
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
            boardsFilter: null
        }
    },
    created() {
        
    },
    methods: {
        setBoards(board) {
            console.log('board:',board);
            this.$router.push(`/board/${board._id}`)
        },
        setFilterBoards(value) {
            this.boardsFilter = value
        }
    },
    computed: {
        
        boards() {
            return this.$store.getters.boards
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }

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
