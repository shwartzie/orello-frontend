<template>
    <span class="board-header-btn-divider"></span>
    <a class="board-header-btn filter-btn">
        <span>
            <i class="fa-solid fa-filter"></i>
        </span>
        filter</a>

    <div class="pop-over">
        <div class="pop-over-header">
            <span class="pop-over-header-title">Filter</span>
            <a class="pop-over-header-close-btn" @click="testModal">
                <i class="fa-solid fa-x" style="cursor: pointer"></i>
            </a>
        </div>
        <section>
            <div>
                <el-input></el-input>
            </div>
            <div class="pop-over-content">
                <div class="pop-over-section">
                    <h4>Members</h4>
                </div>
                <ul class="pop-over-member-list label-picker-ul-modal">
                    <li class="edit-labels-pop-over" v-for="member in board.members" :key="member._id">
                        <el-checkbox v-model="selectedMember"></el-checkbox>
                        <span>
                            <img class="member-avatar" :src="member.imgUrl" style="position:relative" />
                        </span>
                        <!-- <a class="card-label-edit-button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a> -->
                    </li>
                </ul>
            </div>
        </section>
        <section>
            <div class="pop-over-content">
                <div class="pop-over-section">
                    <h4>Due Date</h4>
                </div>
                <el-select v-model="value" class="m-2" placeholder="cel-selectategory">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                        @click="onSelect" />
                </el-select>
            </div>
        </section>
        <section>
            <div class="pop-over-content">
                <div class="pop-over-section">
                    <h4>Labels</h4>
                </div>
                <ul class="pop-over-member-list label-picker-ul-modal">
                    <li class="edit-labels-pop-over" v-for="label in demoLabels" :key="label.id">
                        <el-checkbox></el-checkbox>
                        <span class="card-label card-label-display" :class="label.class" @click="onLabel(label)">
                            <span v-if="label.isMarked">
                                <i class="fa-solid fa-check"></i>
                            </span>
                        </span>
                        <a class="card-label-edit-button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            options: [
                {
                    value: "No due date",
                    label: "No due date",
                },
                {
                    value: "Over Due",
                    label: "Over Due",
                },
                {
                    value: "Due Soon",
                    label: "Due Soon",
                },
            ],
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
    created() { },
    methods: {},
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
