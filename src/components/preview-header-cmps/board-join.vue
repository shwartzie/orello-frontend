<template>
    <a v-if="!member" class="board-header-btn board-share-button" @click="onJoin">
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
            member: this.board.members.find(member => member._id === this.loggedinUser._id)
        }
    },
    created() {
        this.member = this.board.members.find(member => member._id === this.loggedinUser._id)
    },
    methods: {
        onJoin() {
            this.$emit('onJoinBoard')
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
