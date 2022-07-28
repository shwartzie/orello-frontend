<template>
    <a
        class="board-header-btn star-btn"
        :class="getStar"
        @click="setStar"
        style="display:flex;"
    ></a>
    <span class="board-header-btn-divider"></span>
</template>

<script>
import { socketService } from '../../services/socket.service.js'
export default {
    emits: ["starred"],
    props: {
        board: Object
    },
    data() {
        return {
            isStarred: this.board.isStarred,
        }
    },
    created() {
        this.isStarred = this.board.isStarred
        socketService.on("updated-board", this.onStar)
    },
    methods: {
        setStar() {
            
            this.isStarred = !this.isStarred
            this.$emit('starred', this.isStarred)
        },
        onStar() {
            console.log('STAR 2!!!');
            const board = JSON.parse(JSON.stringify(this.board))
            this.isStarred = !this.isStarred
            board.isStarred = this.isStarred
            console.log('board:',board);
            this.$store.commit({type: 'setCurrBoard', board})
        }
      
    },
    computed: {
        getStar() {
            return this.isStarred
                ? "fa-solid fa-star fa-star-colored"
                : "fa-regular fa-star"
        },
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
