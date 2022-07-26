//TODO: MAKE DRY CODE
<template>
    <!-- <p><i class="fa-solid fa-chart-bar"></i> Popular Templates</p> -->
    <ul class="board-list" v-if="staticBoards">
        <li v-for="board in staticBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="backgroundImg" />
            </section>
        </li>
    </ul>
    <div class="boards-logo">
        <span class="clock title-icon"></span>
        <p>Recently viewed</p>
    </div>
    <ul class="board-list" v-if="viewedBoards">
        <li v-for="board in viewedBoards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="backgroundImg" />
            </section>
        </li>
    </ul>
    <h2>YOUR WORKSPACES</h2>
    <div class="boards-logo">
        <span class="trello-workspace-logo">T</span>
        <p>Trello Workspace</p>
    </div>
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
            this.$emit("viewedBoards", [...this.viewedBoards], { ...board })
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
