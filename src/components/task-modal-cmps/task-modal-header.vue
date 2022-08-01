<template>
    <div class="flex space-between">
        <div class="flex task-modal-main-title-container title-main">
            <span class="title-icon header"></span>
            <div class="flex column task-modal-title title-modal">
                <span @blur="changeTitle" contenteditable>{{ task.title }}</span>
                <p>
                    in list
                    <a>
                        {{ group.title }}
                    </a>
                </p>
            </div>
        </div>
        
    </div>
</template>

<script>
import { socketService } from '../../services/socket.service.js'
export default {
    props: {
        task: Object,
        group: Object,
        board: Object
    },
    data() {
        return {}
    },
    created() {
        socketService.on("update-task", this.updateTask)
    },
    methods: {
        updateTask(currBoard) {
            this.$store.commit({ type: "updateTask", currBoard })
        },
        closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
        changeTitle({ target: { innerText: title } }) {
            this.$emit('changeTitle', title.trim(), 'title')
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
