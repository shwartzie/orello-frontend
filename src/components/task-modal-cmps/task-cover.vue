<template>
    <div class="pop-over task-cover-pop-over" >
        <div class="pop-over-header">
            <span class="pop-over-header-title">Cover</span>
            <a class="pop-over-header-close-btn">
                <i class="fa-solid fa-x" style="cursor: pointer" @click="closeModal"></i>
            </a>
        </div>
        <div>
            <div class="pop-over-content">
                <div>
                    <h4>Size</h4>
                    <el-button>Half Size</el-button>
                    <el-button>Full Size</el-button>
                </div>
                <div class="pop-over-section"></div>
                <ul class="pop-over-member-list label-picker-ul-modal" style="
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        align-items: center;
                        height: 85px;
                    ">
                    <li v-for="label in demoLabels" :key="label.id" style="width: 7px">
                        <span class="card-label" style="width: 7px" :class="label.class" @click="onLabel(label)">
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['closeCoverModal', "addTaskCover"],

    // .card - label - yellow {
    //     background - color: #f2d600;
    //     transition: background - color 0.3s, color 85ms;
    // 	&:hover {
    //         background - color: #dac739;
    //     }
    // }
    // .card - label - orange {
    //     background - color: #ff9f1a;
    //     transition: background - color 0.3s, color 85ms;
    // 	&:hover {
    //         background - color: #e69524;
    //     }
    // }
    // .card - label - red {
    //     background - color: #eb5a46;
    //     transition: background - color 0.3s, color 85ms;
    // 	&:hover {
    //         background - color: #d65645;
    //     }
    // }
    // .card - label - purple {
    //     background - color: #c377e0;
    //     transition: background - color 0.3s, color 85ms;
    // 	&:hover {
    //         background - color: #a451c5;
    //     }
    // }
    // .card - label - blue {
    //     background - color: #0079bf;
    //     transition: background - color 0.3s, color 85ms;
    // 	&:hover {
    //         background - color: #136b9f;
    //     }
    // }
    // .card - label - sky {
    //     background - color: #00c2e0;
    //     transition: background - color 0.3s, color 85ms;
    // 	&:hover {
    //         background - color: #12a4ba;
    //     }
    // }
    data() {
        return {
            demoLabels: [
                {
                    id: "a101",
                    color: "#61bd4f",
                    isMarked: false,
                },
                {
                    id: "a102",
                    class: "card-label-yellow",
                    isMarked: false,
                },
                {
                    id: "a103",
                    class: "card-label-orange",
                    isMarked: false,
                },
                {
                    id: "a104",
                    class: "card-label-red",
                    isMarked: false,
                },
                {
                    id: "a105",
                    class: "card-label-purple",
                    isMarked: false,
                },
                {
                    id: "a106",
                    class: "card-label-blue",
                    isMarked: false,
                },
                {
                    id: "a107",
                    class: "card-label-sky",
                    isMarked: false,
                },
            ],
            labelPicked: null,
            isMarked: false,
        }
    },
    created() { },
    methods: {
        addLabel() {
            this.$emit("addedLabel", { ...this.labelPicked })
        },
        closeModal() {
            this.$emit("closeCoverModal", false)
        },
        onLabel(label) {
            this.labelPicked = this.demoLabels.find(
                (currLabel) => currLabel.id === label.id
            )
            this.labelPicked.isMarked = !this.labelPicked.isMarked
            this.$emit("addTaskCover", { ...this.labelPicked }, 'cover')
        },
    },
    computed: {
        onMarked() {
            return this.labelPicked.isMarked
                ? {
                    boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #0079bf;",
                }
                : {
                    boxShadow: "none",
                }
        },
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
