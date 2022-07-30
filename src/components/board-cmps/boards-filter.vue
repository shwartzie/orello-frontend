<template>
    <div class="filter-section align-center">
        <span>Get going faster with a template from the Orello community or </span>
        <el-select v-model="value" class="m-2" placeholder="choose a category">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  @click="onSelect"/>
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
    emits:['setFilterBoards'],
    data() {
        return {
            boards: [],
            value: "",
            options: [
                {
                    value: "Popular Tempalate",
                    label: "Popular Tempalate",
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
    created() { },
    methods: {
        onSelect() {
            this.$emit('setFilterBoards', this.value)
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
