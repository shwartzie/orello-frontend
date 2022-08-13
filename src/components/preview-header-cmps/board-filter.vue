<template>
    <section style="position: relative">
        <span class="board-header-btn-divider"></span>
        <a class="board-header-btn filter-btn" @click="displayModal = !displayModal">
            <span>
                <img src="../../assets/svg/filter-icon.svg" alt="">
            </span>
            filter</a>

        <div class="pop-over filter-modal" v-if="displayModal" style="right:0;">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Filter</span>
                <a class="pop-over-header-close-btn" @click="closeModal">
                    <i class="fa-solid fa-x" style="cursor: pointer"></i>
                </a>
            </div>
            <section>
                <p class="keyword-title">Keyword</p>
                <div>
                    <el-input v-model="filterBy.groupTitle" @input="setFilterByKey"
                        placeholder="Filter by group title..." style="padding:0px 12px 0px;">
                    </el-input>
                </div>
                <p class="keywork-dis">Search cards, members, labels, and more.</p>
                <div class="pop-over-content" style="padding-bottom:0;">
                    <div class="pop-over-section">
                        <h4>Members</h4>
                    </div>
                    <ul class="pop-over-member-list label-picker-ul-modal" style="height:95px">
                        <li class="edit-labels-pop-over flex member-display" v-for="member in board.members"
                            :key="member._id">
                            <span>
                                <label>
                                    <input v-model="isSelected[member._id]" type="checkbox" @click="onMember(member)" />
                                </label>
                            </span>
                            <span class="flex">
                                <img class="member-avatar" :src="member.imgUrl" style="margin: 0px 10px;" />
                                <span style="color: #5e6c84;">
                                    {{ member.fullname }} ({{ member.username }})
                                </span>
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
                    <el-select v-model="filterBy.dateStatus" class="m-2" placeholder="Filter By Date Status">
                        <el-option v-for="status in options" :key="status.value" :value="status.value" @click="setFilterByDate"/>
                    </el-select>
                </div>
            </section>
            <section>
                <div class="pop-over-content" style="padding-bottom:0;">
                    <div class="pop-over-section">
                        <h4>Labels</h4>
                    </div>
                    <ul class="pop-over-member-list label-picker-ul-modal">
                        <li class="edit-labels-pop-over label-display-filter" v-for="label in demoLabels"
                            :key="label.id">
                            <span class="card-label card-label-display" :class="label.class" @click="onLabel(label)"
                                style="justify-content:flex-end;">
                                <span v-if="selectedLabel[label.id]" class="check-label">
                                    <i class="fa-solid fa-check" style="color:white"></i>
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

            filterBy: {
                labels: [],
                members: [],
                groupTitle: '',
                memberSelected: false,
                dateStatus: ''
            }
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

        closeModal() {
            this.displayModal = false
        },
        onLabel(selectedLabel) {
            const idx = this.filterBy.labels.findIndex(label => label === selectedLabel.id)
            this.selectedLabel[selectedLabel.id] = !this.selectedLabel[selectedLabel.id]
            if (idx !== -1) {
                this.filterBy.labels.splice(idx, 1)
            } else {
                this.filterBy.labels.push(selectedLabel.id)
            }
            this.$store.commit({ type: 'setFilterBy', filterBy: JSON.parse(JSON.stringify(this.filterBy)) })
        },
        onMember(selectedMember) {
            const idx = this.filterBy.members.findIndex(member => member === selectedMember._id)
            const member = JSON.parse(JSON.stringify(selectedMember))
            member.isSelected = this.isSelected[selectedMember._id]
            if (idx !== -1) {
                this.filterBy.members.splice(idx, 1)
            } else {
                this.filterBy.members.push(member._id)
            }
            this.$store.commit({ type: 'setFilterBy', filterBy: JSON.parse(JSON.stringify(this.filterBy)) })
        },
        setFilterByKey() {
            this.$store.commit({ type: 'setFilterBy', filterBy: JSON.parse(JSON.stringify(this.filterBy)) })
        },
        setFilterByDate() {
            this.$store.commit({ type: 'setFilterBy', filterBy: JSON.parse(JSON.stringify(this.filterBy)) })
        },



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
