<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between title-container">
                <textarea contenteditable="true" @blur="changeTitle" class="title-changer">{{ group.title }}</textarea>
                <a @click="groupModalActions = !groupModalActions" class="board-header-btn board-header-show-menu">
                    <i class="fa-solid fa-ellipsis" style="color: #172b4d; opacity: 0.4; font-size: 13px"></i>
                </a>
            </div>
            <group-actions v-if="groupModalActions" class="group-actions" @closeModal="onCloseLabelModal"
                @groupAction="onGroupAction" :boards="boards" :groupIdx="currGroupIdx" :board="currBoard" />

            <Container group-name="group" :get-child-payload="getChildPayload(group.id)"
                @drop="onDrop($event, group.id)" class="tasks" drag-class="card-ghost" drop-class="card-ghost-drop"
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
                                :class="label.class" style="margin-left: 3px">

                            </span>

                        </div>

                        <div class="flex space-between" style="margin-bottom:4px;">
                            <span>
                                {{ task.title }}
                            </span>
                            <i class="fa-solid fa-pen-to-square edit-card" @click.stop="openEditor(task)"
                                v-if="!isStatic"></i>
                        </div>
                        <div class="task-members-display">
                            <span class="description-icon" v-if="task.description">
                            </span>
                            <span>
                                <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                            </span>
                            <!--  -->
                            <span class="member-icon" v-for="member in task.members" v-if="task.members?.length"
                                :key="member._id">
                                <img class="member-avatar" :src="member.imgUrl" />
                            </span>
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
import { applyDrag } from '../../services/drag-and-drop.service.js'
import groupActions from "./group-actions.vue"
import quickCardEditor from "../task-cmps/quick-card-editor.vue"
import addTaskCmp from "../task-cmps/add-task-cmp.vue"
import { userService } from "../../services/user.service"
export default {
    name: "group-list",
    emits: ["closeModal", "updateGroups", "loadTask"],
    data() {
        return {
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
        this.currGroup = Object.assign({}, this.group)
        this.currGroupIdx = this.board.groups.findIndex((group) => group.id === this.currGroup.id)
    },
    methods: {
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
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const idx = currBoard.groups.findIndex(group => group.id === this.currGroup.id)
            this.$store.dispatch({ type: 'addGroup', currBoard, currGroup, idx })
        },
        onCloseModal() {
            this.showModal = false
        },
        onShowModal(task, group) {
            this.$emit("loadTask", task, group)
        },
        addNewTask(newTask) {
            // this.addTask = false
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const currBoard = JSON.parse(JSON.stringify(this.board))

            const taskToAdd = newTask

            this.$store.dispatch({ type: 'addTask', currBoard, currGroup, taskToAdd })
        },
        openEditor(task) {
            this.currTaskToEdit = task
            this.quickEdit = true
        },
        onDrop(dropResult, groupId) {
            const { removedIndex, addedIndex, payload } = dropResult
            if (removedIndex !== null || addedIndex !== null) {
                //we had to use setTimeout in order to let vueX update before the next iteration of onDrop function
                //since between groups onDrop runs twice

                setTimeout(() => {
                    const groups = JSON.parse(JSON.stringify(this.board.groups))
                    const group = groups.filter(currGroup => currGroup.id === groupId)[0]
                    const groupIdx = groups.indexOf(group)
                    const newGroup = JSON.parse(JSON.stringify(group))
                    newGroup.tasks = applyDrag(newGroup.tasks, dropResult)
                    groups.splice(groupIdx, 1, newGroup)
                    newGroup.draggedTo = newGroup.draggedFrom = false

                    if (addedIndex >= 0 && removedIndex === null) {
                        newGroup.draggedTo = true
                    } else if (removedIndex >= 0 && addedIndex === null) {
                        newGroup.draggedFrom = true
                    }
                    this.$emit('updateGroups', groups, payload, newGroup)
                }, 0)
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
            const currBoard = this.board
            const currGroup = { ...this.currGroup }
            currGroup.title = value
            this.$store.dispatch({ type: 'updateGroup', currBoard, currGroup })
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
