<template>
    <span>
        <a @click="toggleModal" class="board-header-btn board-header-show-menu">
            <i class="fa-solid fa-ellipsis"></i>
            show menu</a>
        <board-menu-modal v-if="this.modalStatus" @saveImg="saveImg" @setBackground="setBackground"
            @closeModal="onCloseModal" />
    </span>
</template>

<script>

import boardMenuModal from './board-menu-modal.vue'

export default {
    emits: ["modalStatus", 'setBackground', 'saveImg'],
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
        onCloseModal() {
            this.modalStatus = !this.modalStatus
            this.$emit("modalStatus", false)
        },
        setBackground(background) {
            this.$emit('setBackground', background)
        },
        saveImg(background) {
            this.$emit('saveImg', background)
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
