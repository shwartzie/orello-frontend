<template>
    <div>
        <Container orientation="vertical" @drop="onDrop">
            <section class="flex column list">
                <div class="flex space-between">
                    <textarea class="title-changer" contenteditable="true">{{ group.title }}</textarea>
                    <a class="board-header-btn board-header-show-menu"><i class="fa-solid fa-ellipsis"
                            style="color: #172b4d; opacity: 0.4; font-size: 13px;"></i></a>
                </div>
                <section class="tasks">
                    <Draggable class=" flex column list-card-details" v-for="task in group.tasks">
                        <task-modal v-if="showModal" :task="task" :group="group" @closeModal="onCloseModal" />
                        <section class="list-card" @click="onShowModal(task, group)">
                            <span>
                                {{ task.title }}
                            </span>

                            <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                            <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" v-if="!isStatic"></i>
                        </section>
                    </Draggable>
                    <a v-if="!isStatic && !addTask" @click="addTask=true" class="add-card">+ add a card <i class="fa-solid fa-clone"></i></a>
                    <div v-if="addTask" class="add-task-container">
                        <textarea  placeholder="Enter a title for this card…" class="add-task"></textarea>
                    </div>
                </section>
            </section>
        </Container>
    </div>
</template>

<script>
import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
    name: "group-list",
    emits: ["closeModal"],
    data() {
        return {
            showModal: false,
            groups: [],
            addTask:false,
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
    },
    created() {
        this.groups.push(this.group)
        console.log('this.groups', this.groups)


    },
    methods: {
        onCloseModal() {
            this.showModal = false
        },
        onShowModal(task, group) {
            this.$emit("loadTask", task, group)
        },
        onDrop(dropResult) {
            this.items = this.applyDrag(this.items, dropResult);
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;

            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
        taskModal,
        Draggable,
        Container,
        Draggable

    },
}
</script>
