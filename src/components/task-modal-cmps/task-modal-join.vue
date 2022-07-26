<template>
    <a v-if="!isJoined"
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
        isJoined: Boolean
    },
    data() {
        return {}
    },
    created() {},
    methods: {
        onJoin() {
            this.$emit('memberJoined', true)
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
