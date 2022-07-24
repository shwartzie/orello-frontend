<template>
    <div class="todo-modal pop-over">
        <section class="pop-over-header ">
            <header class="flex space-between align-center pop-over-header-title">
                <span class="checklist-title">Add checklist</span>
                <a class="fa-solid fa-xmark checklist-title-close" @click="onCloseModal"></a>
            </header>
        </section>
        <section class="add-todo-body">
            <form class="checklist-form">
                <label for="id-checklist" class="todo-label">Title</label>
                <div class="flex space-between">
                    <input v-model="title" placeholder="Checklist" class="title-checklist-input" type="text"/>
                </div>
                <a class="button-primary" @click="addChecklist()">add</a>
            </form>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title:''
        }
    },
    created() { },
    methods: {
        onCloseModal() {
            this.$emit('closeModal')
        },
        addChecklist(){
            this.$emit('updateChecklist',this.title)
            this.$emit('closeModal')
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
    }
}

</script>