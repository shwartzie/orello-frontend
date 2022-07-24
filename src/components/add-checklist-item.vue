<template>
    <section class="add-checklist-item-container">
        <div>
            <textarea v-model="newItem" class="add-checklist-item"></textarea>
        </div>
        <div class="checklist-options flex space-between">
            <div>
                <a class="button-primary" @click="addNewItem">Add</a>
                <a class="button-secondary" @click="onCancel">Cancel</a>
            </div>
            <div>
                <a class="button-secondary">Assign</a>
                <a class="button-secondary">Due Date</a>
                <a class="button-secondary">@</a>
                <a class="button-secondary">😃</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['addNewItem', 'onCancel'],
    props: {
        progress: Number
    },
    data() {
        return {
            newItem: "",
            isCancel: false
        }
    },
    created() {},
    methods: {
        addNewItem() {
            const newChecklistItem = {
                title: this.newItem,
                isDone: false,
            }
            this.$emit("addNewItem", newChecklistItem)
        },
        onCancel() {
            this.$emit('onCancel', false)
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
