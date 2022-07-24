<template>
    <task-modal v-if="showModal" :task="task" />
    <section class="list-card" @click="showModal = true">
        <h1>{{ task.title }}</h1>
        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
        <i
            class="fa-solid fa-pen-to-square edit-card"
            @click.stop="logCheck2"
            v-if="!isStatic"
        ></i>
    </section>
</template>

<script>
import taskModal from "./task-modal.vue"
export default {
    name: "task-preview",
    data() {
        return {
            showModal: false,
        }
    },
    props: {
        task: Object,
        isStatic: Boolean,
        formattedDate: null
    },
    created() {},
    methods: {
        formatDate() {
            let mm = today.getMonth() + 1
            let dd = today.getDate()

            if (dd < 10) dd = "0" + dd
            if (mm < 10) mm = "0" + mm

            this.formattedToday = dd + "/" + mm + "/" + yyyy
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {
        taskModal,
    },
}
</script>
