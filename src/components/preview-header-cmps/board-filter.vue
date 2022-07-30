<template>
    <section style="position: relative">

        <span class="board-header-btn-divider"></span>
        <a class="board-header-btn filter-btn" @click="displayModal = !displayModal">
            <span>
                <i class="fa-solid fa-filter"></i>
            </span>
            filter</a>

        <div class="pop-over" v-if="displayModal" style="right:0;">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Filter</span>
                <a class="pop-over-header-close-btn" @click="closeModal">
                    <i class="fa-solid fa-x" style="cursor: pointer"></i>
                </a>
            </div>
            <section>
                <div>
                    <el-input v-model="filterBy.groupTitle" placeholder="Filter By Title" style="padding:0px 12px 0px;">
                    </el-input>
                </div>
                <div class="pop-over-content" style="padding-bottom:0;">
                    <div class="pop-over-section">
                        <h4>Members</h4>
                    </div>
                    <ul class="pop-over-member-list label-picker-ul-modal" style="height:95px">
                        <li class="edit-labels-pop-over" v-for="member in board.members" :key="member._id">
                            <span>
                                <label>
                                    <input v-model="isSelected[member._id]" type="checkbox" @click="onMember(member)" />
                                </label>
                            </span>
                            <span>
                                <img class="member-avatar" :src="member.imgUrl" style="position:relative" />
                                {{ member.fullname }} ({{ member.username }})
                            </span>
                            <!-- <a class="card-label-edit-button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a> -->
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <div class="pop-over-content" style="padding-bottom:0;">
                    <div class="pop-over-section">
                        <h4>Due Date</h4>
                    </div>
                    <el-select v-model="filterBy.status" class="m-2" placeholder="Filter By Date Status">
                        <el-option v-for="status in options" :key="status.value" :value="status.value" />
                    </el-select>
                </div>
            </section>
            <section>
                <div class="pop-over-content" style="padding-bottom:0;">
                    <div class="pop-over-section">
                        <h4>Labels</h4>
                    </div>
                    <ul class="pop-over-member-list label-picker-ul-modal">
                        <li class="edit-labels-pop-over" v-for="label in demoLabels" :key="label.id">
                            <span class="card-label card-label-display" :class="label.class" @click="onLabel(label)">
                                <span v-if="selectedLabel[label.id]">
                                    <i class="fa-solid fa-check"></i>
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import { utilService } from '../../services/util.service.js'

export default {
    props: {
        board: Object,
    },
    data() {
        return {
            isSelected: false,
            displayModal: false,
            selectedLabel: false,
            filterBy: {
                groupTitle: '',
                memberSelected: false,
                dateStatus: ''
            },
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
    created() {
        const selected = {}

        this.board.members.forEach(member => {
            selected[member._id] = !!member.isSelected
        })

        this.isSelected = selected

        const labelsPicked = {}

        this.board.groups.forEach(group => {
            group.tasks.forEach((task) => {
                task.labels?.forEach(label => {
                    labelsPicked[label.id] = !!label.isSelected
                })
            })
        })
        this.selectedLabel = labelsPicked

    },
    methods: {
        filterMembers(task, filterBy) {
            return utilService.filterArray(task.members, filterBy)
        },
        filterLabels(task, filterBy) {
            return utilService.filterArray(task.labels, filterBy)
        },

        closeModal() {
            this.displayModal = false
        },
        onLabel(selectedLabel) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const label = this.demoLabels.find((demoLabel) => {
                if (demoLabel.id === selectedLabel.id) {
                    return demoLabel
                }
            })
            this.selectedLabel[label.id] = !this.selectedLabel[label.id]
            label.isSelected = this.selectedLabel[label.id]
            if (!label.isSelected) {
                this.$store.dispatch({ type: 'setBoardById', _id: currBoard._id })
                return
            }
            this.$store.dispatch({ type: 'filterTaskBy', currBoard, filterFunc: this.filterLabels, filterBy: label })
        },
        onMember(selectedMember) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const member = JSON.parse(JSON.stringify(selectedMember))
            member.isSelected = !this.isSelected[member._id]
            if (!member.isSelected) {
                this.$store.dispatch({ type: 'setBoardById', _id: currBoard._id })
                return
            }
            this.$store.dispatch({ type: 'filterTaskBy', currBoard, filterFunc: this.filterMembers, filterBy: member })
        }
    },
    computed: {
        originalBoard() {
            return this.$store.getters.originalBoard
        }
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
