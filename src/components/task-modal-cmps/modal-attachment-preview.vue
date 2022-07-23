<template >
    <a v-for="attachment in attachments" :key="attachment.url" :href="attachment.url" class="task-model-attachments">
        <img :src="attachment.url" class="attachment-thumbnail" alt="img" v-if="attachment.imgName">
        <span class="attachment-thumbnail" v-else>LINK</span>
        <span class="task-model-attachment">
            <span v-if="attachment.name">{{ attachment.name }}</span>
            <span v-else-if="attachment.imgName">{{ attachment.imgName }}</span>
            <span v-else>{{ attachment.url }} </span>
            <span> {{ getTimePassed(attachment.createdAt) }}</span>
        </span>
    </a>
</template>
<script>
export default {
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
        }
    }
}
</script>
