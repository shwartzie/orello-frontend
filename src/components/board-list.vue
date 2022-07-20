//TODO: MAKE DRY CODE
<template>
    <p><i class="fa-solid fa-chart-bar"></i> Popular Templates</p>
    <ul class="board-list" v-if="staticBoards">
        <li v-for="board in staticBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board, 'static')">
                <img :src="board.style.backgroundImg" alt="" />
            </section>
        </li>
    </ul>

    <p><i class="fa-solid fa-clock"></i> Recently Viewed</p>
    <ul class="board-list" v-if="viewedBoards">
        <li v-for="board in viewedBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="" />
            </section>
        </li>
    </ul>

    <p><i class="fa-solid fa-clock"></i> Your Workspace</p>
    <ul class="board-list" v-if="viewedBoards">
        <li v-for="board in viewedBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="" />
            </section>
        </li>
    </ul>
</template>

<script>
export default {
    name: "board-list",
    props: {
        recentlyViewedBoards: {
            type: Promise,
        },
        staticBoardsToShow: {
            type: Promise,
        },
    },
    data() {
        return {
            viewedBoards: null,
            staticBoards: null,
        }
    },
    async created() {
        this.viewedBoards = await this.recentlyViewedBoards
        this.staticBoards = await this.staticBoardsToShow
    },
    methods: {
        goToBoard(board) {
            board.isStatic = true
            if (this.viewedBoards.length === 4) {
                this.viewedBoards.pop()
            }
            this.viewedBoards.unshift(board)
            this.$router.push(`/board/${board._id}`)
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>

<style></style>
