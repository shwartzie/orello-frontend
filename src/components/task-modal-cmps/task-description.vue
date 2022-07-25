<template>

    <div class="textarea-description" @click="toggleTextArea">
        <div v-if="!description || isClicked">
            <textarea ref="textarea" @click="onEditTextArea" @blur="onBlurTextArea" :class="collapsedArea"
                placeholder="Add a more detailed description…" data-autosize="true" style="
                    overflow: hidden;
                    overflow-wrap: break-word;
                    resize: none;
                " v-model="description">
                </textarea>
            <div class="description-footer">
                <el-button type="primary" @click="onSaveDescription">
                    Save
                </el-button>
                <a>Cancel</a>
            </div>
        </div>
        <div v-else style="width:100%; cursor:pointer;" @click="onEditTextArea">
            <p>{{ description }}</p>
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
            description: this.task.description || '',
            isCollapsed: true,
            isClicked: false
        }
    },
    created() {
        console.log(this.description)
    },
    methods: {
        onSaveDescription() {
            this.onBlurTextArea()
            this.$emit("addDescription", this.description, 'description')
        },
        onEditTextArea() {
            this.isCollapsed = false
            this.isClicked = true
        },
        onBlurTextArea() {
            this.isCollapsed = true
            this.isClicked = false
        }
    },
    computed: {
        collapsedArea() {
            return this.isCollapsed
                ? "textarea-description-collapsed"
                : "textarea-description-not-collapsed"
        },
    },
    watcher: {
        'this.isClicked'() {
            this.$refs.input.focus()
        }
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
