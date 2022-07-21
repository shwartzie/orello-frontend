<template>
    <div>
        <section class="flex column list">
            <div class="flex space-between">
                <textarea contenteditable="true">{{ group.title }}</textarea>
                <a class="board-header-btn board-header-show-menu"><i class="fa-solid fa-ellipsis"
                        style="color: #172b4d; opacity: 0.4; font-size: 13px;"></i></a>
            </div>
            <section class="tasks">
                <section class=" flex column list-card-details" v-for="task in group.tasks">
                    <task-modal v-if="showModal" :task="task" :group="group" @closeModal="onCloseModal" />
                    <section class="list-card" @click="showModal = true">
                        <span>
                            {{ task.title }}
                        </span>

                        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" v-if="!isStatic"></i>
                    </section>
                </section>
                <a v-if="!isStatic" href="#" class="add-card">+ add a card <i class="fa-solid fa-clone"></i></a>
            </section>
        </section>
    </div>
</template>

<script>
import taskPreview from "./task-preview.vue"
import taskModal from "./task-modal.vue"
export default {
    name: "group-list",
    emits: ["closeModal"],
    data() {
        return {
            showModal: false,
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
    },
    created() { },
    methods: {
        onCloseModal() {
            this.showModal = false
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
        taskModal,
    },
}
</script>
