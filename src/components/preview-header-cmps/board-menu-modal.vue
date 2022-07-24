<template>
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <h3>Menu</h3>
            <a @click="closeModal" class="icon-close-side-modal"></a>
        </header>
        <div>

        </div>
        <section class="main-body" id="style-1">
            <section v-for="activity in currBoard.activities">
                <div>
                    <img :src=activity.byMember.imgUrl alt="" class="member-avatar">
                    <span>{{ activity.byMember.fullname }} {{ activity.txt }} in {{ activity.createdAt }}</span>
                </div>
            </section>
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