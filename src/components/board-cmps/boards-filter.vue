<template>
    <div class="filter-section align-center">
        <span>Get going faster with a template from the Trello community or </span>
        <el-select v-model="value" class="m-2" placeholder="choose a category">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
    data() {
        return {
            boards: [],
            value: "",
            options: [
                {
                    value: "Popular",
                    label: "Popular",
                },
                {
                    value: "Small Business",
                    label: "Small Business",
                },
                {
                    value: "Design",
                    label: "Design",
                },
                {
                    value: "Education",
                    label: "Education",
                },
                {
                    value: "Marketing",
                    label: "Marketing",
                },
            ],
        }
    },
    created() { },
    methods: {},
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
