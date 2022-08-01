<template >
    <section v-if="currBoard" :style="{ background: `${currBoard.style?.background?.full} center / cover` }"
        :class="this.modalStatus">
        <template-header v-if="currBoard.isStatic" @createFromTemplate="onCreateBoardFromTemplate" />
        <preview-header :board="currBoard" @changeModalStatus="onChangeModal" />
        <Container drag-handle-selector=".group-drag-handle" group-name="1" @drop="onDrop($event)"
            orientation="horizontal" id="style-1" class="flex lists">
            <Draggable v-for="group in currBoard.groups" :key="group.id" class="fit-content">
                <group-list @updateGroups="onUpdateGroups" :group="group" :isStatic="currBoard.isStatic"
                    class="flex list-wrapper fit-content" @loadTask="onLoadTask" :board="currBoard" />
            </Draggable>
            <group-features @addGroup="onAddGroup" />
        </Container>

        <router-view :board="currBoard">
        </router-view>
        <!-- <task-modal v-if="this.clickedTask"/> -->

    </section>
</template>

<script>
import groupList from '../components/group-cmps/group-list.vue'
import previewHeader from '../components/headers/preview-header.vue'
import templateHeader from '../components/headers/template-header.vue'
import taskModal from '../components/task-cmps/task-modal.vue'
import groupFeatures from '../components/group-cmps/group-features.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { utilService } from '../services/util.service'
import { applyDrag } from '../services/drag-and-drop.service'
import { socketService } from '../services/socket.service.js'

export default {
    name: 'board-preview',
    data() {
        return {
            clickedTask: null,
            clickedGroup: null,
            isModalOpen: false,
        }
    },
    async created() {
        // console.log('this.$store.getters.loggedInUser:',this.$store.getters.loggedInUser);
        const _id = this.$route.params._id
        const currBoard = await this.$store.dispatch({ type: "setBoardById", _id })
        this.$store.dispatch({ type: 'onGoToBoard', currBoard })

        socketService.on("update-group-list", this.updateGroupList)
    },
    methods: {
        updateGroupList(board) {

            this.$store.commit({ type: "setCurrBoard", board })
        },
        onCreateBoardFromTemplate() {
            this.$store.dispatch({ type: "createBoardFromTemplate" })
        },
        onChangeModal(modalStatus) {
            if (modalStatus) {
                this.isModalOpen = "modalOpen"
            } else {
                this.isModalOpen = ""
            }
        },
        onLoadTask(task, group) {
            this.clickedTask = task
            this.clickedGroup = group
            const groupId = group.id
            this.$router.push(`/board/${this.currBoard._id}/group/${groupId}/task/${task.id}`)
        },
        onAddGroup(group) {
            const idx = -1
            this.$store.dispatch({ type: 'addGroup', group, idx })
        },
        onDrop(dropResult) {
            this.$store.dispatch({ type: 'onDropGroups', dropResult })
        },
        getChildPayload(index) {
            return this.currBoard.groups[index]
        },
        onUpdateGroup(group) {
            const board = JSON.parse(JSON.stringify(this.currBoard))
            const idx = board.groups.findIndex(currGroup => currGroup.id === group.id)
            board.groups.splice(idx, 1, group)
            this.$store.dispatch({ type: 'setCurrBoard', board })
        },

        onUpdateGroups(groupId, dropResult) {
            this.$store.dispatch({ type: 'onUpdateGroups', groupId, dropResult })
        },
        check(label) {
            if (!taskToAdd.labels?.length) {
                taskToAdd.labels = [label]
            } else {
                taskToAdd.labels.forEach((currLabel, idx) => {
                    if (currLabel.id === label.id) {
                        taskToAdd.labels.splice(idx, 1)
                    } else {
                        taskToAdd.labels.push(label)
                        //return?
                    }
                })
            }

            tasks.forEach((task, idx) => {
                if (task.id === taskToAdd.id) {
                    currGroup.tasks[idx] = taskToAdd
                }
            })
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
        },
        modalStatus() {
            return `board ${this.isModalOpen}`
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser
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

<style>
.lists {
    display: flex;
}
</style>