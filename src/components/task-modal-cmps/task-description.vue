<template>

    <div class="textarea-description" @click="toggleTextArea">
        <div v-if="!task.description || isClicked">
            <textarea :class="collapsedArea" placeholder="Add a more detailed description…" data-autosize="true" style="
                    overflow: hidden;
                    overflow-wrap: break-word;
                    resize: none;
                " v-model="input"></textarea>
            <div class="description-footer">
                <el-button type="primary" @click="onSaveDescription">
                    Save
                </el-button>
                <a>Cancel</a>
            </div>
        </div>

        <div v-else style="width:100%; cursor:pointer;" @click="onEditTextArea">
            <p>{{ task.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["addDescription"],
    props: {
        task: Object,
    },
    data() {
        return {
            isCollapsed: true,
            input: "",
            isClicked: false
        }
    },
    created() { },
    methods: {
        toggleTextArea() {
            this.isCollapsed = !this.isCollapsed
        },
        onSaveDescription() {
            this.isCollapsed = true
            this.isClicked = false
            this.$emit("addDescription", this.input)
        },
        onEditTextArea() {
            this.isClicked = !this.isClicked
        }
    },
    computed: {
        collapsedArea() {
            return this.isCollapsed
                ? "textarea-description-collapsed"
                : "textarea-description-not-collapsed"
        },
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
