<template>
    <div class="pop-over-content">
        <h1>hi</h1>
    </div>
</template>

<script>
export default {
    emits: ['addMemberToTask'],
    data() {
        return {
            displayModal: false,
            members: [
                {
                    _id: "a101",
                    name: "Roni Shwarzman",
                    imgUrl: "/src/assets/images/my-profile-pic.jpg",
                },
            ],
            filterBy: {
                name: "",
            },
        }
    },
    created() {},
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
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
