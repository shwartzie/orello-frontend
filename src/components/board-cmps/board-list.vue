//TODO: MAKE DRY CODE
<template>
    <p><i class="fa-solid fa-chart-bar"></i> Popular Templates</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="backgroundImg" />
            </section>
        </li>
    </ul>

    <p><i class="fa-solid fa-clock"></i> Recently Viewed</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">

            <section v-if="board.isRecentlyViewed" class="board-card" @click="goToBoard(board)">
                <img :src="board.style.backgroundImg" alt="" />
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
    emits: ["goToBoard"],
    props: {
        boards: {
            type: Array,
        },
    },
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadBoards' })
    },
    methods: {
        goToBoard(board) {
            this.$emit("goToBoard", { ...board })
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
