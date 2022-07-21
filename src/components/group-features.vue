<template>
    <div>
        <form @submit.prevent="addGroup">
            <a
                @click="setDisplay"
                v-if="displayForm"
                class="board-header-btn list-add-btn"
            >
                <span>
                    <span> + </span>
                    Add another list
                </span>
            </a>
            <div v-else class="list-add-btn list-form-dropdown">
                <el-input v-model="group.title" placeholder="Enter list title.." />
                <div class="list-form-btns">
                    <el-button type="primary" @click="addGroup"
                        >Add list</el-button
                    >
                    <button class="list-form-btn" @click="setDisplay">
                        <span>
                            <i class="fa-solid fa-x"></i>
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            displayForm: false,
            group: {
                title: "",
                archivedAt: null,
                createdAt: Date.now(0),
                tasks: [],
                style: {},
            },
        }
    },
    created() {},
    methods: {
        setDisplay() {
            this.displayForm = !this.displayForm
        },
        addGroup() {
            this.$emit("addGroup", this.group)
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
