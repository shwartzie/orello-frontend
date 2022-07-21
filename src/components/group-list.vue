<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between list">
                <textarea contenteditable="true" class="title-changer">{{ group.title }}</textarea>
                <group-actions/>
            </div>
            <section class="tasks">
                <div
                    class="flex column list-card-details"
                    v-for="task in group.tasks"
                >
                    <task-modal
                        v-if="showModal"
                        :task="task"
                        :group="group"
                        @closeModal="onCloseModal"
                    />
                    <section
                        class="list-card"
                        @click="onShowModal(task, group)"
                    >
                        <span>
                            {{ task.title }}
                        </span>

                        <i
                            class="fa-solid fa-paperclip"
                            v-if="task.attachments"
                        ></i>
                        <i
                            class="fa-solid fa-pen-to-square edit-card"
                            @click.stop="logCheck2"
                            v-if="!isStatic"
                        ></i>
                    </section>
                </div>
                <a v-if="!isStatic" href="#" class="add-card"
                    >+ add a card <i class="fa-solid fa-clone"></i
                ></a>
            </section>
        </section>
    </div>
</template>

<script>
import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import groupActions from "./group-cmps/group-actions.vue"
export default {
    name: "group-list",
    emits: ["closeModal"],
    data() {
        return {
            showModal: false,
            groups: [],
            addTask: false,
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
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
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {
    taskPreview,
    taskModal,
    groupActions
},
}
</script>
