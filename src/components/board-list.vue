<template>
    <ul class="board-list">
        <li v-for="(url, idx) in images" :key="idx">
            <section class="board-card">
                <img :src="url" alt="" />
            </section>
        </li>
    </ul>
</template>

<script>
export default {
    name: "board-list",
    props: {
        label: {
            type: String
        }
    },
    data() {
        return {
            images: [
                "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
                "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=664&q=80",
                "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=664&q=80",
                "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=664&q=80",
            ],
        }
    },
    created() {},
    methods: {},
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>

<style></style>
