<template>
    <section class="todo-list">
        {{todo.title}}
    </section>
</template>

<script>
export default {
    props: {
        todo: Object,
    },
    data() {
        return {}
    },
    created() { },
    methods: {
        
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}
</script>