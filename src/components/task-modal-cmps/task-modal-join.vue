<template>

        <a 
            v-if="!member"
            @click="onJoin"
            class="board-header-btn button-link side-bar-button"
        >
            <span class="btn-icon member"> </span>
                join
        </a>
</template>

<script>
import { socketService } from '../../services/socket.service.js'
import { utilService } from "../../services/util.service"
export default {
    emits: ["memberJoined"],
    props: {
        loggedinUser: Object,
        board: Object,
        task: Object,
        group: Object
    },
    data() {
        return {
            member: null,
        }
    },
    created() {
        this.member = this.task.members?.find(
            (taskMember) => taskMember._id === this.loggedinUser._id
        )
        socketService.on("update-task-on-join", this.updateOnJoin)
    },
    methods: {
        onJoin() {
            if (!this.member) {
                this.$emit("memberJoined", { ...this.loggedinUser })
            }
            this.member = true
        },
        updateOnJoin(board) {
            this.$store.commit({ type: "updateTask", currBoard:board })
            this.member = true
        }

    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
