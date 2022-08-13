<template>
    <div>
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
    </div>
</template>


    <script>
    export default {
        emits: ["goToBoard"],
        props: {
            boards: {
                type: Array,
            },
        },
        data() {
            return {
    
            }
        },
        created() {
    
        },
        methods: {
            goToBoard(board) {
                this.$emit("goToBoard", { ...board })
            },
        },
    
    }
    
    </script>