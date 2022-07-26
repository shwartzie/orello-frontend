<template>
    <div class="pop-over">
        <section class="flex column checklist-cmp">
            
        </section>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            displayModal: false
        }
    },
    created() { },
    methods: {
        onWorkspaceVisible() { },
    },
    computed: {
        popOver() {
            // return this.displayModal ? 'pop-over' : ''
        }
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
