<template >
    <span @click.self="linkTo(attachment.url)" v-for="attachment in attachments" :key="attachment.url"
        class="task-modal-attachments">
        <span class="attachment-img" v-if="attachment.imgName">
            <img :src="attachment.url" alt="img">
        </span>
        <span class="attachment-thumbnail" v-else>LINK</span>
        <div class="task-modal-attachment flex">
            <div class="task-modal-text flex">
                <p v-if="attachment.name">{{ attachment.name }} </p>
                <p v-else-if="attachment.imgName">{{ attachment.imgName }}</p>
                <p v-else>{{ attachment.url }} </p>
                <img class="arrow" src="../../assets/svg/arrow-up-right.svg" alt="">
            </div>
            <span> {{ getTimePassed(attachment.createdAt) }}</span>
            <span v-if="attachment.imgName" @click.stop="onSetCover(attachment.url)" class="make-cover-btn">Make
                Cover</span>
        </div>
    </span>
</template>
<script>
export default {
    emits: ['setCover'],

    props: {
        attachments: Array
    },
    methods: {
        getTimePassed(date) {
            const diff = Date.now() - date
            const seconds = Math.round(diff / 1000)
            const minutes = Math.round(seconds / 60)
            const hours = Math.round(minutes / 60)
            if (hours >= 1) {
                return `Added ${hours} hours ago`
            }
            else if (minutes > 1) {
                return `Added ${minutes} minutes ago`
            }
            else if (minutes === 1) {
                return `Added a minute ago`
            }
            else if (minutes <= 0) {
                return `Added a few seconds ago`
            }
            else if (seconds < 10) {
                return `Added just now`
            }
        },
        onSetCover(url) {
            this.$emit('setCover', { url }, 'cover')
        },
        linkTo(url) {
            console.log(url)
        }
    },
}
</script>
