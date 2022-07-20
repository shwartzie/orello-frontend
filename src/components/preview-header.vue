<template>
    <header class="flex space-between preview-header">
        <section class="flex">
            <div class="flex">
                <a class="board-header-btn"><i class="fa-solid fa-lines-leaning"></i>board </a>
                <a class="board-header-btn">{{ board.title }}</a>
                <a class="board-header-btn "><i class="fa-solid fa-star"></i></a>
                <span class="board-header-btn-divider"></span>
            </div>
            <a class="board-header-btn">trello workspace</a>
            <span class="board-header-btn-divider"></span>
            <a class="board-header-btn"><i class="fa-solid fa-user-group"></i>workspace visible</a>
            <span class="board-header-btn-divider"></span>
            <div class="board-header-btn">
                <a v-for="member in board.members">
                    {{ member.fullname }}
                </a>
            </div>
            <a class="board-header-btn"><i class="fa-solid fa-user-plus"></i>share</a>
        </section>
        <section class="flex">
            <div class="flex">
                <a class="board-header-btn">slack</a>
                <a class="board-header-btn"><i class="fa-solid fa-rocket"></i>power ups</a>
                <a class="board-header-btn"><i class="fa-solid fa-bolt"></i>automation</a>
            </div>
            <div class="flex">
                <span class="board-header-btn-divider"></span>
                <a class="board-header-btn"><i class="fa-solid fa-filter"></i>filter</a>
                <a class="board-header-btn"><i class="fa-solid fa-ellipsis"></i>show menu</a>
            </div>
        </section>
    </header>
</template>

<script>
export default {
    name: 'preview-header',
    data() {
        return {
        }
    },
    props: {
        board: Object,
    },
    created() { },
    methods: {},
    computed: {},
    mounted() { },
    unmounted() { },
}
</script>