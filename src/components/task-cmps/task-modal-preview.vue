<template>

    <div v-if="task.cover" class="task-modal-cover">
        <img v-if="task.cover.url" :src="task.cover.url" alt="img">
        <div v-if="task.cover.color" class="cover-color-preview " :style="{ backgroundColor: task.cover.color }"></div>
    </div>

    <header class="window-header" style="position: relative">
        <task-modal-header @changeTitle="onUpdateTask" :task="task" :group="group" :board="board" />
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
                    <a class="card-detail-item-add-button" @click="toDisplayLabelModal = !toDisplayLabelModal"
                        title="Enter Labels To The Selected Task" v-title>
                        <span>
                            <i class="fa-solid fa-plus"></i>
                        </span>
                    </a>
                    <div v-if="toDisplayLabelModal">
                        <label-picker @addedLabel="addLabel" @test="onCloseTaskModal" />
                    </div>
                </div>
                <!-- <h4 class="labels-logo">
                </h4> -->
                <div v-if="task.members?.length" v-for="member in task.members" :key="member._id">
                    <span @click="showUserProfile">
                        <img class="member-avatar" :src="member.imgUrl" />
                        <!-- <member-mini-profile :member="member"/> -->
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
            <div class="flex" v-if="task.checklists" v-for="checklist in task.checklists" :key="task.id">
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
                        <img class="member-avatar" :src="loggedinUser.imgUrl" v-if="task.activities?.length" />
                        <div class="comment-box flex column" @click="addComment = !addComment">
                            <input class="comment-box-input js-new-comment-input" v-if="!board.isStatic" type="text"
                                placeholder="write a comment" v-model="newComment" />
                            <div v-if="addComment">
                                <a class="button-primary" disabled @click="saveComment">save</a>
                            </div>

                        </div>
                    </div>
                    <div v-for="activity in task.activities" class="flex column" v-if="task.activities?.length">
                        <div>
                            <img class="member-avatar" :src="activity.byUser.imgUrl" />
                            <span>{{ activity.byUser.fullname }}</span>
                            <span>{{ getActivityTime(activity) }}</span>
                        </div>
                        <p>{{ activity.txt }}</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="flex column task-modal-btn-container">
            <div class="flex column side-bar">
                <div title="By Pressing Join You Will Enter The Task..." v-title>
                    <task-modal-join @memberJoined="addMemberToTask" :loggedinUser="loggedinUser" :board="board"
                        :task="task" :group="group"/>
                </div>
                <h4 class="btn-container-title">Add to card</h4>
                <modal-members @addMemberToTask="addMemberToTask" :board="board"
                    title="Enter Members That Have Joined The Board To The Selected Task" v-title />
                <div class="label-modal-container" title="Enter Labels To The Selected Task" v-title>
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

                <a class="board-header-btn button-link side-bar-button" @click="this.addChecklist = !this.addChecklist"
                    title="Enter A Checklist To The Selected Task" v-title>
                    <span>
                        <span class="btn-icon checklist"></span>
                    </span>
                    Checklist</a>
                <div class="todos-container" v-if="addChecklist">
                    <todo-modal @closeModal="onCloseModal" @updateChecklist="onAddChecklist" />
                </div>
                <a class="board-header-btn button-link side-bar-button">
                    <span class="btn-icon date">
                        <img src="../../assets/svg/date.svg" alt="date" />
                    </span>
                    Dates</a>

                <modal-attachment @addAttachment="addAttachment" :task="task"
                    title="Enter Attachments To The Selected Task" v-title />
            </div>

            <a class="board-header-btn button-link side-bar-button" @click="displayCover = !displayCover"
                @closeCoverModal="onCloseCoverModal" title="Give A Good Looking Cover To To The Selected Task" v-title>
                <span class="btn-icon cover"> </span>
                Cover
            </a>
            <div v-if="displayCover" style="position:relative;">
                <task-cover @setCover="onUpdateTask" @closeCoverModal="onCloseCoverModal" />
            </div>

            <!-- <div class="flex column side-bar">
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
            </div> -->
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
import memberMiniProfile from '../task-modal-cmps/member-mini-profile.vue'
import { userService } from "../../services/user.service"
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
            addComment: false,
            newComment: "",
        }
    },
    methods: {
        saveComment() {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            const user = userService.getLoggedinUser()
            taskToAdd.activities.unshift({
                byUser: user,
                txt: `${this.newComment} `,
                createdAt: Date.now(),
            })
            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd,
            })
        },
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

        onUpdateTask(entity, prop, txt = 'change task name') {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            taskToAdd[prop] = entity
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            const user = userService.getLoggedinUser()
            taskToAdd.activities.unshift({
                byUser: user,
                txt: `${txt} in ${taskToAdd.title} in ${currGroup.title}`,
                createdAt: Date.now(),

            })
            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.dispatch({
                type: "updateTaskCover",
                currBoard,
                currGroup,
                taskToAdd,
            })
        },

        addLabel(label) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const user = userService.getLoggedinUser()

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
            taskToAdd.activities.unshift({
                byUser: user,
                txt: `added label in ${taskToAdd.title} in ${currGroup.title}`,
                createdAt: Date.now(),

            })

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
            taskToAdd.activities.unshift({
                byUser: member,
                txt: `joined in ${taskToAdd.title} in ${currGroup.title}`,
                createdAt: Date.now(),

            })
            this.$store.dispatch({
                type: "onAddMemberToTask",
                currBoard,
                currGroup,
                taskToAdd,
                member
            })
        },
        addAttachment(task) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = task
            const user = userService.getLoggedinUser()

            const idx = currGroup.tasks.findIndex(
                (task) => task.id === taskToAdd.id
            )
            taskToAdd.activities.unshift({
                byUser: user,
                txt: `added Attachment in ${taskToAdd.title} in ${currGroup.title}`,
                createdAt: Date.now(),

            })
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
            const user = userService.getLoggedinUser()

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
            taskToAdd.activities.unshift({
                byUser: user,
                txt: `updated ${checklist.title} checklist in ${taskToAdd.title} in ${currGroup.title}`,
                createdAt: Date.now(),

            })
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[tasksIdx] = taskToAdd


            this.$store.dispatch({
                type: "updateTaskChecklist",
                currBoard,
                currGroup,
                taskToAdd,
            })
        },
        getActivityTime(activity) {
            return utilService.getTimestamp(activity.createdAt)
        }

    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },

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
        taskModalJoin,
        memberMiniProfile
    },
}
</script>
