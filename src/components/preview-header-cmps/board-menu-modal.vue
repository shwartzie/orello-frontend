<template>

    <component @setBackground="setBackground" @setModalDisplay="setModalDisplay" @closeModal="closeModal"
        :currBoard="currBoard" :is="modalDisplay">
    </component>

</template>

<script>

import activityModal from './activity-modal.vue'
import backgroundSelectModal from './background-select-modal.vue'
import colorSelectModal from './color-select-modal.vue'
import imgSelectModal from './img-select-modal.vue'

export default {
    emits: ['closeModal', 'setBackground'],
    data() {
        return {
            modalDisplay: 'activityModal'
        }
    },
    created() {
    },
    methods: {
        closeModal() {
            this.$emit("closeModal", false)
        },
        setModalDisplay(modalDisplay) {
            this.modalDisplay = modalDisplay
        },
        setBackground(background) {
            this.$emit('setBackground', background)
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },

    },
    mounted() { },
    unmounted() { },
    components: {
        activityModal,
        backgroundSelectModal,
        colorSelectModal,
        imgSelectModal,
    }
}

</script>