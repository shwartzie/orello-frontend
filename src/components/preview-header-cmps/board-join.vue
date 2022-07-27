<template>
    <a class="board-header-btn board-share-button" @click="onJoin" :style="getMember">
        <span>
            Join
        </span>
        </a
    >
</template>

<script>
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
    },
    methods: {
        onJoin() {
            this.$emit('onJoinBoard')
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
