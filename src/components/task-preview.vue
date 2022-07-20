<template >
    <section class="list-card" @click="logCheck1">
        <h1>{{ task.title }}</h1>
        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" ></i>
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
    methods: {
        logCheck1(ev){
            console.log('1');
        },
        logCheck2(ev){
            console.log('2');
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}

</script>