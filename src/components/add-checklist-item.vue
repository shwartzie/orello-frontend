<template >
            <el-progress :percentage=progress />

    <section class="add-checklist-item-container">
        <div>
            <textarea v-model="newItem" class="add-checklist-item"></textarea>
        </div>
        <div class="checklist-options flex space-between">
            <div>
                <a class="button-primary" @click="addNewItem">add</a>
                <a class="button-secondary">cancel</a>
            </div>
            <div>
                <a class="button-secondary">assign</a>
                <a class="button-secondary">due date</a>
                <a class="button-secondary">@</a>
                <a class="button-secondary">😃</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            newItem:'',
        }
    },
    created() { },
    methods: {
        addNewItem(){
            const newChecklistItem={
                title:this.newItem,
                isDone:false,
            }
            this.$emit("addNewItem",newChecklistItem)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}
</script>