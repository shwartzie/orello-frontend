<template >
    <div>
        <section class="flex column list">
            <textarea contenteditable="true">{{ group.title }}</textarea>
            <section class="tasks flex column list-card-details">
                <task-preview v-for="task in group.tasks" :task="task" />
            </section>
            <a href="#" class="add-card">+ add a card <i class="fa-solid fa-clone"></i></a>
        </section>
    </div>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
    name: 'group-list',
    data() {
        return {
        }
    },
    props: {
        group: Object,
    },
    created() { },
    methods: {},
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        taskPreview,
    }
}

</script>