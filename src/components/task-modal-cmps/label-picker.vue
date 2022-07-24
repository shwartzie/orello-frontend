<template>
    <div class="members-btn">
        <div class="flex">
            <a class="card-detail-item-add-button" @click="onDisplayModal">
                <span>
                    <i class="fa-solid fa-plus"></i>
                </span>
            </a>
        </div>

        <div class="pop-over" v-if="displayModal">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Labels</span>
                <a class="pop-over-header-close-btn">
                    <i
                        class="fa-solid fa-x"
                        style="cursor: pointer"
                        @click="onDisplayModal"
                    ></i>
                </a>
            </div>
            <div>
                <div class="pop-over-content">
                    <div class="pop-over-section">
                        <h4>Labels</h4>
                    </div>
                    <ul class="pop-over-member-list label-picker-ul-modal">
                        <li
                            class="edit-labels-pop-over"
                            v-for="label in demoLabels"
                            :key="label.id"
                        >
                            <span
                                class="card-label card-label-display"
                                :class="label.class"
                                @click="onLabel(label)"
                            >
                                <span v-if="label.isMarked">
                                    <i class="fa-solid fa-check"></i>
                                </span>
                            </span>
                            <a class="card-label-edit-button">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                        </li>
                    </ul>
                    <el-input
                        v-model="labelName"
                        placeholder="Enter label title"
                    />
                    <div>
                        <button class="label-btn full-width" @click="addLabel">
                            Create a new label
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["addedLabel"],
    props: {
        board: Object,
        task: Object,
    },
    data() {
        return {
            displayModal: false,
            labelName: "",
            demoLabels: [
                {
                    id: "a101",
                    class: "card-label-green",
                    isMarked: false,
                    title: "",
                },
                {
                    id: "a102",
                    class: "card-label-yellow",
                    isMarked: false,
                    title: "",
                },
                {
                    id: "a103",
                    class: "card-label-orange",
                    isMarked: false,
                    title: "",
                },
                {
                    id: "a104",
                    class: "card-label-red",
                    isMarked: false,
                    title: "",
                },
                {
                    id: "a105",
                    class: "card-label-purple",
                    isMarked: false,
                    title: "",
                },
                {
                    id: "a106",
                    class: "card-label-blue",
                    isMarked: false,
                    title: "",
                },
                {
                    id: "a107",
                    class: "card-label-sky",
                    isMarked: false,
                    title: "",
                },
            ],
            labelPicked: null,
            isMarked: false
        }
    },
    created() {},
    methods: {
        addLabel() {
            this.$emit("addedLabel", { ...this.labelPicked })
        },
        closeLabel() {
            this.$emit("closePicker")
        },
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },
        onLabel(label) {
            this.labelPicked = this.demoLabels.find(
                (currLabel) => currLabel.id === label.id
            )
            this.labelPicked.isMarked = !this.labelPicked.isMarked
            this.labelPicked.title = this.labelName
            this.$emit("addedLabel", {...this.labelPicked})
        },
    },
    computed: {
        isShown() {
            return this.displayModal ? "is-shown" : "not-shown"
        },
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
