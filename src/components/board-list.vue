//TODO: MAKE DRY CODE
<template>
    <p><i class="fa-solid fa-chart-bar"></i> Popular Templates</p>
    <ul class="board-list" v-if="staticBoards">
        <li v-for="board in staticBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
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
    <!-- <ul class="board-list" v-if="viewedBoards">
        <li v-for="board in viewedBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="" />
            </section>
        </li>
    </ul> -->
</template>

<script>
export default {
    name: "board-list",
    emits: ["viewedBoards"],
    props: {
        recentlyViewedBoards: {
            type: Array,
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
        this.viewedBoards = this.recentlyViewedBoards
        this.staticBoards = await this.staticBoardsToShow
    },
    methods: {
        goToBoard(board) {
            this.$emit("viewedBoards", [...this.viewedBoards], {...board})
            
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>

<style></style>
