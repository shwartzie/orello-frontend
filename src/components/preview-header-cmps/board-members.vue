<template>
    <div class="board-header-btn">
        <a v-for="member in board.members">
            {{ member.fullname }}
        </a>
    </div>
</template>

<script>
export default {
    props: {
        board: Object
    },
    data() {
        return {}
    },
    created() {},
    methods: {
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
