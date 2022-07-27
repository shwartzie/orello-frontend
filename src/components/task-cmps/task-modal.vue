<template>
    <section class="task-modal" @dragover.prevent="checkDragCords" @click="closeModal"
        @keydown.esc="something_in_your_methods">
        <section ref="infoModal" class="task-modal-info" @drop.prevent="handleFile" v-if="board && task
        && group">
            <div v-show="isDragover" class="file-drag-screen flex">
                <span> Drop files to upload.</span>
            </div>
            <task-modal-preview :board="board" :group="group" :task="task" />
        </section>
    </section>
</template>

<script>
import taskModalPreview from "./task-modal-preview.vue"
import { uploadImg } from '../../services/img-upload.service.js';
export default {
    props: {
        board: Object,
    },
    emits: ["addedLabel", "closePicker"],
    data() {
        return {
            labelPicker: false,
            currGroup: null,
            isDragover: false,
        }
    },
    created() {
        const { groupId } = this.$route.params
        this.currGroup = this.board.groups.find(group => group.id === groupId)

    },
    methods: {
        async handleFile({ dataTransfer: { files: [file] } }) {

            this.isDragover = false

            const res = await uploadImg(file)

            const attachment = {}
            attachment.imgName = res.original_filename
            attachment.url = res.url

            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))

            console.log(taskToAdd)
            if (!taskToAdd.attachments) taskToAdd.attachments = []
            taskToAdd.attachments.unshift(attachment)

            const idx = currGroup.tasks.findIndex(
                (task) => task.id === taskToAdd.id
            )
            currGroup.tasks.splice(idx, 1, taskToAdd)


            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd
            })


        },
        checkDragCords({ pageX, pageY }) {
            const { left, right, top, bottom } = this.$refs.infoModal.getBoundingClientRect()
            if (pageX > right || pageX < left ||
                pageY > bottom || pageY < top) {
                this.isDragover = false
            } else {
                this.isDragover = true
            }
        },

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

}
</script>
