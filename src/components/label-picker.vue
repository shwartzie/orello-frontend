<template>
    {{ task }}
    <div class="members-btn">
        <span @click="onDisplayModal">ADD LABEL</span>
        <div class="pop-over" :class="isShown">
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
                    <el-input
                        v-model="filterBy.name"
                        placeholder="Search members"
                    />
                    <div class="pop-over-section">
                        <h4>Labels</h4>
                    </div>
                    <ul class="pop-over-member-list label-picker-ul-modal">
                        <li class="edit-labels-pop-over " v-for="label in demoLabels" :key="label.id">
                            <span class="card-label" :class="label.class">
                                {{label.class}}
                                <span>
                                    <i class="fa-solid fa-check"></i>
                                </span>
                            </span>
                            <a class="card-label-edit-button ">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                        </li>
                        <!-- <li v-for="label in task.labels" :key="label.id"> -->

                            <!-- <a @click="addLabel(label)">
                                <span>
                                    {{ label }}
                                    <img
                                        class="member-avatar"
                                        :src="label.color"
                                    /> 
                                </span>
                            </a> -->
                        <!-- </li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- <ul class="flex column">
        <li
            class="label-display"
            :style="{ backgroundColor: `${label.color}` }"
        >
            <span>
                <a @click="addLabel(label)">{{ label.title }}</a>
            </span>
        </li>
    </ul> -->
</template>

<script>
export default {
    emits: ['addedLabel'],
    props: {
        board: Object,
        task: Object,
    },
    data() {
        return {
            displayModal: false,
            filterBy: {
                name: "",
            },
            demoLabels: [
                {
                    id:'a101',
                    class:'card-label-green'
                }
                ,{
                    id:'a102',
                    class:'card-label-yellow'
                }
                ,{
                    id:'a103',
                    class:'card-label-orange'
                }
                ,{
                    id:'a104',
                    class:'card-label-red'
                },
                {
                    id:'a105',
                    class:'card-label-puprle'
                },
                {
                    id:'a106',
                    class:'card-label-blue'
                }, 
                {
                    id:'a107',
                    class:'card-label-sky'
                },
            ],
        }
    },
    created() {
        // console.log(this.board);
    },
    methods: {
        // addLabel(label) {
        //     this.$emit("addedLabel", label)
        // },
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
