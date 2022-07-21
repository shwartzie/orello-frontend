<template>
    <a
        class="board-header-btn star-btn"
        :class="getStar"
        @click="setStar"
        style="display: flex"
    ></a>
    <span class="board-header-btn-divider"></span>
</template>

<script>
export default {
    emits: ["starred"],
    props: {},
    data() {
        return {
            isStarred: false,
        }
    },
    created() {},
    methods: {
        setStar() {
            this.isStarred = !this.isStarred
            this.$emit('starred', this.isStarred)
        },
    },
    computed: {
        getStar() {
            return this.isStarred
                ? "fa-regular fa-star"
                : "fa-solid fa-star fa-star-colored"
        },
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
