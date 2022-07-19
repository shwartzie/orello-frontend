<template>
    <main class="container">
        <section class="boards-page">
            <h2>Most popular templates</h2>
            <boards-filter />
            <div class="board-display" v-for="label in labels" :key="label">
                <p>
                    <i class="fa-solid fa-clock"></i> {{ label.name }}
                </p>
                <board-list />
            </div>
        </section>
    </main>
</template>

<script>
import boardsFilter from "../components/boards-filter.vue"
import boardList from "../components/board-list.vue"
export default {
    name: "boards",
    data() {
        return {
            labels: [
                {
                    name: "Popular Template",
                    icon: '<i class="fa-solid fa-chart-bar"></i>',
                },
                {
                    name: "Recently viewed",
                    icon: '<i class="fa-solid fa-clock"></i>',
                },
            ],
        }
    },
    created() {},
    methods: {},
    computed: {},
    mounted() {},
    unmounted() {},
    components: {
        boardsFilter,
        boardList,
    },
}
</script>

<style>
.container {
    margin: auto;
}
</style>
