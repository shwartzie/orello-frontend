<template>
    <div class="flex checklist-display">
        <div class="task-done-button">
            <el-checkbox @change="test" />
        </div>
        <a>{{ task.title }}</a>
    </div>
</template>

<script>
export default {
    props: {
        task: Object,
    },
    data() {
        return {
            isDone: false
        }
    },
    created() {
    },
    methods: {
        test() {
            this.currTask = JSON.parse(JSON.stringify(this.task))
            this.isDone = !this.isDone
            this.currTask.isDone = this.isDone
            this.$emit("updateTask", {...this.currTask})
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
