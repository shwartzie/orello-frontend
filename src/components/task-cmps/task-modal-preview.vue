<template>
    <!-- <img v-if="task.attachments" :src="task.attachments[0]" alt="" /> -->
    <header class="window-header">
        <div class="flex space-between">
            <div class="flex task-modal-main-title-container title-main">
                <span class="title-icon header"></span>
                <div class="flex column task-modal-title title-modal">
                    {{ task.title }}
                    <p>
                        in list
                        <a>
                            {{ group.title }}
                        </a>
                    </p>
                </div>
            </div>
            <a class="task-close-modal" @click="closeModal">
                <span class="title-icon close"></span></a>
        </div>
    </header>

    <section class="flex">
        <section class="left-side-modal-container">
            <h4 style="padding-left: 40px">Labels</h4>
            <div class="flex labels">
                <div style="padding-right: 5px" v-for="label in task.labels" :key="label.id">
                    <span class="card-label" :class="label.class">
                        <span style="text-align: center">
                            {{ label.title }}
                        </span>
                    </span>
                </div>
                <div @click="">


                </div>
                <a class="card-detail-item-add-button" @click.stop="onDisplayModal">
                    <span>
                        <i class="fa-solid fa-plus"></i>
                        <label-picker :board="board" :task="task" @addedLabel="addLabel" :displayModal="displayModal"
                            @closeModal="onCloseTaskModal" />
                    </span>
                </a>
                <div v-if="task.members?.length" v-for="member in task.members" :key="member._id">
                    <span>
                        <img class="member-avatar" :src="member.imgUrl" />
                    </span>
                </div>
            </div>
            <div class="window-module">
                <div class="modal-description">
                    <div class="flex column">
                        <div class="flex">
                            <span class="title-icon description"></span>
                            <span class="task-modal-title-container title-sub">Description</span>
                        </div>
                        <div class="flex column full-width">
                            <task-description :task="task" @addDescription="onAddDescription" />
                        </div>
                    </div>
                </div>
            </div>
            <div class=" column" v-if="task.attachments">
                <div class="flex">
                    <span class="title-icon attachment"></span>
                    <span class="task-modal-title-container title-sub">Attachments</span>
                </div>
                <div class="flex  column attachments">
                    <modal-attachment-preview :attachments="task.attachments" />
                </div>
            </div>
            <div class="flex" v-if="task.checklists" v-for="checklist in task.checklists">
                <checklist :checklist="checklist" @updateChecklist="onUpdateChecklist" />
            </div>

            <div class="flex activities window-module">
                <div class="flex">
                    <span class="title-icon activity"></span>
                    <span class="task-modal-title-container title-sub">Activity</span>
                </div>
                <div class=" flex column">
                    <div v-for="activity in task.activities">
                        <p>Activity</p>
                    </div>
                    <div class="task-modal-layout">
                        <input v-if="!board.isStatic" type="text" placeholder="write a comment" />
                    </div>
                </div>
            </div>
        </section>
        <section class="flex column task-modal-btn-container">
            <div class="flex column side-bar">
                <h4 class="btn-container-title">Add to card</h4>
                <modal-members @addMemberToTask="addMemberToTask" :board="board" />

                <a class="board-header-btn button-link side-bar-button" @click.stop="onDisplayModal">
                    <span>
                        <span class="btn-icon label"></span>
                    </span>
                    <label-picker :board="board" :task="task" @addedLabel="addLabel" :displayModal="displayModal"
                        @closeModal="onCloseTaskModal" />
                    Labels
                </a>

                <a class="board-header-btn button-link side-bar-button" @click="this.addChecklist = true">
                    <span>
                        <span class="btn-icon checklist"></span>
                    </span>
                    Checklist</a>
                <div class="todos-container" v-if="addChecklist">
                    <todo-modal @closeModal="onCloseModal" @updateChecklist="onAddChecklist" />
                </div>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span class="btn-icon date">
                        <img src="../../assets/svg/date.svg" alt="date" />
                    </span>
                    Dates</a>

                <modal-attachment @addAttachment="addAttachment" :task="task" />
            </div>
            <div class="flex column">
                <h4>automation</h4>
                <a class="board-header-btn button-link side-bar-button" href="">+ Add button</a>
            </div>
            <div class="flex column">
                <h4>Actions</h4>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <span class="btn-icon move"></span>
                    </span>
                    Move</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <span class="btn-icon copy"></span>
                    </span>
                    Copy</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <span class="btn-icon archive"></span>
                    </span>
                    Archive</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <span class="btn-icon share"></span>
                    </span>
                    Share</a>
            </div>
        </section>
    </section>
</template>

<script>
import todoModal from "../task-modal-cmps/todo-modal.vue"
import labelPicker from "../task-modal-cmps/label-picker.vue"
import modalMembers from "../task-modal-cmps/modal-members.vue"
import modalAttachment from "../task-modal-cmps/modal-attachment.vue"
import modalAttachmentPreview from "../task-modal-cmps/modal-attachment-preview.vue"
import checklist from "../checklist-cmps/checklist.vue"
import { utilService } from "../../services/util.service"
import TaskDescription from "../task-modal-cmps/task-description.vue"
export default {
    props: {
        board: Object,
        group: Object,
        task: Object,
    },
    emits: ["closeModal", "updateChecklist"],
    data() {
        return {
            currGroup: null,
            labelPicker: false,
            addChecklist: false,
            displayModal: false,
        }
    },
    created() { },
    methods: {
        onAddDescription(description) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            taskToAdd.description = description
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[tasksIdx] = taskToAdd
            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
        onCloseTaskModal(bool) {
            this.displayModal = bool
        },
        onDisplaySidebarModal() {
            this.displaySideBarModal = !this.displaySideBarModal
        },
        onCloseModal() {
            this.addChecklist = false
        },
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },
        closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
        addLabel(label) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            if (!taskToAdd.labels) {
                taskToAdd.labels = []
            }
            const idx = taskToAdd.labels.findIndex(
                (currLabel) => currLabel.id == label.id
            )
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)

            if (idx === -1) {
                taskToAdd.labels.push(label)
            } else {
                taskToAdd.labels.splice(idx, 1)
            }

            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
        addMemberToTask(member) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))

            const { tasks } = currGroup

            const idx = taskToAdd.members.findIndex(
                (currMember) => currMember._id === member._id
            )
            if (idx > -1) {
                taskToAdd.members.splice(idx, 1)
            } else {
                taskToAdd.members.push(member)
            }
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
        addAttachment(task) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = task
            const idx = currGroup.tasks.findIndex(
                (task) => task.id === taskToAdd.id
            )
            currGroup.tasks.splice(idx, 1, taskToAdd)
            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
        onAddChecklist(title) {
            console.log(title)
            const checklist = {
                title,
            }
            this.addUpdateChecklist(checklist)
        },
        onUpdateChecklist(newChecklist) {
            this.addUpdateChecklist(newChecklist)
        },
        addUpdateChecklist(checklist) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            if (!taskToAdd.checklists?.length) {
                checklist.id = utilService.makeId()
                taskToAdd.checklists = [checklist]
            } else if (checklist.id) {
                taskToAdd.checklists.forEach((currCheck, idx) => {
                    if (currCheck.id === checklist.id) {
                        taskToAdd.checklists[idx] = checklist
                    }
                })
            } else {
                checklist.id = utilService.makeId()
                taskToAdd.checklists.push(checklist)
            }

            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        labelPicker,
        modalMembers,
        todoModal,
        modalAttachment,
        checklist,
        modalAttachmentPreview,
        TaskDescription
    },
}
</script>
