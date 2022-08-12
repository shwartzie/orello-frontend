<template>
    <div class="pop-over">
        <div class="pop-over-header">
            <span class="pop-over-header-title">Labels</span>
            <a class="pop-over-header-close-btn" @click="testModal">
                <i class="fa-solid fa-x" style="cursor: pointer"></i>
            </a>
        </div>
        <div>
            <div class="pop-over-content">
                <div class="pop-over-section">
                    <h4>Labels</h4>
                </div>
                <ul class="pop-over-member-list label-picker-ul-modal">
                    <li class="edit-labels-pop-over" v-for="(label, idx) in demoLabels" :key="label.id">
                        <span class="card-label card-label-display" :class="label.class" @click="onLabel(label)">
                            <span style="color:white; cursor: pointer;">
                                {{ label.title }}
                            </span>
                            <span v-if="labelsPicked && checkLabels(label)">
                                <i class="fa-solid fa-check"></i>
                            </span> 
                        </span>
                        <a class="card-label-edit-button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                    </li>
                </ul>
                <el-input v-model="labelName" placeholder="Enter label title" />
                <div>
                    <button class="label-btn full-width" @click="addLabel">
                        Create a new label
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { socketService } from '../../services/socket.service.js'
export default {
    emits: ["addedLabel", 'test'],
    props: {
        displayModal: Boolean,
        board: Object,
        task: Object
    },
    data() {
        return {
            labelName: "",
            demoLabels: [
                {
                    id: "a101",
                    class: "card-label-green",
                    isMarked: false,
                    title: "Completed",
                },
                {
                    id: "a102",
                    class: "card-label-yellow",
                    isMarked: false,
                    title: "Low Priority",
                },
                {
                    id: "a103",
                    class: "card-label-orange",
                    isMarked: false,
                    title: "Medium Priority",
                },
                {
                    id: "a104",
                    class: "card-label-red",
                    isMarked: false,
                    title: "High Priority",
                },
                {
                    id: "a105",
                    class: "card-label-purple",
                    isMarked: false,
                    title: "Bug",
                },
                {
                    id: "a106",
                    class: "card-label-blue",
                    isMarked: false,
                    title: "Adjucment",
                },
                {
                    id: "a107",
                    class: "card-label-sky",
                    isMarked: false,
                    title: "In Progress",
                },
            ],
            labelsPicked: [],
            labelPicked: null,
            labels: []
        }
    },
    created() {
        const labels = this.task.labels?.filter(label => label.isMarked)
        this.labelsPicked = labels || []
        socketService.on("update-task-labels", this.updateLabels)
    },
    methods: {
        checkLabels(label) {
            const idx = this.labelsPicked.findIndex(l => l.id === label.id)
            if (idx === -1) {
                return false
            }
            return true
        },
        updateLabels(currBoard) {
            this.$store.commit({ type: "updateTask", currBoard })
        },
        addLabel() {
            this.$emit("addedLabel", { ...this.labelPicked })
        },
        testModal() {
            this.$emit("test", false)
        },
        onLabel(label) {
            this.labelPicked = this.demoLabels.find((currLabel) => currLabel.id === label.id)
            this.labelPicked.isMarked = !this.labelPicked.isMarked

            const idx = this.labelsPicked?.findIndex(l => l.id === this.labelPicked.id)
            if(idx === -1) {
                this.labelsPicked.push(this.labelPicked)
                this.$emit("addedLabel", { ...this.labelPicked })
                return
            } 
            this.labelsPicked?.splice(idx, 1)
            this.$emit("addedLabel", { ...this.labelPicked })
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
