<template>
    <section class="task-modal" @click="closeModal" @keydown.esc="something_in_your_methods">
        <section class="task-modal-info" @click.stop="" v-if="board && task && group">
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
    methods: {},
    computed: {
        group() {
            const { groupId } = this.$route.params
            console.log('groupId:',groupId);
            this.currGroup = this.board.groups.find(group => group.id === groupId)
            console.log('this.currGroup:',this.currGroup);
            return this.currGroup
        },
        task() {
            const { id } = this.$route.params
            console.log('id:',id);
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
