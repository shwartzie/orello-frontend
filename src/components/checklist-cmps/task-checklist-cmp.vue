<template>
    <div class="flex checklist-display">
        <div class="task-done-button" >
            <el-checkbox @change="onCheckbox" v-model="isDone" />
        </div>
        <a style=" align-self: center;">
            {{ task.title }}
        </a>
    </div>
</template>

<script>
export default {
    emits: ['updateTask'],
    props: {
        task: Object,
    },
    data() {
        return {
            isDone: false,
            currTask: false
        }
    },
    created() {
        this.currTask = JSON.parse(JSON.stringify(this.task))
        this.isDone = this.currTask.isDone
    },
    methods: {
        onCheckbox() {
            this.currTask = JSON.parse(JSON.stringify(this.task))
            this.currTask.isDone = this.isDone
            this.$emit("updateTask", this.currTask)
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
