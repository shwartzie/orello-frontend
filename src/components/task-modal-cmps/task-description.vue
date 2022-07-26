<template>
    <div class="flex column">
        <div class="flex">
            <span class="title-icon description"></span>
            <span class="task-modal-title-container title-sub">Description</span>
            <el-button v-if="description && !isClicked" @click="onEditTextArea" class="task-modal-content-button">Edit
            </el-button>
        </div>
        <div class=" flex column full-width">
            <div ref="container" class="textarea-description" @click="toggleTextArea">
                <div v-if="!description || isClicked">
                    <textarea @click="onEditTextArea" @blur="onBlurTextArea" :class="collapsedArea"
                        placeholder="Add a more detailed description…" data-autosize="true" style="
                    overflow: hidden;
                    overflow-wrap: break-word;
                    resize: none;
                " v-model="description">
                </textarea>
                    <div v-if="isClicked" class="description-footer">
                        <el-button class="task-modal-content-button-primary" @click="onSaveDescription">
                            Save
                        </el-button>
                        <el-button class="task-modal-content-button">Cancel</el-button>
                    </div>
                </div>
                <div v-else style=" width:100%; cursor:pointer;" @click="onEditTextArea">
                    <p>{{ description }}</p>
                </div>

            </div>
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
    },
    methods: {
        onSaveDescription() {
            this.onBlurTextArea()
        },
        onEditTextArea() {
            this.isCollapsed = false
            this.isClicked = true
            setTimeout(() => {
                const elContainer = this.$refs.container
                const textarea = elContainer.firstChild.firstChild
                textarea.focus()
                textarea.select()
            }, 0)
        },
        onBlurTextArea() {
            this.isCollapsed = true
            this.isClicked = false
            this.$emit("addDescription", this.description, 'description')
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
