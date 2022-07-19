<template >
    <section class="list-card">
        <h1>{{task.title}}</h1>
    </section>
</template>

<script>

export default {
    name: 'task-preview',
    data() {
        return {
        }
    },
    props: {
        task: Object,
    },
    created() { },
    methods: {},
    computed: {},
    mounted() {},
    unmounted() {},
    components: {}
}

</script>