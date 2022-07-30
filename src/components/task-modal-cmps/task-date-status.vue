<template>
    <div class="task-done-button" style="padding-right:10px;">
            <el-checkbox @change="onSetDateStatus" v-model="isDone" />
        </div>
</template>

<script>
export default {
    emits: ["setTaskDateStatus"],
    props: {
        task:Object
    },
    data() {
        return {
            isDone:false
        }
    },
    created() {
        this.isDone = this.task.status
    },
    methods: {
        onSetDateStatus() {
            this.$emit("setTaskDateStatus", this.isDone)
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
