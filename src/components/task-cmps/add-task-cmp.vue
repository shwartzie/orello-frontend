<template>
    <div class="textarea-container">
        <textarea v-model="newTask.title" placeholder="Enter a title for this card…"></textarea>
    </div>
    <div class="flex space-between add-task-bottom align-center">
        <div class="flex space-between align-center form-actions-add-task">
            <a class="button-primary" @click="addNewTask"> Add card</a>
            <a @click="closeModal" class="cancel-task"><i class="fa-solid fa-x"></i></a>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
    </div>
</template>

<script>

export default {
    emits:["newTask","closeModal"],
    data() {
        return {
            newTask: {
                title: '',
            },
        }
    },
    created() { },
    methods: {
        addNewTask(){
            this.$emit("newTask",this.newTask)
            this.newTask.title=''
        },
        closeModal(){
            this.$emit("closeModal")
        }

    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}

</script>