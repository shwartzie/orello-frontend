<template>
    <div class="pop-over" >
        <section class="group-actions" v-if="!changeGroup">
            <section class="flex column">
                <div class="pop-over-header">
                    <span class="pop-over-header-title">List actions</span>
                    <a class="pop-over-header-close-btn">
                        <i class="fa-solid fa-x" style="cursor:pointer;" @click="onCloseModal"></i>
                    </a>
                </div>
            </section>
            <section class=" flex column">
                <div class="js-add-card">
                    <a @click="groupAction('Add')">Add card…</a>
                </div>
                <div class="js-add-card">
                    <a @click="groupAction('Copy')">Copy list…</a>
                </div>
                <div class="js-add-card">
                    <a @click="changeGroup = true">Move list…</a>
                </div>
                <div class="js-add-card">
                    <a @click="deleteCurrGroup">Delete group</a>
                </div>
            </section>
        </section>
        <section class="change-group-location" v-if="changeGroup">
            <section class="flex column">
                <div class="pop-over-header">
                    <a class="pop-over-header-close-btn">
                        <i class="icon-sm icon-back" style="cursor:pointer;" @click="changeGroup = false"></i>
                    </a>
                    <span class="pop-over-header-title">change Location</span>
                    <a class="pop-over-header-close-btn">
                        <i class="fa-solid fa-x" style="cursor:pointer;" @click="onCloseModal"></i>
                    </a>
                </div>
            </section>
            <section class=" flex column relative">
                <div class="flex column">
                    <label for="board-select">board:</label>
                    <select name="board" id="board-select" @change="test">
                        <option v-for="(board, idx) in boards" :value=idx>{{ board.title }}</option>
                    </select>
                    <group-select-cmp :board="currSelectedBoard" @newLocation="findGroup" />
                </div>
            </section>
            <button class="button-primary" @click="changeGroupInBoard">Move</button>

        </section>
    </div>
</template>

<script>
import groupSelectCmp from './group-select-cmp.vue'
export default {
    emits: ["closeModal", "groupAction"],
    props: {
        boards: Object,
        groupIdx: Number,
        board: Object,
    },
    data() {
        return {
            displayModal: false,
            changeGroup: false,
            selectedBoardIdx: 0,
            selectedBoard: null,
            newGroupLocation: 0,
            selectedGroup: null,
        }
    },
    created() {
        const boards = JSON.parse(JSON.stringify(this.boards))
        this.selectedBoard = boards[0]
        this.findGroup(0)
        this.selectedGroup = this.selectedBoard.groups[this.groupIdx]
    },
    methods: {
        onCloseModal() {
            this.$emit("closeModal")
        },
        groupAction(action) {
            this.$emit("groupAction", action)
        },
        test(ev) {
            const boards = JSON.parse(JSON.stringify(this.boards))
            this.selectedBoard = boards[ev.target.value]
        },
        findGroup(idx) {
            this.newGroupLocation = idx
        },
        changeGroupInBoard() {
            this.selectedBoard.groups.splice(this.newGroupLocation, 0, this.selectedGroup)
            const currBoard = this.selectedBoard
            this.$store.dispatch({ type: 'updateBoard', currBoard })
            this.deleteCurrGroup()
        },
        deleteCurrGroup() {
            const board = JSON.parse(JSON.stringify(this.board))
            board.groups.splice(this.groupIdx, 1)
            this.$store.dispatch({ type: 'setCurrBoard', board })
            this.onCloseModal()
        },


    },
    computed: {
        currSelectedBoard() {
            return this.selectedBoard
        }
    },
    mounted() { },
    unmounted() { },
    components: {
        groupSelectCmp
    },
}
</script>
