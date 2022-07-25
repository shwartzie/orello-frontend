<template>

    <div class="members-btn  attach-form">
        <a @click="onDisplayModal" class="board-header-btn button-link side-bar-button">
            <span class="btn-icon attachment"></span>
            Attachment</a>
        <div class="pop-over" v-if="displayModal">
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
                    <span class="pop-over-header-title"></span>
                    <section class="img-upload">
                        <form v-if="!isLoading">
                            <label>Attach a link</label>
                            <el-input placeholder="Paste any link here..." v-model="attachment.url" />
                            <el-button @click="onAddAttachment">Attach</el-button>
                        </form>
                        <img v-else src="../assets/loader.gif" alt="">
                        <span class="pop-over-header-title"></span>
                        <span>Tip: You can drag and drop files and links onto cards to upload them.</span>
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
                linkName: null,
                createdAt: Date.now()
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
            const attachment = Object.assign({}, this.attachment)
            if (!attachment.url) return
            if (this.isImage(attachment.url)) attachment.imgName = this.getNameFromUrl(attachment.url)
            else if (!attachment.url.startsWith('http://') && !attachment.url.startsWith('https://')) {
                attachment.url = 'http://' + attachment.url
            }
            const task = JSON.parse(JSON.stringify(this.task))

            if (!task.attachments) task.attachments = []
            task.attachments.push(attachment)

            this.$emit('addAttachment', task)
            this.resetInput()
            this.displayModal = false
        },
        resetInput() {
            this.attachment = {
                url: null,
                linkName: null,
                createdAt: Date.now()
            }
        },
        isImage(url) {
            return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
        },
        getNameFromUrl(url) {
            return url.replace(/.+\/\/|www.|\..+/g, '')
        }
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
