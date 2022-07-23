<template>
    <div style="margin: 0 4px 4px 0;" v-for="member in board.members">
        <img @click="onDisplayModal" class="member-avatar" :src="member.imgUrl"/>
    </div>
        <div class="members-btn">
        <div class="pop-over" :class="isShown">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Members</span>
                <a class="pop-over-header-close-btn">
                    <i class="fa-solid fa-x" style="cursor:pointer;" @click="onDisplayModal"></i>
                </a>
            </div>
            <div>
                <div class="pop-over-content">
                    <div class="pop-over-section">
                        <!-- <a class="board-header-btn">Edit profile info</a> -->
                        <a>Edit profile info</a>
                    </div>
                    <ul class="pop-over-member-list">
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
        board: Object
    },
    data() {
        return {
            displayModal: false,
        }
    },
    created() {},
    methods: {
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },
    },
    computed: {
         isShown() {
            return this.displayModal ? "is-shown" : "not-shown"
        },
    },
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
