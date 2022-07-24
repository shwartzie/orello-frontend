<template>
    <span>
        <a @click="toggleModal" class="board-header-btn board-header-show-menu">
            <i class="fa-solid fa-ellipsis"></i>
            show menu</a>
        <board-menu-modal v-if="this.modalStatus" @closeModal="onCloseModal"/>
    </span>
</template>

<script>

import boardMenuModal from './board-menu-modal.vue'

export default {
    emits: ["modalStatus"],
    props: {},
    data() {
        return {
            modalStatus: false
        }
    },
    created() { },
    methods: {
        toggleModal() {
            this.modalStatus = !this.modalStatus
            this.$emit("modalStatus", this.modalStatus)
        },
        onCloseModal(){
            this.modalStatus = !this.modalStatus
            this.$emit("modalStatus", false)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        boardMenuModal,
    },
}
</script>
