<template>
    <section class="task-modal" @drop.prevent @dragover.prevent="isDragover = true" @dragleave="isDragover = false"
        :class="{ drag: isDragover }" @click="closeModal" @keydown.esc="something_in_your_methods">
        <section class="task-modal-info" @drop="handleFile" v-if="board && task
        && group">
            <task-modal-preview :board="board" :group="group" :task="task" />
        </section>
    </section>
</template>

<script>
import taskModalPreview from "./task-modal-preview.vue"
export default {
    props: {
        board: Object,
    },
    emits: ["addedLabel", "closePicker"],
    data() {
        return {
            labelPicker: false,
            currGroup: null,
        }
    },
    created() {
        const { groupId } = this.$route.params
        this.currGroup = this.board.groups.find(group => group.id === groupId)

    },
    methods: {
        handleFile(ev) {
            console.log(ev.dataTransfer.files[0])
        }
    },
    computed: {
        group() {
            const { groupId } = this.$route.params
            this.currGroup = this.board.groups.find(group => group.id === groupId)
            return this.currGroup
        },
        task() {
            const { id } = this.$route.params
            return this.currGroup.tasks.find(task => task.id === id)
        }
    },
    components: {
        taskModalPreview,
    },
    watch: {
        board: {
            handler(board) {
                this.$store.dispatch({ type: "setCurrBoard", board })
            },
            deep: true
        }
    }
}
</script>
