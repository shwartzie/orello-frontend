<template>
    <div class="flex space-between">
        <div class="flex task-modal-main-title-container title-main">
            <span class="title-icon header"></span>
            <div class="flex column task-modal-title title-modal">
                {{ task.title }}
                <p>
                    in list
                    <a>
                        {{ group.title }}
                    </a>
                </p>
            </div>
        </div>
        <a class="task-close-modal" @click="closeModal">
            <span class="title-icon close"></span
        ></a>
    </div>
</template>

<script>
export default {
    props: {
        task: Object,
        group: Object,
        board: Object
    },
    data() {
        return {}
    },
    created() {},
    methods: {
         closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
