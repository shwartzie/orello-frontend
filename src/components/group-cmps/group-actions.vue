<template>
    <a @click="displayModal = !diplayModal" :class="popOver" class="board-header-btn board-header-show-menu">
        <i
            class="fa-solid fa-ellipsis"
            style="color: #172b4d; opacity: 0.4; font-size: 13px"
        ></i>
    </a>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            displayModal: false
        }
    },
    created() {},
    methods: {
        onWorkspaceVisible() {},
    },
    computed: {
        popOver() {
            // return this.displayModal ? 'pop-over' : ''
        }
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
