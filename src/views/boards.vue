<template>
    <main class="container">
        <section class="boards-page">
            <h2>Most popular templates</h2>
            <boards-filter />
            <div class="board-display">
                <board-list
                    :recentlyViewedBoards="boards"
                    :staticBoardsToShow="staticBoardsToShow"
                />
            </div>
        </section>
    </main>
</template>

<script>
import boardsFilter from "../components/boards-filter.vue"
import boardList from "../components/board-list.vue"
import { boardService } from "../services/board.service.js"
export default {
    name: "boards",
    data() {
        return {
        }
    },
    created() {},
    methods: {},
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        staticBoardsToShow() {
            return boardService.getStaticBoards()
        },
        userBoards() {
            //todo: get logged in user boards saved in his Workspace and display it
            return
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
