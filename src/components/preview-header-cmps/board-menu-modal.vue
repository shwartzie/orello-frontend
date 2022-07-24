<template>
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <h3>hi</h3>
            <a @click="closeModal">x</a>
        </header>
    </section>
</template>

<script>

export default {
    emits: ["closeModal"],
    data() {
        return {
        }
    },
    created() { },
    methods: {
        closeModal() {
            this.$emit("closeModal", false)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}

</script>