<template>
    <section class="flex justify-center align-center template-header">
        <h4> <span class="fa-solid fa-earth-americas"></span>This is a public template for anyone on the internet to
            copy.</h4>
        <a class=" button-primary" @click="createBoard">
            Create board from template
        </a>
        <!-- <a href="" class="button-secondary">
            Share template
        </a> -->
    </section>
</template>

<script>
export default {
    emits: ["createFromTemplate"],
    data() {
        return {}
    },
    created() { },
    methods: {
        createBoard() {
            this.$emit("createFromTemplate")
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}


</script>