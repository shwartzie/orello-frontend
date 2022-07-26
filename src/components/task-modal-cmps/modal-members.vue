<template>
    <div class="members-btn">
        <a @click="onDisplayModal" class="board-header-btn button-link side-bar-button">
            <span class="btn-icon member">
            </span>
            members
        </a>
        <div class="pop-over" :class="isShown">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Members</span>
                <a class="pop-over-header-close-btn">
                    <i class="fa-solid fa-x" style="cursor:pointer;" @click="onDisplayModal"></i>
                </a>
            </div>
            <div>
                <div class="pop-over-content">
                    <el-input v-model="filterBy.name" placeholder="Search members" />
                    <div class="pop-over-section">
                        <h4>Board members</h4>
                    </div>
                    <ul class="pop-over-member-list">
                        <li v-for="member in board.members" :key="member._id">
                            <a @click="onMember(member)">
                                <span>
                                    <img class="member-avatar" :src="member.imgUrl" style="position:relative" />
                                    <span style="position:absolute; left: 7px; font-weight: 600;">
                                        {{displayUserFirstChar(member)}}
                                    </span>
                                </span>
                                <span>
                                    {{ member.fullname }}({{ member.username }})
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['addMemberToTask'],
    props: {
        board: Object,
    },
    data() {
        return {
            displayModal: false,
            filterBy: {
                name: "",
            },
        }
    },
    created() { },
    methods: {
        onDisplayModal() {
            this.displayModal = !this.displayModal
        },

        onMember(member) {
            this.$emit('addMemberToTask', member)
        },

       displayUserFirstChar(member) {
            return member.fullname[0]
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
