<template>
    <div class="pop-over" style="width: 375px">
        <div class="pop-over-header">
            <span class="pop-over-header-title">Dates</span>
            <a class="pop-over-header-close-btn" @click="testModal">
                <i class="fa-solid fa-x" style="cursor: pointer"></i>
            </a>
        </div>
        <div>
            <div class="pop-over-content">
                <div class="pop-over-section"></div>
                <div class="demo-date-picker">
                    <div class="block">
                        <el-date-picker
                            v-model="value"
                            type="datetimerange"
                            range-separator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                        />
                    </div>
                </div>
                <div>
                    <el-button
                        @click="onSave"
                        type="primary"
                        class="full-width"
                        style="margin-bottom: 4px"
                    >
                        Save</el-button
                    >
                    <button class="label-btn full-width" @click="addLabel">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { socketService } from "../../services/socket.service.js"
export default {
    emits: ["setTaskDate"],
    props: {},
    data() {
        return {
            value: [
                new Date(2000, 10, 10, 10, 10),
                new Date(2000, 10, 11, 10, 10),
            ],
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
