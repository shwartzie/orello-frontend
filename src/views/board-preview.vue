<template >
    <section v-if="currBoard" 
    :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})`}" 
    :class="this.modalStatus"
    >
        <template-header v-if="currBoard.isStatic" />
        <preview-header :board="currBoard" @changeModalStatus="onChangeModal"/>
        <Container group-name="1" @drop="onDrop($event)" :get-child-payload="getChildPayload" orientation="horizontal"
            id="style-1" class="flex lists">
            <Draggable v-for="group in currBoard.groups" :key="group.id">
                <group-list @updateGroups="onUpdateGroups" :group="group" :isStatic="currBoard.isStatic"
                    class="flex list-wrapper" @loadTask="onLoadTask" :board="currBoard" />
            </Draggable>
            <group-features @addGroup="onAddGroup" />
        </Container>

        <router-view :board="currBoard" :task="currTask" :group="currGroup">
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
import { applyDrag } from '../services/drag-and-drop.service'
export default {
    name: 'board-preview',
    emits: ["loadTask"],
    data() {
        return {
            clickedTask: null,
            clickedGroup: null,
            isModalOpen:false,
        }
    },
    created() {
        const _id = this.$route.params._id
        this.$store.dispatch({ type: "setBoardById", _id })
    },
    methods: {
        onChangeModal(modalStatus){
            this.isModalOpen=modalStatus
            if(modalStatus){
                this.isModalOpen="modalOpen"
            }else{
                this.isModalOpen="modalClose"
            }
        },
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
            return this.currBoard.groups[index]
        },
        onUpdateGroup(group) {
            const board = JSON.parse(JSON.stringify(this.currBoard))
            const idx = board.groups.findIndex(currGroup => currGroup.id === group.id)
            board.groups.splice(idx, 1, group)
            this.$store.dispatch({ type: 'setCurrBoard', board })
        },

        onUpdateGroups(groups) {
            const board = JSON.parse(JSON.stringify(this.currBoard))
            board.groups = groups
            this.$store.dispatch({ type: 'setCurrBoard', board })
        },
        check(label){
            if (!taskToAdd.labels?.length) {
                taskToAdd.labels = [label]
            } else {
                taskToAdd.labels.forEach((currLabel, idx) => {
                    if(currLabel.id === label.id) {
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
        modalStatus(){
            return `board ${this.isModalOpen}`
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