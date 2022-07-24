<template>
        <div class="pop-over" v-if="displayModal">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Cover</span>
                <a class="pop-over-header-close-btn">
                    <i
                        class="fa-solid fa-x"
                        style="cursor: pointer"
                        @click="closeModal"
                    ></i>
                </a>
            </div>
            <div>
                <div class="pop-over-content">
                    <div class="pop-over-section">
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
</template>

<script>
export default {
    emits: ["addCover"],
    props: {
        board: Object,
    },
    data() {
        return {
            displayModal: false,
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
        }
    },
    created() {},
    methods: {
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },

        onColor(color) {
            this.$emit("addCover", color)
        },
        closeModal() {
            this.displayModal = false
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
