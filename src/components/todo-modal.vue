<template>
    <div class="todo-modal">
        <custom-card-cmp  @closeModal="onCloseModal" />
    </div>
</template>

<script>
import customCardCmp from './costume-card-cmp.vue'
export default {
    emits: ["closeModal"],
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