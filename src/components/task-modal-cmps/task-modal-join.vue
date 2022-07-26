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
        loggedinUser: Object
    },
    data() {
        return {
            isJoined: false
        }
    },
    created() {},
    methods: {
        onJoin() {
            this.$emit('memberJoined', {...this.loggedinUser})
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
