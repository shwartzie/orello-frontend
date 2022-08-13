<template>
    <ul class="board-list" v-if="boards">
            <li v-for="board in boards" :key="board._id">
                <section v-if="board.isRecentlyViewed" class="board-card" @click="goToBoard(board)">
                    <h3>{{ board.title }}</h3>
                    <div class="background" :style="{
                        background: `${board.style?.background?.thumb} center / cover`
                    }">
                    </div>
                    <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                    <span v-else @click.stop class="title-icon star"></span>
                </section>
            </li>
        </ul>
</template>

<script>
    export default {
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

    },
    methods: {
        goToBoard(board) {
            this.$emit("goToBoard", { ...board })
        },
    },
  
}

</script>