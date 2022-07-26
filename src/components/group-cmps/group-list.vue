<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between title-container">
                <textarea contenteditable="true" class="title-changer">{{ group.title }}</textarea>
                <group-actions />
            </div>
            <Container group-name="group" :get-child-payload="getChildPayload(group.id)"
                @drop="onDrop($event, group.id)" class="tasks" drag-class="card-ghost" drop-class="card-ghost-drop"
                :drop-placeholder="dropPlaceholderOptions">
                <Draggable class=" flex column list-card-details" v-for="(task, idx) in group.tasks" :key="task.id">

                    <div v-if="task.cover" :class="task.cover.class" style="height:30px; border-radius: 3px 3px 0 0;">
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
                            <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                            <i class="fa-solid fa-pen-to-square edit-card" @click.stop="openEditor(task)"
                                v-if="!isStatic"></i>
                        </div>
                        <div class="task-members-display">
                            <span class="description-icon" v-if="task.description">

                            </span>
                            <span>
                                <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                            </span>
                            <span class="member-icon" v-if="task.members?.length > 0">
                                <img class="member-avatar" :src="task.members[idx].imgUrl" />
                            </span>
                        </div>
                    </section>

                </Draggable>
            </Container>
            <a v-if="!isStatic && !addTask" @click="addTask = true" class="add-card">
                <div class="open-card-composer">
                    <span class="plus"></span>
                    <span>Add a card </span>
                </div>
                <span class="duplicate-group">
                </span>
            </a>
            <form v-if="addTask">
                <div class="textarea-container">
                    <textarea v-model="newTask.title" placeholder="Enter a title for this card…"></textarea>
                </div>
                <div class="flex space-between add-task-bottom align-center">
                    <div class="flex space-between align-center form-actions-add-task">
                        <a class="button-primary" @click="addNewTask"> Add card</a>
                        <a @click="addTask = false" class="cancel-task"><i class="fa-solid fa-x"></i></a>
                    </div>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </form>
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
export default {
    name: "group-list",
    emits: ["closeModal", "updateGroups", "loadTask"],
    data() {
        return {
            showModal: false,
            currGroup: {},
            groups: [],
            addTask: false,
            newTask: {
                title: '',
            },
            quickEdit: false,
            currTaskToEdit: {},
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true
            }
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
        board: Object
    },
    created() {
        this.currGroup = Object.assign({}, this.group)
    },
    methods: {
        onCloseModal() {
            this.showModal = false
        },
        onShowModal(task, group) {
            this.$emit("loadTask", task, group)
        },
        addNewTask() {
            this.addTask = false
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const currBoard = JSON.parse(JSON.stringify(this.board))
            this.newTask.createdAt = Date.now()
            const taskToAdd = this.newTask

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
                    const newGroup = Object.assign({}, group)
                    newGroup.tasks = applyDrag(newGroup.tasks, dropResult)
                    groups.splice(groupIdx, 1, newGroup)
                    newGroup.draggedTo = newGroup.draggedFrom = false
                    if (addedIndex >= 0 && removedIndex === null) {
                        console.log('removed')
                        newGroup.draggedTo = true
                    } else if (removedIndex >= 0 && addedIndex === null) {
                        console.log('added')
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
        }

    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
        taskModal,
        Container,
        Draggable,
        groupActions,
        quickCardEditor
    },
}
</script>
