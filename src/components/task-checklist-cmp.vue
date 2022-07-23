<template>
    <div class="flex checklist-display">
        <div class="task-done-button">
            <el-checkbox v-model="currTask.isDone" @change="test" />
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
            currTask: null,
        }
    },
    created() {
        this.currTask = JSON.parse(JSON.stringify(this.task))
    },
    methods: {
        test() {
            this.currTask = JSON.parse(JSON.stringify(this.task))
            this.currTask.isDone = !this.currTask.isDone
            this.$emit("updateTask", this.currTask)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}
</script>