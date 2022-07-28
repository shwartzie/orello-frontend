<template >
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <a @click="openBackgroundSelectModal" class="icon-side-modal back"></a>
            <h3>Change background</h3>
            <a @click="closeModal" class="icon-side-modal close"></a>

        </header>
        <section class="modal-body">
            <article class="background-select-container flex">
                <span v-for="color in colors" key="color" class="background-select-card"
                    :style="{ backgroundColor: color }">
                </span>
            </article>

        </section>
    </section>
</template>

<script>

export default {
    props: { currBoard: Object },
    emits: ['closeModal', 'setModalDisplay'],
    data() {
        return {
            colors: [
                '#0079bf',
                '#d29034',
                '#519839',
                '#b04632',
                '#89609e',
                '#cd5a91',
                '#4bbf6b',
                '#00aecc',
                '#838c91',
                '#AEECEF',
                '#A48A79',
                '#F8FCDA']
        }
    },
    created() { },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
        openBackgroundSelectModal() {
            this.$emit('setModalDisplay', 'backgroundSelectModal')
        }
    },
    computed: {

    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>
