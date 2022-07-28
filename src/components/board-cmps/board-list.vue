//TODO: MAKE DRY CODE
<template>
    <p><i class="fa-solid fa-chart-bar"></i> Popular Templates</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)" v-if="board.isStatic">
                <div class="board-card-img-container">
                    <h3>{{ board.title }}</h3>
                    <img :src="board.style.backgroundImg" alt="backgroundImg" />
                    <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                    <span v-else @click.stop class="title-icon star"></span>
                </div>
            </section>
        </li>
    </ul>
    <p><i class="fa-solid fa-star"></i> Starred Boards</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section v-if="board.isStarred" class="board-card" @click="goToBoard(board)">
                <h3>{{ board.title }}</h3>
                <img :src="board.style.backgroundImg" alt="" />
                <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                <span v-else @click.stop class="title-icon star"></span>
            </section>
        </li>
    </ul>

    <p><i class="fa-solid fa-clock"></i> Recently Viewed</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section v-if="board.isRecentlyViewed" class="board-card" @click="goToBoard(board)">
                <h3>{{ board.title }}</h3>
                <img :src="board.style.backgroundImg" alt="" />
                <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                <span v-else @click.stop class="title-icon star"></span>
            </section>
        </li>
    </ul>

    <!-- <p><i class="fa-solid fa-clock"></i> Orello Boards</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section v-if="!board.isStatic" class="board-card" @click="goToBoard(board)">
                <h3>{{ board.title }}</h3>
                <img :src="board.style.backgroundImg" alt="" />
                <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                <span v-else @click.stop class="title-icon star"></span>
            </section>
        </li>
    </ul> -->

    <h2>YOUR WORKSPACES</h2>
    <div class="boards-logo flex column">
        <div class="flex">
            <span class="trello-workspace-logo">O</span>
            <p>Orello Workspace</p>
        </div>
        <ul class="board-list" v-if="boards">
            <li v-for="board in boards" :key="board._id">
                <section v-if="
                    board.createdBy.fullname === loggedinUser.fullname ||
                    board.members.includes(loggedinUser)
                " class="board-card" @click="goToBoard(board)">
                    <h3>{{ board.title }}</h3>
                    <img :src="board.style.backgroundImg" alt="" />
                    <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                    <span v-else @click.stop class="title-icon star"></span>
                </section>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "board-list",
    emits: ["goToBoard"],
    props: {
        boards: {
            type: Array,
        },
        loggedinUser: Object,
    },
    data() {
        return {}
    },
    created() { },
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
