<template>
    <a class="board-header-btn board-share-button" @click="onJoin" :style="getMember">
        <span>
            Join
        </span>
        </a
    >
</template>

<script>
import { socketService } from '../../services/socket.service.js'
export default {
    emits: ['onJoinBoard'],
    props: {
        board:Object,
        loggedinUser: Object
    },
    data() {
        return {
        }
    },
    created() {
        socketService.on("update-joined", this.updateJoin)
        console.log('loggedinUser:',this.loggedinUser);
    },
    methods: {
        onJoin() {
            this.$emit('onJoinBoard')
        },
        updateJoin(currBoard) {
            const user = currBoard.members[currBoard.members.length - 1]
            const board = JSON.parse(JSON.stringify(this.board))
            this.$store.commit({type: 'updateBoardMembers', board, user})
        }
    },
    computed: {
        getMember() {
            const member = this.board.members?.find(member => member._id === this.loggedinUser._id)
            return member ? {display:'none'} : {display:'flex'}
        }
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
