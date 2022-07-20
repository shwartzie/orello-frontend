<template >
    <section class="list-card" @click="openTask(task)">
        <h1>{{ task.title }}</h1>
        <i class="fa-solid fa-paperclip" v-if="task.attachments"></i>
        <i class="fa-solid fa-pen-to-square edit-card" @click.stop="logCheck2" v-if="!isStatic"></i>
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
        isStatic:Boolean,
    },
    created() { },
    methods: {
        openTask(task){
            console.log(task);
            // this.$emit("openModal",{...task})
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