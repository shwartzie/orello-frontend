<template>

    <div class="members-btn">
        <a @click="onDisplayModal" class="board-header-btn button-link side-bar-button">
            <span>
                <i class="fa-solid fa-paperclip"></i>
            </span>
            Attachment</a>
        <div class="pop-over" :class="isShown">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Attach From...</span>
                <a class="pop-over-header-close-btn">
                    <i class="fa-solid fa-x" @click="onDisplayModal"></i>
                </a>
            </div>
            <div>
                <div class="pop-over-content">
                    <div class="pop-over-title">
                        <ul class="attachment-options-list">
                            <li>
                                Computer
                            </li>
                        </ul>
                    </div>
                    <section class="img-upload">
                        <form v-if="!isLoading">
                            <el-input v-model="attachment.url" />
                            <el-button @click="onAddAttachment">Attach</el-button>
                        </form>
                        <img v-else src="../assets/loader.gif" alt="">
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        task: Object
    },
    data() {
        return {
            displayModal: false,
            attachment: {
                url: null,
                linkName: null
            },
            isLoading: false
        }
    },
    created() { },
    methods: {
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },

        onAddAttachment() {
            const task = Object.assign({}, this.task)
            const { attachment } = this

            attachment.url = 'http://' + attachment.url

            if (!task.attachments) task.attachments = []
            task.attachments.push(attachment)
            this.$emit('addAttachment', task)

            this.resetInput()
        },
        resetInput() {
            this.attachment = {
                url: null,
                linkName: null
            }
        },
    },
    computed: {
        isShown() {
            return this.displayModal ? "is-shown" : "not-shown"
        },
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
