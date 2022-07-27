<template>
        <a
            v-if="!member"
            @click="onJoin"
            class="board-header-btn button-link side-bar-button"
            @mouseenter="visible = true"
            @mouseleave="visible = false"
        >
            <span class="btn-icon member"> </span>
                join
        </a>
</template>

<script>
import { ref } from "vue"
export default {
    emits: ["memberJoined"],
    props: {
        loggedinUser: Object,
        board: Object,
        task: Object,
        visible: ref(false),
    },
    data() {
        return {
            member: null,
        }
    },
    created() {
        this.member = this.task.members.find(
            (taskMember) => taskMember._id === this.loggedinUser._id
        )
    },
    methods: {
        onJoin() {
            if (!this.member) {
                this.$emit("memberJoined", { ...this.loggedinUser })
            }
            this.member = true
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
