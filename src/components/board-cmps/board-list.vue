//TODO: MAKE DRY CODE
<template>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section class="board-card" @click="goToBoard(board)" v-if="board.isStatic">
                <div class="board-card-img-container">
                    <h3>{{ board.title }}</h3>
                    <span></span>
                    <div class="background" :style="{
                        background: `${board.style?.background?.thumb} center / cover`
                    }">
                    </div>
                    <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                    <span v-else @click.stop class="title-icon star"></span>
                </div>
            </section>
        </li>
    </ul>
    <p> <span class="icon star"></span> Starred Boards</p>

    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section v-if="board.isStarred" class="board-card" @click="goToBoard(board)">
                <h3>{{ board.title }}</h3>
                <div class="background" :style="{
                    background: `${board.style?.background?.thumb} center / cover`
                }">
                </div>
                <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                <span v-else @click.stop class="title-icon star"></span>
            </section>
        </li>
    </ul>

    <p><span class="icon clock"></span> Recently Viewed</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section v-if="board.isRecentlyViewed" class="board-card" @click="goToBoard(board)">
                <h3>{{ board.title }}</h3>
                <div class="background" :style="{
                    background: `${board.style?.background?.thumb} center / cover`
                }">
                </div>
                <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                <span v-else @click.stop class="title-icon star"></span>
            </section>
        </li>
    </ul>

    <p><span class="icon organization"></span> Orello Boards</p>
    <ul class="board-list" v-if="boards">
        <li v-for="board in boards" :key="board._id">
            <section v-if="!board.isStatic" class="board-card" @click="goToBoard(board)">
                <h3>{{ board.title }}</h3>
                <div class="background" :style="{
                    background: `${board.style?.background?.thumb} center / cover`
                }">
                </div>
                <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                <span v-else @click.stop class="title-icon star"></span>
            </section>
        </li>
    </ul>

    <!-- <div class="boards-logo flex column" v-if="
        board.createdBy?.fullname === loggedinUser?.fullname ||
        board.members.includes(loggedinUser)
    ">
        <h2>YOUR WORKSPACES</h2>
        <div class="flex">
            <span class="trello-workspace-logo">O</span>
            <p>Orello Workspace</p>
        </div>
        <ul class="board-list" v-if="boards">
            <li v-for="board in boards" :key="board._id">
                <section class="board-card" @click="goToBoard(board)">
                    <h3>{{ board.title }}</h3>
                    <div class="background" :style="{
                        background: `${board.style.background?.thumb} center / cover`
                    }">
                    </div>
                    <span v-if="board.isStarred" @click.stop class="title-icon star-solid"></span>
                    <span v-else @click.stop class="title-icon star"></span>
                </section>
            </li>
        </ul>
    </div> -->
</template>

<script>
import { userService } from '../../services/user.service.js'
import { utilService } from '../../services/util.service.js'


export default {
    name: "board-list",
    emits: ["goToBoard"],
    props: {
        boards: {
            type: Array,
        },
        filter: String,
        loggedinUser: Object,
    },
    data() {
        return {}
    },
    created() {
        const user = userService.getLoggedinUser() || userService.signupGuest()
        // console.log('user:',user);
        if (user) {
            this.$store.commit({ type: 'setLoggedinUser', user })
        } else {
            this.$store.commit({ type: 'setLoggedinUser', user: guest })
        }
    },
    methods: {
        goToBoard(board) {
            this.$emit("goToBoard", { ...board })
        },
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {},
}
</script>

<style>
</style>
