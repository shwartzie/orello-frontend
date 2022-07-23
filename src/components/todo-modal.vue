<template>
    <div class="todo-modal pop-over">
        <section class="pop-over-header">
            <header class="flex space-between align-center pop-over-header-title">
                <span class="checklist-title">Add checklist</span>
                <a class="fa-solid fa-xmark checklist-title-close" @click="onCloseModal"></a>
            </header>
        </section>
        <section class="add-todo-body">
            
        </section>
    </div>
</template>

<script>
import customCardCmp from './costume-card-cmp.vue'
export default {
    data() {
        return {}
    },
    created() { },
    methods: {
        onCloseModal() {
            this.$emit('closeModal')
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        customCardCmp
    }
}

</script>