<template>
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <h3>Menu</h3>
            <a @click="closeModal">x</a>
        </header>
        <div>
            
        </div>
        <section v-for="activity in currBoard.activities">
            {{activity.byMember.fullname}} {{ activity.txt }} in {{activity.createdAt}}
            
        </section>
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
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>