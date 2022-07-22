<template>
    <section class="task-modal" @click="closeModal" @keydown.esc="something_in_your_methods">
        <section class="task-modal-info" @click.stop="" v-if="board && task && group">
            <test-cmp :board="board" :group="group" :task="task" />
        </section>
    </section>
</template>

<script>
import testCmp from "./test-cmp.vue"
export default {
    props: {
        board: Object,
    },
    emits: ["addedLabel"],
    data() {
        return {
            labelPicker: false,
        }
    },
    created() {
        const { id, groupId } = this.$route.params
        this.board.groups.forEach((group) => {
            if (group.id === groupId) {
                console.log("group:", group)
                this.$store.commit("setCurrGroup", group)
            }
            const task = group.tasks.find((task) => task.id === id)
            if (task) {
                this.$store.commit("setCurrTask", task)
                console.log("task:", task)
            }
        })
    },
    methods: {},
    computed: {
        group() {
            return this.$store.getters.group
        },
        task() {
            return this.$store.getters.task
        },
    },
    components: {
        testCmp,
    },
}
</script>
