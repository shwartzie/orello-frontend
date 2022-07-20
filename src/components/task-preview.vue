<template >
    <task-modal v-if="showModal" />
    <section class="list-card" @click="showModal = true">
        <h1>{{ task.title }}</h1>
        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" v-if="!isStatic"></i>
    </section>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import taskModal from './task-modal.vue'
export default {

    name: 'task-preview',
    data() {
        return {
            showModal: false
        }
    },
    props: {
        task: Object,
        isStatic: Boolean,
    },
    created() { },
    methods: {
        openTask(task) {
            this.$emit("openTask", { ...task })
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskModal,
    }
}

</script>