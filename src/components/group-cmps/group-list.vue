<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between title-container">
                <textarea contenteditable @change.prevent="preventNewLines" @input="changeTitle"
                    class="title-changer">{{ group.title }}</textarea>
                <a @click="groupModalActions = !groupModalActions" class="board-header-btn board-header-show-menu">
                    <i class="fa-solid fa-ellipsis" style="color: #172b4d; opacity: 0.4; font-size: 13px"></i>
                </a>
            </div>
            <group-actions v-if="groupModalActions" class="group-actions" @closeModal="onCloseLabelModal"
                @groupAction="onGroupAction" :boards="boards" :groupIdx="currGroupIdx" :board="currBoard" />

            <Container group-name="group" :get-child-payload="getChildPayload(group.id)"
                @drop="onDrop($event, group.id)" class="tasks" id="style-1" drag-class="card-ghost" drop-class="card-ghost-drop"
                :drop-placeholder="dropPlaceholderOptions">
                <add-task-cmp @closeModal="groupAddTask = false" @newTask="addNewTask" v-if="groupAddTask" />
                <Draggable class=" flex column list-card-details" v-for="(task, idx) in group.tasks" :key="task._id">
                    <div v-if="task.cover" class="task-cover-container">
                        <div v-if="task.cover.color" :style="{ backgroundColor: task.cover.color }"
                            class="task-cover-color">
                        </div>
                        <img v-if="task.cover.url" :src="task.cover.url" class="task-cover-img" draggable="false" />
                    </div>
                    <task-modal v-if="showModal" @closeModal="onCloseModal" />
                    <section class="list-card" @click="onShowModal(task, group)">
                        <div class="label-preview-container" v-if="task.labels?.length > 0">
                            <span v-for="label in task.labels" :key="label.id" class="card-label small-height"
                                :class="label.class">

                                <!-- <span @click="displayTitle(label.title)" >
                                    {{labelTitle}}
                                </span> -->
                            </span>
                        </div>

                        <div class="flex space-between" style="margin-bottom:4px;">
                            <span>
                                {{ task.title }}
                            </span>
                            <i class="fa-solid fa-pen-to-square edit-card" @click.stop="onDeleteTask(task)"
                                v-if="!isStatic"></i>
                        </div>
                        <div class="task-members-display">
                            <div class="flex task-icon-container">

                                <div class="task-date-display" :class="setTaskDateBgc(task.status)" v-if="task.dueDate">
                                    <span class="recent-icon">
                                    </span>
                                    <span v-if="task.dueDate">
                                        {{ displayTaskDate(task.dueDate) }}
                                    </span>
                                </div>

                                <span class="description-icon" v-if="task.description">
                                </span>

                                <span v-if="task.attachments">
                                    <i class="badge-icon icon-sm icon-attachment"></i>
                                </span>

                                <span v-if="task.checklists" v-for="(checklist, idx ) in task.checklists">
                                    <div v-if="checklist.tasks?.length >= 0">
                                        <i class="badge-icon icon-sm icon-checklist"></i>
                                        {{ todoList(checklist) }}
                                    </div>
                                </span>


                                <div v-for="(activity, idx ) in task.activities" :key="activity.id"
                                    v-if="idx === task.activities.length - 1 && +commentCount(task.activities) > 1">
                                    <div>
                                        <i class="badge-icon icon-sm icon-comment"></i>
                                        {{ commentCount(task.activities) }}
                                    </div>
                                </div>

                            </div>
                            <div>
                                <span class="member-icon" v-for="member in task.members" v-if="task.members?.length"
                                    :key="member._id" style="margin-left:2px">
                                    <img class="member-avatar" :src="member.imgUrl" />

                                </span>
                            </div>
                        </div>
                    </section>

                </Draggable>
            </Container>
            <a v-if="!isStatic && !addTask && !groupAddTask" @click="addTask = true" class="add-card">
                <div class="open-card-composer">
                    <span class="plus"></span>
                    <span>Add a card </span>
                </div>
                <span class="duplicate-group" @click.stop="dupGroup">
                </span>
            </a>
            <add-task-cmp @closeModal="addTask = false" @newTask="addNewTask" v-if="addTask && !groupAddTask" />
        </section>
        <quick-card-editor v-if="quickEdit" :currTask="currTaskToEdit" />
    </div>

</template>

<script>

import taskPreview from "../task-cmps/task-preview.vue"
import taskModal from "../task-cmps/task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import groupActions from "./group-actions.vue"
import quickCardEditor from "../task-cmps/quick-card-editor.vue"
import addTaskCmp from "../task-cmps/add-task-cmp.vue"
import { userService } from "../../services/user.service"
import { utilService } from "../../services/util.service"


export default {
    name: "group-list",
    emits: ["closeModal", "updateGroups", "loadTask"],
    data() {
        return {
            labelTitle: '',
            showModal: false,
            currGroup: {},
            groups: [],
            addTask: false,
            groupAddTask: false,
            quickEdit: false,
            currTaskToEdit: {},
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true
            },
            groupModalActions: false,
            currGroupIdx: null,
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
        board: Object,
    },
    created() {
        this.currGroup = JSON.parse(JSON.stringify(this.group))
        this.currGroupIdx = this.board.groups.findIndex((group) => group.id === this.currGroup.id)
    },
    methods: {
        displayTitle(title) {
            if (title) {
                console.log('title:', title)
                this.labelTitle = title
            }
        },
        onGroupAction(action) {
            if (action === 'Copy') {
                this.dupGroup()
            } else if (action === 'Add') {
                this.groupAddTask = !this.groupAddTask
            }
            this.onCloseLabelModal()
        },
        onCloseLabelModal() {
            this.groupModalActions = false
        },
        dupGroup() {
            const idx = this.board.groups.findIndex(group => group.id === this.currGroup.id)
            this.$store.dispatch({ type: 'addGroup',  group:this.group, idx })
        },
        onCloseModal() {
            this.showModal = false
        },
        onShowModal(task, group) {
            this.$emit("loadTask", task, group)
        },
        addNewTask(taskToAdd) {
            this.$store.dispatch({ type: 'addTask', groupId:this.group.id, taskToAdd })
        },
        onDeleteTask(task) {
            this.$store.dispatch({ type: 'onDeleteTask', groupId: this.group.id, task })
        },
        onDrop(dropResult, groupId) {
            const { removedIndex, addedIndex } = dropResult
            if (removedIndex !== null || addedIndex !== null) {
                this.$emit('updateGroups', groupId, dropResult)
            }
        },
        getChildPayload(groupId) {
            return index => {
                const task = this.board.groups.filter(currGroup => currGroup.id === groupId)[0].tasks[index]
                JSON.parse(JSON.stringify(task))
                return task
            }
        },
        changeGroupLocation(newBoardId, pos) {
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const allBoards = JSON.parse(JSON.stringify(this.$store.getters.boards))
            const newBoard = allBoards.find((board) => board._id === newBoardId)

            // const removedIdx=currBoard.groups.findIndex(group=>{group.id===currGroup.id})
            // currBoard.groups.splice(idx,1)
            // newBoard.groups.splice(pos,0)
        },
        changeTitle({ path: [{ value }] }) {
            this.$store.dispatch({ type: 'updateGroupOnChangeTitle', groupId: this.currGroup.id, title:value })
        },
        displayTaskDate(dueDate) {
            const taskDate = new Date(dueDate)
            // const month = taskDate.getMonth() + 1
            const monthStr = taskDate.toLocaleString("default", {
                month: "long",
            })
            const day = taskDate.getDay()
            const monthFormatted = monthStr.split("").slice(0, 3).join("")
            return `${monthFormatted} ${day}`
        },
        setTaskDateBgc(status) {
            return status ? 'date-completed' : 'date-soon'
        },
        commentCount(activities) {
            let commentCount = 0
            activities.forEach((activities) => {
                if (activities.type === "comment") {
                    commentCount++
                }
            })
            if (commentCount > 0) {
                return `${commentCount}`
            }
        },
        todoList(checklist) {
            let count = 0
            checklist.tasks.forEach((task) => {
                if (task.isDone) {
                    count++
                }
            })
            return `${count} / ${checklist.tasks.length}`
        }
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        currBoard() {
            return this.board
        },


    },
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
        taskModal,
        Container,
        Draggable,
        groupActions,
        quickCardEditor,
        addTaskCmp
    },
}
</script>
