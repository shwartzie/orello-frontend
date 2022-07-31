<template>
    <div class="flex space-between">
        <div class="flex task-modal-main-title-container title-main">
            <span class="title-icon header"></span>
            <div class="flex column task-modal-title title-modal">
                <span @blur="changeTitle" contenteditable>{{ task.title }}</span>
                <p>
                    in list
                    <a>
                        {{ group.title }}
                    </a>
                </p>
            </div>
        </div>
        
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
    created() {
    },
    methods: {
        
        changeTitle({ target: { innerText: title } }) {
            this.$emit('changeTitle', title.trim(), 'title')
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
