<template>
    <div class="board-members" v-for="(member, idx) in board.members" :key="member._id" style="position: relative" :style="{ right: setPosOfMembers(idx) }">
        <img @click="onDisplayModal" class="member-avatar" :src="member.imgUrl"  />
    </div>
    <div class="members-btn">
        <div class="pop-over" :class="isShown">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Members</span>
                <a class="pop-over-header-close-btn">
                    <i class="fa-solid fa-x" style="cursor: pointer" @click="onDisplayModal"></i>
                </a>
            </div>
            <div>
                <div class="pop-over-content">
                    <div class="pop-over-section">
                        <!-- <a class="board-header-btn">Edit profile info</a> -->
                        <a>Edit profile info</a>
                    </div>
                    <ul class="pop-over-member-list">
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { socketService } from "../../services/socket.service.js"
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            displayModal: false,
        }
    },
    created() {
        socketService.on("update-board-members", this.updateBoardMembers)
        console.log('this.board.members:',this.board.members);
    },
    methods: {
        updateBoardMembers(board) {
            // this.$store.commit({ type: "", board })
        },
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },
        displayUserFirstChars(fullname) {
            const name = fullname.split(" ")
            return name[0][0].toUpperCase() + name[1][0].toUpperCase()
        },
        setPosOfMembers(idx) {
            return (idx * 10) + 'px'
        }
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
