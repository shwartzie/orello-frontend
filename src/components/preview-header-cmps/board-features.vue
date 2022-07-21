<template>
    <a class="board-header-btn board-btn-features">
        <img src="../../assets/svg/board-features-btn.svg" />
        <span>board</span>
        <img src="../../assets/svg/board-arrow-down.svg" />
    </a>
    <h1 class="board-header-btn board-header-title">
        {{ board.title }}
    </h1>
    <div class="board-header-template-span" v-if="!user.loggedIn">
        <div>Template</div>
    </div>
</template>

<script>
export default {
    props: {
        board: Object,
        user: Object
    },
    data() {
        return {}
    },
    created() {
        console.log(this.user)
    },
    methods: {},
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>

<style></style>
