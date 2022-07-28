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
        socketService.on("update-starred", this.updateStar)
    },
    methods: {
        setStar() {
            this.isStarred = !this.isStarred
            this.$emit('starred', this.isStarred)
        },
        updateStar() {
            const status = this.isStarred
            this.$store.commit({type: 'setStarredBoard', status})
            this.isStarred = !this.isStarred
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
