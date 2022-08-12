<template>
    <a class="task-close-modal" @click="closeModal">
        <span class="title-icon close"></span>
    </a>
    <div v-if="task.cover" class="task-modal-cover">
        <img v-if="task.cover.url" :src="task.cover.url" alt="img" />
        <div v-if="task.cover.color" class="cover-color-preview" :style="{ backgroundColor: task.cover.color }"></div>
    </div>

    <header class="window-header" style="position: relative">
        <task-modal-header @changeTitle="onUpdateTask" :task="task" :group="group" :board="board" />
    </header>

    <section class="flex task-modal-content">
        <section class="left-side-modal-container">
            <div class="flex labels">
                <div class="label-modal-container column" v-if="task.labels?.length">
                    <div class="flex column">
                        <h4>Labels</h4>
                    </div>
                    <section class="flex wrap">
                        <div v-for="label in task.labels" :key="label.id">
                            <span class="card-label" :class="label.class">
                                <span style="text-align: center;color:white;">
                                    {{ label.title }}
                                </span>
                            </span>
                        </div>
                        <a class="card-detail-item-add-button" @click="toDisplayLabelModal = !toDisplayLabelModal"
                            title="Enter Labels To The Selected Task" v-title>
                            <span>
                                <i class="fa-solid fa-plus"></i>
                            </span>
                        </a>
                    </section>
                </div>

                <div v-if="toDisplayLabelModal">
                    <label-picker @addedLabel="addLabel" :board="board" :task="task" @test="onCloseTaskModal" />
                </div>

                <div class="members-task-display column" v-if="task.members?.length">
                    <h4 class="flex">Members</h4>
                    <div class="flex">
                        <div v-for="member in task.members" :key="member._id">
                            <span @click="showUserProfile" style="margin: 0 4px 4px 0">
                                <img class="member-avatar" :src="member.imgUrl" />
                                <!-- <member-mini-profile :member="member"/> -->
                            </span>
                        </div>
                    </div>
                </div>

                <div class="task-date-layout" v-if="task.dueDate">
                    <h4 class="flex column">Due Date</h4>
                    <div class="flex" :style="setWidth">
                        <task-date-status :task="task" @setTaskDateStatus="onSetTaskDateStatus" />
                        <span class="task-date-display">
                            {{ displayDueDate }}
                            <span :style="displayDateStatusBgc">
                                {{ displayDateStatusTxt }}
                            </span>
                        </span>
                    </div>
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
                <checklist :checklist="checklist" @updateChecklist="addUpdateChecklist"
                    @deleteChecklist="onDeleteChecklist" />
            </div>

            <div class="flex activities window-module column">
                <div class="flex space-between">
                    <div class="flex activity-title">
                        <span class="title-icon activity"></span>
                        <span class="task-modal-title-container title-sub">Activity</span>
                    </div>
                    <div class="flex align-center">
                        <a class="button-link comment-button side-bar-button" @click="seeMore = !seeMore">
                            <span class="see-more-btn">{{ seeMoreOrLess }}</span>
                        </a>
                    </div>
                </div>
                <div class="flex column">
                    <div class="task-modal-layout flex">
                        <img class="member-avatar comment-avatar " style="right: 5px;" :src="loggedinUser?.imgUrl"
                            v-if="task.activities?.length" />
                        <div class="comment-box flex column" :class="shadowbox" @click="addComment = !addComment">
                            <input class="comment-box-input js-new-comment-input" v-if="!board.isStatic" type="text"
                                placeholder="write a comment" v-model="newComment" />
                            <div v-if="addComment">
                                <a class="button-primary save-botton" disabled @click="saveComment">save</a>
                            </div>
                        </div>
                    </div>
                    <div v-for="activity in task.activities" class="flex column activity-container"
                        v-if="task.activities?.length && seeMore">
                        <div class="flex">
                            <div class="img-container">
                                <img class="member-avatar" :src="activity.byUser?.imgUrl" />
                            </div>
                            <div>
                                <span style="font-weight:700;">{{ activity.byUser.fullname }}</span>
                                <span class="inline-spacer"></span>
                                <span>{{ getActivityTime(activity) }}</span>
                            </div>
                        </div>
                        <div class="activity-txt flex align-center">
                            <p>{{ activity.txt }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="flex column task-modal-btn-container">
            <div class="flex column side-bar">
                <div title="By Pressing Join You Will Enter The Task..." v-title>
                    <task-modal-join @memberJoined="addMemberToTask" :loggedinUser="loggedinUser" :board="board"
                        :task="task" :group="group" />
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

                <a class="board-header-btn button-link side-bar-button" @click="displayDateModal = !displayDateModal">
                    <span class="btn-icon date">
                        <img src="../../assets/svg/date.svg" alt="date" />
                    </span>
                    Dates
                </a>
                <section style="position: relative">
                    <task-date-picker v-if="displayDateModal" @setTaskDate="onSetTaskDate"
                        @closeModal="onCloseDateModal" />
                </section>

                <modal-attachment @addAttachment="addAttachment" :task="task"
                    title="Enter Attachments To The Selected Task" v-title />
                <a class="board-header-btn button-link side-bar-button" :class="moveLabelBtn"
                    @click="displayCover = !displayCover" @closeCoverModal="onCloseCoverModal"
                    title="Give A Good Looking Cover To To The Selected Task" v-title>
                    <span class="btn-icon cover"> </span>
                    Cover
                </a>
            </div>


            <div v-if="displayCover" style="position: relative">
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
import taskModalHeader from "../task-modal-cmps/task-modal-header.vue"
import taskModalJoin from "../task-modal-cmps/task-modal-join.vue"
import memberMiniProfile from "../task-modal-cmps/member-mini-profile.vue"
import { userService } from "../../services/user.service"
import taskDatePicker from "../task-modal-cmps/task-date-picker.vue"
import taskDateStatus from "../task-modal-cmps/task-date-status.vue"

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
            displayDateModal: false,
            seeMore: false,
            isColumn: false,
        }
    },
    methods: {
        closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
        onCloseDateModal() {
            this.displayDateModal = false
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

        onSetTaskDateStatus(status) {
            const groupId = JSON.parse(JSON.stringify(this.group.id))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))

            this.$store.dispatch({
                type: "updateTaskDateStatus",
                groupId,
                taskToAdd,
                status,
            })
        },
        onSetTaskDate(startingDate, dueDate) {
            this.displayDateModal = false
            const groupId = JSON.parse(JSON.stringify(this.group.id))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))

            this.$store.dispatch({
                type: "updateTaskDueDates",
                groupId,
                taskToAdd,
                startingDate,
                dueDate,
            })
        },
        saveComment() {
            this.$store.dispatch({
                type: "onAddComment",
                groupId: this.group.id,
                taskId: this.task.id,
                comment: this.newComment
            })
        },

        onUpdateTask(entity, prop, txt = "change task name") {
            this.$store.dispatch({
                type: "onUpdateTask",
                groupId: this.group.id,
                taskId: this.task.id,
                entity, prop, txt
            })
        },

        addLabel(label) {
            this.$store.dispatch({
                type: "onAddLabel",
                groupId: this.group.id,
                taskId: this.task.id,
                label
            })
        },

        addMemberToTask(currMember) {
            const member = JSON.parse(JSON.stringify(currMember))
            this.$store.dispatch({
                type: "onAddMemberToTask",
                groupId: this.group.id,
                taskId: this.task.id,
                member,
            })
        },
        addAttachment(attachment, taskId) {
            this.$store.dispatch({
                type: "addTaskAttachment",
                groupId: this.group.id,
                taskId,
                attachment
            })
        },
        onAddChecklist(title) {
            const checklist = {
                title,
                id: utilService.makeId(),
            }
            this.addUpdateChecklist(checklist)
        },
        onDeleteChecklist(checklist) {
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const user = userService.getLoggedinUser()

            const { tasks } = currGroup
            const idx = taskToAdd.checklists.findIndex((currCheck) => currCheck.id === checklist.id)
            if (idx > -1) {
                taskToAdd.checklists.splice(idx, 1)
            } else {
                return
            }
            taskToAdd.activities.unshift({
                byUser: user,
                txt: `deleted the checklist ${checklist.title} checklist in ${taskToAdd.title} in ${currGroup.title}`,
                createdAt: Date.now(),

            })
            const tasksIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[tasksIdx] = taskToAdd

            this.$store.dispatch({
                type: "updateTaskChecklist",
                currGroup,
                taskToAdd,
            })
        },
        addUpdateChecklist(checklist) {
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const user = userService.getLoggedinUser()

            const { tasks } = currGroup
            if (!taskToAdd.checklists?.length) {
                checklist.id = utilService.makeId()
                taskToAdd.checklists = [checklist]
            } else if (checklist.id) {
                const idx = taskToAdd.checklists.findIndex(
                    (currCheck) => currCheck.id === checklist.id
                )
                if (idx > -1) {
                    taskToAdd.checklists[idx] = checklist
                }
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
                currGroup,
                taskToAdd,
            })
        },
        getActivityTime(activity) {
            return utilService.getTimestamp(activity.createdAt)
        },
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        displayDueDate() {
            const taskDate = new Date(this.task.dueDate)
            // const month = taskDate.getMonth() + 1
            const monthStr = taskDate.toLocaleString("default", {
                month: "long",
            })
            const day = taskDate.getDay()
            const hour = taskDate.getHours()
            const minutes = taskDate.getMinutes()
            const suffix = hour >= 12 ? "PM" : "AM"
            const hours = ((hour + 11) % 12) + 1
            const monthFormatted = monthStr.split("").slice(0, 3).join("")
            return `${monthFormatted} ${day} at ${hours}:${minutes} ${suffix}`
        },
        displayDateStatusBgc() {
            return this.task.status
                ? {
                    backgroundColor: "#61BD4F",
                    marginLeft: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    lineHeight: "16px",
                    padding: "0 4px",
                    borderRadius: "2px",
                    margin: "auto 0 auto 8px",
                }
                : {
                    backgroundColor: "#F2D600",
                    marginLeft: "10px",
                    color: "#172B4D",
                    fontSize: "12px",
                    lineHeight: "16px",
                    padding: "0 4px",
                    borderRadius: "2px",
                    margin: "auto 0 auto 8px",
                }
        },
        displayDateStatusTxt() {
            return this.task.status ? "Completed" : "Due soon"
        },
        setWidth() {
            return this.task.status ? { width: "250px" } : { width: "230px" }
        },
        seeMoreOrLess() {
            return this.seeMore ? "Hide Details " : "Show Details"
        },
        shadowbox() {
            return this.addComment ? 'input-shadowbox' : ''
        },
        moveLabelBtn() {
            return this.task.cover ? 'move-up' : ''
        },
    },
    mounted() { },
    unmounted() { },
    created() { },
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
        memberMiniProfile,
        taskDatePicker,
        taskDateStatus,
    },
}
</script>
