<template>
    <div class="filter-section align-center">
        <span>Get going faster with a template from the Orello community or </span>
        <el-select v-model="value" class="m-2" placeholder="choose a category">
            <el-option v-for="board in options" :key="board.value" :label="board.label" :value="board.value"
                @click="onSelect(board)" />
        </el-select>

        <!-- <select>
            <option selected disabled hidden>choose a category</option>
            <option v-for="(opt, idx) in options">
                {{ options[idx] }}
            </option>
        </select> -->
    </div>
</template>

<script>
export default {
    name: "boards-filter",
    emits: ['setFilterBoards'],
    props: {
        boards: Array
    },
    data() {
        return {
            value: "",
            options: [
                {
                    value: 'ALL',
                    label: 'ALL'
                },
                {
                    value: "Popular Template",
                    label: "Popular Template",
                },
                {
                    value: "Starred Boards",
                    label: "Starred Boards",
                },
                {
                    value: "Recently Viewed",
                    label: "Recently Viewed",
                },
                {
                    value: "Workspace",
                    label: "Workspace",
                },
            ],
        }
    },
    created() {
    },
    methods: {
        onSelect(board) {
            this.$emit('setFilterBoards', board)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
