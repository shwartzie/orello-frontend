<template>
    <a @click="toggleDashboard" class="board-header-btn board-btn-features">
        <img src="../../assets/svg/board-features-btn.svg" />
        <span>board</span>
        <img src="../../assets/svg/board-arrow-down.svg" />
    </a>
    <div class="board-header-btn board-header-title" @click="displayTitle" v-if="!titleClicked">
        {{ board.title }}
    </div>

    <div v-else>
        <el-input v-model="title" @change="onEditTitle"></el-input>
    </div>
    <!-- 
    <div class="board-header-template-span" v-if="!board.isStattic">
        <div>Template</div>
    </div> -->
</template>

<script>
import { socketService } from '../../services/socket.service.js'
export default {
    emits: ['editTitle', 'toggleDashboard'],
    props: {
        board: Object,
    },
    data() {
        return {
            titleClicked: false,
            title: ''
        }
    },
    created() {
        this.title = this.board.title
        socketService.on("update-board-title", this.updateTitle)
    },
    methods: {
        displayTitle() {
            this.titleClicked = !this.titleClicked
        },
        onEditTitle() {
            this.titleClicked = false
            this.$emit('editTitle', this.title)
        },
        updateTitle(socketBoard) {
            //fix !!
            const board = JSON.parse(JSON.stringify(this.board))
            board.title = socketBoard.title
            this.$store.commit({ type: 'setCurrBoard', board })
        },
        toggleDashboard() {
            // return
            this.$emit('toggleDashboard')
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
