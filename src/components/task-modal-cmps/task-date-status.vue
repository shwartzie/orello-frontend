<template>
    <div class="task-done-button" style="padding-right:10px;">
            <el-checkbox @change="onSetDateStatus" v-model="isDone" />
        </div>
</template>

<script>
import { socketService } from "../../services/socket.service.js"
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
        // socketService.on("update-task-labels", this.updateLabels)
    },
    methods: {
        // updateLabels(currBoard) {
        //     this.$store.commit({ type: "updateTask", currBoard })
        // },
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
