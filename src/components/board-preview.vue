<template >
    <section v-if="currBoard" :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }" class="board">
        <template-header v-if="currBoard.isStatic" />
        <preview-header :board="currBoard" />
        <Container group-name="1" @drop="onDrop($event)" :get-child-payload="getChildPayload" orientation="horizontal"
            class="flex lists" id="style-1">
            <Draggable v-for="group in currBoard.groups" :key="group.id">
                <group-list @updateGroup="onUpdateGroup" :group="group" :isStatic="currBoard.isStatic"
                    class="flex list-wrapper" @loadTask="onLoadTask" 
                    :board="currBoard"
                    />
            </Draggable>
        </Container>
        <group-features @addGroup="onAddGroup" />

        <router-view :board="currBoard" :task="currTask" :group="currGroup">
        </router-view>
        <!-- <task-modal v-if="this.clickedTask"/> -->

    </section>
</template>

<script>
import groupList from './group-list.vue'
import previewHeader from './preview-header.vue'
import templateHeader from './template-header.vue'
import taskModal from './task-modal.vue'
import groupFeatures from './group-features.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/drag-and-drop.service'
export default {
    name: 'board-preview',
    emits: ["loadTask"],
    data() {
        return {
            clickedTask: null,
            clickedGroup: null,
        }
    },
    created() {
        const _id = this.$route.params._id
        this.$store.dispatch({ type: "setBoardById", _id })
    },
    methods: {
        onLoadTask(task, group) {
            this.clickedTask = task
            this.clickedGroup = group
            const groupId = group.id
            this.$router.push(`/board/${this.currBoard._id}/group/${groupId}/task/${task.id}`)
        },
        onAddGroup(group) {
            const currBoard = { ...this.currBoard }
            this.$store.dispatch({ type: 'addGroup', currBoard, group })
        },
        onDrop(dropResult) {
            const groups = JSON.parse(JSON.stringify(this.currBoard.groups))
            const updatedGroups = applyDrag(groups, dropResult)
            const board = JSON.parse(JSON.stringify(this.currBoard))
            board.groups = updatedGroups
            this.$store.dispatch({ type: 'setCurrBoard', board })


        },
        getChildPayload(index) {
            console.log('index', index)
            return this.currBoard.groups[index]
        },
        onUpdateGroup(group) {
            const board = JSON.parse(JSON.stringify(this.currBoard))
            const idx = board.groups.findIndex(currGroup => currGroup.id === group.id)
            board.groups.splice(idx, 1, group)
            this.$store.dispatch({ type: 'setCurrBoard', board })
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
        currTask() {
            return this.clickedTask
        },
        currGroup() {
            return this.clickedGroup
        }
    },
    mounted() { },
    unmounted() { },
    components: {
        groupList,
        previewHeader,
        templateHeader,
        taskModal,
        groupFeatures,
        Container,
        Draggable
    }
}



</script>