<template>

    <a
        @click="onJoin"
        class="board-header-btn button-link side-bar-button"
    >
        <span class="btn-icon member"> </span>
        join
    </a>

     
</template>

<script>
export default {
    emits: ['memberJoined'],
    props: {
        loggedinUser: Object,
        board: Object
    },
    data() {
        return {
            isJoined: false
        }
    },
    created() {},
    methods: {
        onJoin() {
            const member = this.board.members.find(member => member._id === this.loggedinUser._id)
            this.$emit('memberJoined', {...member})
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
