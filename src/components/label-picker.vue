<template>
    <div class="members-btn">
        <div class="flex ">
            <h5>Labels</h5>
            <span @click="onDisplayModal">ADD LABEL</span>
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
                            <span class="card-label" :class="label.class">
                                {{ label.class }}
                                <span>
                                    <i class="fa-solid fa-check"></i>
                                </span>
                            </span>
                            <a class="card-label-edit-button" @click="addLabel(label)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <button class="label-btn full">Create a new label</button>
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
            
            demoLabels: [
                {
                    id: "a101",
                    class: "card-label-green",
                },
                {
                    id: "a102",
                    class: "card-label-yellow",
                },
                {
                    id: "a103",
                    class: "card-label-orange",
                },
                {
                    id: "a104",
                    class: "card-label-red",
                },
                {
                    id: "a105",
                    class: "card-label-purple",
                },
                {
                    id: "a106",
                    class: "card-label-blue",
                },
                {
                    id: "a107",
                    class: "card-label-sky",
                },
            ],
        }
    },
    created() {
        // console.log(this.board);
    },
    methods: {
        addLabel(label) {
            this.$emit("addedLabel", label)
        },
        closeLabel() {
            console.log("hi")
            this.$emit("closePicker")
        },
        onDisplayModal() {
            this.displayModal = !this.displayModal
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
