<template>
    <section class="task-modal" @dragover.prevent="checkDragCords" @click="closeModal" @keydown.esc="closeModal">
        <section ref="infoModal" class="task-modal-info" @drop.prevent="handleFile">
            <div v-show="isDragover" class="file-drag-screen flex">
                <span> Drop files to upload.</span>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    props: {
        currTask: Object,
    },
    data() {
        return {
            displayModal: false
        }
    },
    created() { },
    methods: {
        onWorkspaceVisible() { },
    },
    computed: {
        popOver() {
            // return this.displayModal ? 'pop-over' : ''
        }
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
