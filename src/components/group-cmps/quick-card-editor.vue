<template>
    <section class="task-modal" @click="closeModal" @keydown.esc="something_in_your_methods">
        <section class="task-modal-info" @click.stop="">
            {{currTask}}
        </section>
    </section>
</template>

<script>
export default {
    props: {
        currTask:Object,
    },
    data() {
        return {
            displayModal: false
        }
    },
    created() {},
    methods: {
        onWorkspaceVisible() {},
    },
    computed: {
        popOver() {
            // return this.displayModal ? 'pop-over' : ''
        }
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
