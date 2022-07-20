<template >
    <div>
        <section class="flex column list">
            <textarea contenteditable="true">{{ group.title }}</textarea>
            <section class="tasks flex column list-card-details"  v-for="task in group.tasks">
                <task-modal v-if="showModal" :task="task" :group="group" @closeModal="onCloseModal"/>
                <section class="list-card" @click="showModal = true">
                    <h1>{{ task.title }}</h1>
                    <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
                    <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" v-if="!isStatic"></i>
                </section>
            </section>
            <a v-if="!isStatic" href="#" class="add-card">+ add a card <i class="fa-solid fa-clone"></i></a>
        </section>
    </div>
</template>

<script>
import taskPreview from './task-preview.vue'
import taskModal from './task-modal.vue'
export default {
    name: 'group-list',
    emits: ["closeModal"],
    data() {
        return {
            showModal: false
        }
    },
    props: {
        group: Object,
        isStatic: Boolean,
    },
    created() { },
    methods: {
        onCloseModal(){
            this.showModal=false
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
        taskModal
    }
}

</script>