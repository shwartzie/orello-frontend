<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between title-container">
                <textarea contenteditable="true" class="title-changer">{{ group.title }}</textarea>
                <group-actions />
            </div>
                
            <section class="tasks">
                <div class="flex column list-card-details" v-for="task in group.tasks">
                    <section class="list-card" @click="onShowModal(task, group)">
                        <span>
                            {{ task.title }}
                        </span>
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
    </div>
    
</template>

<script>
import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import groupActions from "./group-cmps/group-actions.vue"
import quickCardEditor from "./group-cmps/quick-card-editor.vue"
export default {
    name: "group-list",
    emits: ["closeModal"],
    data() {
        return {
            showModal: false,
            groups: [],
            addTask: false,
            newTask: "",
            quickedit:false,
            currTaskToEdit:{},
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
        board:Object
    },
    created() {
        this.groups.push(this.group)
        // console.log('this.groups', this.groups)
    },
    methods: {
        onCloseModal() {
            this.showModal = false
        },
        onShowModal(task, group) {
            this.$emit("loadTask", task, group)
        },
        onDrop(dropResult) {
            this.items = this.applyDrag(this.items, dropResult)
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult

            if (removedIndex === null && addedIndex === null) return arr
            const result = [...arr]
            let itemToAdd = payload

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0]
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd)
            }
            return result
        },
        addNewTask() {
            this.addTask=false
            const currGroup=this.group
            const currBoard=this.board
            const taskToAdd=this.newTask
            this.$store.dispatch({ type: 'addTask', currBoard, currGroup,taskToAdd })
            // this.group.push({ title: this.newTask })
        },
        openEditer(task){
            this.currTaskToEdit=task
            this.quickedit=true
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
        taskModal,
        groupActions,
        quickCardEditor
    },
}
</script>
