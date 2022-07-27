<template>

    <div v-if="task.cover" class="task-modal-cover">
        <img v-if="task.cover.url" :src="task.cover.url" alt="img">
        <div v-if="task.cover.color" class="cover-color-preview " :style="{ backgroundColor: task.cover.color }"></div>
    </div>

    <header class="window-header" style="position: relative">
        <task-modal-header :task="task" :group="group" :board="board" />
    </header>

    <section class="flex task-modal-content">
        <section class="left-side-modal-container">
            <h4 class="labels-logo">Labels</h4>
            <div class="flex labels">
                <div v-for="label in task.labels" :key="label.id">
                    <span class="card-label" :class="label.class">
                        <span style="text-align: center">
                            {{ label.title }}
                        </span>
                    </span>
                </div>
                <div class="label-modal-container">
                    <a class="card-detail-item-add-button" @click="toDisplayLabelModal = !toDisplayLabelModal">
                        <span>
                            <i class="fa-solid fa-plus"></i>
                        </span>
                    </a>
                    <div v-if="toDisplayLabelModal">
                        <label-picker :board="board" :task="task" @addedLabel="addLabel" @test="onCloseTaskModal" />
                    </div>
                </div>
                <!-- <h4 class="labels-logo">
                </h4> -->
                <div v-if="task.members?.length > 0" v-for="member in task.members" :key="member._id">
                    <span>
                        <img class="member-avatar" :src="member.imgUrl" />
                    </span>
                </div>
            </div>
            <div class="window-module">
                <div class="modal-description">
                    <task-description :task="task" @addDescription="onUpdateTask" />
                </div>
            </div>
            <div class="column" v-if="task.attachments">
                <div class="flex">
                    <span class="title-icon attachment"></span>
                    <span class="task-modal-title-container title-sub">Attachments</span>
                </div>
                <div class="flex column attachments">
                    <modal-attachment-preview @setCover="onUpdateTask" :attachments="task.attachments" />
                </div>
            </div>
            <div class="flex" v-if="task.checklists" v-for="checklist in task.checklists">
                <checklist :checklist="checklist" @updateChecklist="onUpdateChecklist" />
            </div>

            <div class="flex activities window-module column">
                <div class="flex space-between">
                    <div class="flex activity-title">

                        <span class="title-icon activity"></span>
                        <span class="task-modal-title-container title-sub">Activity</span>
                    </div>
                    <div class="flex align-center">

                        <a class="board-header-btn button-link comment-button">
                            <!-- <span>See more</span>
                            <span v-if="seeMore">See less</span> -->
                        </a>
                    </div>
                </div>
                <div class="flex column">

                    <div class="task-modal-layout flex">
                        <img class="member-avatar" />
                        <div class="comment-box flex">
                            <input class="comment-box-input js-new-comment-input" v-if="!board.isStatic" type="text"
                                placeholder="write a comment" />
                        </div>
                    </div>
                    <div v-for="activity in task.activities" class="flex">
                        <img class="member-avatar" :src="activity.task.imgUrl" />
                        <p>{{ activity.txt }}</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="flex column task-modal-btn-container">
            <div class="flex column side-bar">
                <div v-if="!this.loggedinUser.isJoined">
                    <task-modal-join @memberJoined="addMemberToTask" :loggedinUser="loggedinUser" />
                </div>
                <h4 class="btn-container-title">Add to card</h4>
                <modal-members @addMemberToTask="addMemberToTask" :board="board" />
                <div class="label-modal-container">
                    <a class="board-header-btn button-link side-bar-button"
                        @click.stop="sideLabelModal = !sideLabelModal">
                        <span>
                            <span class="btn-icon label"></span>
                        </span>
                        Labels
                    </a>
                    <div v-if="sideLabelModal">
                        <label-picker :board="board" :task="task" @addedLabel="addLabel" @test="onCloseSideModal" />
                    </div>
                </div>

                <a class="board-header-btn button-link side-bar-button" @click="this.addChecklist = !this.addChecklist">
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

            <a class="board-header-btn button-link side-bar-button" @click="displayCover = !displayCover"
                @closeCoverModal="onCloseCoverModal">
                <span class="btn-icon cover"> </span>
                Cover
            </a>
            <div v-if="displayCover" style="position:relative;">
                <task-cover @setCover="onUpdateTask" @closeCoverModal="onCloseCoverModal" />
            </div>

            <div class="flex column side-bar">
                <h4 class="btn-container-title actions-title">Actions</h4>
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
import taskDescription from "../task-modal-cmps/task-description.vue"
import taskCover from "../task-modal-cmps/task-cover.vue"
import taskModalHeader from '../task-modal-cmps/task-modal-header.vue'
import taskModalJoin from '../task-modal-cmps/task-modal-join.vue'


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
            addChecklist: false,
            displayModal: false,
            displayCover: false,
            toDisplayLabelModal: false,
            sideLabelModal: false,
        }
    },
    methods: {
        onCloseCoverModal() {
            this.displayCover = false
        },
        onCloseTaskModal() {
            this.toDisplayLabelModal = false
        },
        onCloseSideModal() {
            this.sideLabelModal = false
        },
        onDisplaySidebarModal() {
            this.displaySideBarModal = !this.displaySideBarModal
        },
        onCloseModal() {
            this.addChecklist = false
        },

        onUpdateTask(entity, prop) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            taskToAdd[prop] = entity
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd,
            })
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

            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd
            })

        },
        addMemberToTask(currMember) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const member = JSON.parse(JSON.stringify(currMember))
            const { tasks } = currGroup
            if (!taskToAdd.members) {
                taskToAdd.members = []
            }
            const idx = taskToAdd.members.findIndex(
                (currMember) => currMember._id === member._id
            )
            if (idx > -1) {
                member.isJoined = false
                taskToAdd.members.splice(idx, 1)
            } else {
                member.isJoined = true
                taskToAdd.members.push(member)
            }
            const taskIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[taskIdx] = taskToAdd
            const user = member
            this.$store.dispatch({ type: 'updateUser', user })
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd
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

            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd
            })
        },
        onAddChecklist(title) {
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


            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd,
            })
        },

    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    },
    mounted() { },
    unmounted() { },
    created() {

    },
    components: {
        labelPicker,
        modalMembers,
        todoModal,
        modalAttachment,
        checklist,
        modalAttachmentPreview,
        taskDescription,
        taskCover,
        taskModalHeader,
        taskModalJoin
    },
}
</script>
