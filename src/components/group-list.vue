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
                        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" v-if="!isStatic"></i>
                    </section>

                </Draggable>
            </Container>
            <a v-if="!isStatic" href="#" class="add-card">+ add a card <i class="fa-solid fa-clone"></i></a>
        </section>

    </div>
</template>

<script>
import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from '../services/drag-and-drop.service.js'
import groupActions from "./group-cmps/group-actions.vue"
export default {
    name: "group-list",
    emits: ["closeModal", "updateGroup"],
    data() {
        return {
            showModal: false,
            currGroup: {},
            groups: [],
            addTask: false,
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
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
        getChildPayload(index) {
            console.log('index', index)
            return this.group.tasks[index]
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
        groupActions
    },
}
</script>
