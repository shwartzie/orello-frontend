<template>
    <el-checkbox></el-checkbox>
</template>

<script>
import { socketService } from "../../services/socket.service.js"
export default {
    emits: ["setTaskDate"],
    props: {},
    data() {
        return {
            
        }
    },
    created() {
        // socketService.on("update-task-labels", this.updateLabels)
    },
    methods: {
        // updateLabels(currBoard) {
        //     this.$store.commit({ type: "updateTask", currBoard })
        // },
        onSave() {
            const [startingDate, dueDate] = this.value
            this.$emit("setTaskDate", startingDate, dueDate)
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
