<template>
    <div class="members-btn">
        <a @click="onDisplayModal" class="board-header-btn button-link side-bar-button">
            <span>
                <i class="fa-solid fa-user"></i>
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
                        <li v-for="member in members" :key="member._id">
                            <a @click="onMember(member)">
                                <span>
                                    <img :src="member.imgUrl" />
                                </span>
                                <span>
                                    {{ member.name }}
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
        group:Object
    },
    data() {
        return {
            displayModal: false,
            members: [
                {
                    _id: "a101",
                    name: "Roni Shwarzman",
                    imgUrl: "../../assets/images/my-profile-pic.jpg",
                },
            ],
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
