<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between title-container">
                <textarea contenteditable="true" class="title-changer">{{ group.title }}</textarea>
                <group-actions />
            </div>
            <Container :get-child-payload="getChildPayload" @drop="onDrop($event)" class="tasks">
                <Draggable class=" flex column list-card-details" v-for="task in group.tasks" :key="task.id">

                    <task-modal v-if="showModal" :task="task" :group="group" @closeModal="onCloseModal" />
                    <section class="list-card" @click="onShowModal(task, group)">
                        <span>
                            {{ task.title }}
                        </span>

                        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="openEditer(task)"
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
/*
                        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                        <!-- @click.stop="openEditer(task)" -->
                        <i class="fa-solid fa-pen-to-square edit-card"  v-if="!isStatic"></i>
                    </section>
                </div>
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
        </section>
        <quick-card-editor v-if="quickedit" :currTask="currTaskToEdit"/>

*/
import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import { applyDrag } from '../services/drag-and-drop.service.js'
import groupActions from "./group-cmps/group-actions.vue"
import quickCardEditor from "./group-cmps/quick-card-editor.vue"
export default {
    name: "group-list",
    emits: ["closeModal", "updateGroup"],
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
        this.currGroup = JSON.parse(JSON.stringify(this.group))
    },
    methods: {
        onCloseModal() {
            this.showModal = false
        },
        onShowModal(task, group) {
            this.$emit("loadTask", task, group)
        },
        onDrop(dropResult) {
            const tasks = JSON.parse(JSON.stringify(this.currGroup.tasks))
            const group = JSON.parse(JSON.stringify(this.group))
            group.tasks = applyDrag(tasks, dropResult)
            this.$emit('updateGroup', group)

        },
        addNewTask() {
            this.addTask = false
            const currGroup = this.group
            const currBoard = this.board
            const taskToAdd = this.newTask
            console.log(this.board);
            this.$store.dispatch({ type: 'addTask', currBoard, currGroup, taskToAdd })
        },
        openEditer(task) {
            this.currTaskToEdit = task
            this.quickEdit = true
        },
        getChildPayload(index) {
            console.log('index', index)
            return this.group.tasks[index]
        },
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
