<template>
    <div class="pop-over" style="width: 425px; top:0;">
        <div class="pop-over-header" style="margin-bottom: 0px;">
            <span class="pop-over-header-title date-picker">Dates</span>
            <a class="pop-over-header-close-btn" @click="closeModal">
                <i class="fa-solid fa-x" style="cursor: pointer"></i>
            </a>
        </div>
        <div>
            <div class="pop-over-content">
                <div class="pop-over-section"></div>
                <div class="demo-date-picker" style="margin-bottom: 9px;">
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
                        style="margin-bottom: 9px"
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
    props: {
    },
    data() {
        return {
            value: [
                new Date(2022, 10, 10, 10, 10),
                new Date(2022, 10, 11, 10, 10),
            ],
            
        }
    },
    created() {
        socketService.on("update-on-dates", this.updateDate)
    },
    methods: {
        updateDate(currBoard) {
            this.$store.commit({ type: "updateTask", currBoard })
        },
        onSave() {
            const [startingDate, dueDate] = this.value
            this.$emit("setTaskDate", startingDate, dueDate)
        },
        closeModal() {
            this.$emit('closeModal')
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
