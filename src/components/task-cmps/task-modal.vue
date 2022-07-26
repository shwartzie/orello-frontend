<template>
    <section class="task-modal" @drop.prevent @dragover.prevent="isDragover = true" @dragend="console.log('hi')"
        @click="closeModal" @keydown.esc="something_in_your_methods">
        <section :class="{ 'file-dragged': isDragover }" class="task-modal-info" @dragover="isDragover = true"
            @drop="handleFile" v-if="board && task
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
            isDragover: false
        }
    },
    created() {
        const { groupId } = this.$route.params
        console.log(this.$route.params);
        this.currGroup = this.board.groups.find(group => group.id === groupId)
    },
    methods: {
        handleFile(ev) {
            console.log(ev.dataTransfer.files[0])
        }
    },
    computed: {
        group() {
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
                // this.$store.dispatch({ type: "setCurrBoard", board })
            },
            deep: true
        }
    }
}
</script>
