<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between title-container">
                <textarea contenteditable="true" class="title-changer">{{ group.title }}</textarea>
                <group-actions />
            </div>

            <Container :should-accept-drop="shouldAcceptDrop" :get-child-payload="getChildPayload(group.id)"
                @drop="onDrop($event, group.id)" class="tasks">
                <Draggable class=" flex column list-card-details" v-for="task in group.tasks" :key="task.id">

                    <task-modal v-if="showModal" :task="task" :group="group" @closeModal="onCloseModal" />
                    <section class="list-card" @click="onShowModal(task, group)">
                        <span>
                            {{ task.title }}
                        </span>

                        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="openEditor(task)"
                            v-if="!isStatic"></i>
                    </section>

                </Draggable>
            </Container>
            <a v-if="!isStatic && !addTask" @click="addTask = true" class="add-card">+ add a card <i
                    class="fa-solid fa-clone"></i></a>
            <form v-if="addTask">
                <div class="textarea-container">
                    <textarea v-model="newTask" placeholder="Enter a title for this card…"></textarea>
                </div>
                <div class="flex space-between add-task-bottom align-center">
                    <div class="flex space-between align-center form-actions-add-task">
                        <a class="button-primary" @click="addNewTask"> add card</a>
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

import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import { applyDrag } from '../services/drag-and-drop.service.js'
import groupActions from "./group-cmps/group-actions.vue"
import quickCardEditor from "./group-cmps/quick-card-editor.vue"
export default {
    name: "group-list",
    emits: ["closeModal", "updateGroups"],
    data() {
        return {
            showModal: false,
            currGroup: {},
            groups: [],
            addTask: false,
            newTask: "",
            quickEdit: false,
            currTaskToEdit: {},
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
            const currGroup = this.group
            const currBoard = this.board
            const taskToAdd = this.newTask
            this.$store.dispatch({ type: 'addTask', currBoard, currGroup, taskToAdd })
        },
        openEditor(task) {
            this.currTaskToEdit = task
            this.quickEdit = true
        },
        onDrop(dropResult, groupId) {
            // get isSource and remove only if true and add only if false?
            console.log(groupId)
            const { removedIndex, addedIndex } = dropResult
            if (removedIndex !== null || addedIndex !== null) {
                const groups = JSON.parse(JSON.stringify(this.board.groups))
                const group = groups.filter(currGroup => currGroup.id === groupId)[0]
                const groupIdx = groups.indexOf(group)
                const newGroup = Object.assign({}, group)
                newGroup.tasks = applyDrag(newGroup.tasks, dropResult)
                groups.splice(groupIdx, 1, newGroup)
                this.$emit('updateGroups', groups)
            }

        },
        getChildPayload(groupId) {
            return index => {
                return this.board.groups.filter(currGroup => currGroup.id === groupId)[0].tasks[index]
            }
        },
        shouldAcceptDrop() {
            return true
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
