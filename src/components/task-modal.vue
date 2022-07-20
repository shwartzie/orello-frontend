<template>
    <section class="task-modal">
        <section class="task-modal-info">
            <header>
                <div class="flex space-between">

                    <div class="flex">
                        <i class="fa-solid fa-hard-drive"></i>
                        {{ task.title }}
                    </div>
                    <a @click="closeModal">X</a>
                </div>
                <h6> in list {{group.title}}</h6>
            </header>
        <!-- modal body -->
        <section>
            <div class="main-body">
                <h5>Labels</h5>
                <div v-for="label in group.labels">
                    <a class="label">label</a>
                </div>
                <a >+</a>
            </div>
        </section>
        </section>
    </section>
</template>

<script >

export default {
    props: {
        task: Object,
        group: Object,
    },
    data() {
        return {}
    },
    created() {},
    methods: {
        closeModal(){
            console.log('closeModal');
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}
</script>
