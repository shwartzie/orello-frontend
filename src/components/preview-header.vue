<template>
    <header class="flex space-between preview-header">
        <section class="flex">
            <div class="flex">
                <a class="board-header-btn board-btn-features">
                    <img src="../assets/svg/board-features-btn.svg" />
                    <span>board</span>
                    <img src="../assets/svg/board-arrow-down.svg" />
                </a>
                <h1 class="board-header-btn board-header-title">
                    {{ board.title }}
                </h1>
                <div class="board-header-template-span" v-if="!user.loggedIn">
                    <div>Template</div>
                </div>
                <a
                    class="board-header-btn star-btn"
                    :class="getStar"
                    @click="setStar"
                    style="display: flex"
                ></a>
                <span class="board-header-btn-divider"></span>
            </div>
            <a class="board-header-btn">trello workspace</a>
            <span class="board-header-btn-divider"></span>
            <a class="board-header-btn workspace-visble">
                <span>
                    <i class="fa-solid fa-user-group"></i>
                </span>
                workspace visible
            </a>
            <span class="board-header-btn-divider"></span>
            <div class="board-header-btn">
                <a v-for="member in board.members">
                    {{ member.fullname }}
                </a>
            </div>
            <a class="board-header-btn board-share-button"
                >
                <span>
                    <i class="fa-solid fa-user-plus"></i>
                </span>
                share</a
            >
        </section>
        <section class="flex">
            <div class="flex">
                <a class="board-header-btn">slack</a>
                <a class="board-header-btn power-up-btn">
                    <span> <i class="fa-solid fa-rocket"></i> </span>
                    power ups
                </a>
                <a class="board-header-btn automation-btn">
                    <span>
                        <i class="fa-solid fa-bolt"></i>
                    </span>
                    automation
                </a>
            </div>
            <div class="flex">
                <span class="board-header-btn-divider"></span>
                <a class="board-header-btn filter-btn">
                    <span>
                        <i class="fa-solid fa-filter"></i>
                    </span>
                    filter</a
                >
                <a class="board-header-btn board-header-show-menu"
                    ><i class="fa-solid fa-ellipsis"></i>show menu</a
                >
            </div>
        </section>
    </header>
</template>

<script>
export default {
    name: "preview-header",
    data() {
        return {
            isStarred: false,
            user: { loggedIn: false },
        }
    },
    props: {
        board: Object,
    },
    created() {},
    methods: {
        setStar() {
            this.isStarred = !this.isStarred
        },
    },
    computed: {
        getStar() {
            return this.isStarred
                ? "fa-regular fa-star"
                : "fa-solid fa-star fa-star-colored"
        },
    },
    mounted() {},
    unmounted() {},
}
</script>
