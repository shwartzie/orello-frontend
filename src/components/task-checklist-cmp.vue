<template>
    <div class="flex checklist-display">
        <div class="task-done-button">
            <el-checkbox v-model="this.currTask.isDone" @change="test" />
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
            currTask: JSON.parse(JSON.stringify(this.task)),
        }
    },
    created() {

    },
    methods: {
        test() {
            this.$emit("updateTask", this.currTask)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}
</script>