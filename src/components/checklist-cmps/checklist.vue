<template>
    <section class="flex column checklist-cmp">
        <div class="checklist-cmp">
            <header class="flex">
                <span class="title-icon checklist"></span>

                <div class="flex space-between align-center" style="width: 100%;">
                    <h3 class="task-modal-title">{{ checklist.title }}</h3>
                    <div>
                        <!-- <a class="board-header-btn button-link"> hide checked items</a> -->
                        <a class="board-header-btn button-link delete-btn" @click="deleteChecklist"> delete</a>
                    </div>
                </div>
            </header>
            <el-progress :percentage="newPerc" />
        </div>
        <section class="todos" v-if="checklist.tasks">
            <div v-for="task in checklist.tasks" :key="task.id">
                <task-checklist-cmp :task="task" @updateTask="onUpdateChecklist" />
            </div>
        </section>
        <section class="add-todos ">
            <a class="board-header-btn button-link add-task-checklist" @click="addTaskItem = !addTaskItem">Add an item</a>
            <add-checklist-item v-if="addTaskItem" @addNewItem="onUpdateChecklist" @onCancel="onCancel" />
        </section>
    </section>
</template>

<script>
import addChecklistItem from './add-checklist-item.vue'
import taskChecklistCmp from './task-checklist-cmp.vue'
import { utilService } from '../../services/util.service'
import { socketService } from '../../services/socket.service.js'
export default {
    emits: ["addNewItem", "updateChecklist", "deleteChecklist"],
    props: {
        checklist: Object,
    },
    data() {
        return {
            progress: 0,
            addTaskItem: false,
        }
    },
    created() {
        this.updatePerc()
        socketService.on("update-task-checklists", this.updateChecklist)
    },
    methods: {
        updateChecklist(currBoard) {
            this.$store.commit({ type: "updateTask", currBoard })
        },
        deleteChecklist() {
            const newChecklist = JSON.parse(JSON.stringify(this.checklist))
            this.$emit("deleteChecklist", newChecklist)
        },
        onCancel(status) {
            this.addTaskItem = status
        },
        updatePerc() {
            if (this.checklist.tasks) {
                let tasksIsDone = 0
                this.checklist.tasks.forEach(task => {
                    if (task.isDone) {
                        tasksIsDone++
                    }
                })
                this.progress = (tasksIsDone / this.checklist.tasks.length).toFixed(2) * 100
            }
        },
        onUpdateChecklist(item) {
            let newChecklist = JSON.parse(JSON.stringify(this.checklist))
            if (!newChecklist.tasks?.length) {
                item.id = utilService.makeId()
                newChecklist.tasks = [item]
            } else if (item.id) {
                const idx = newChecklist.tasks.findIndex((task) => task.id === item.id)
                if (idx > -1) {
                    newChecklist.tasks[idx] = item
                }
            } else {
                item.id = utilService.makeId()
                newChecklist.tasks.push(item)
            }
            this.$emit("updateChecklist", newChecklist)
            this.updatePerc()
        },

    },
    computed: {
        format() {
            return this.progress === 100 ? 'Full' : `${this.progress}%`
        },
        newPerc() {
            if (this.checklist.tasks) {
                let tasksIsDone = 0
                this.checklist.tasks.forEach(task => {
                    if (task.isDone) {
                        tasksIsDone++
                    }
                })
                return (tasksIsDone / this.checklist.tasks.length).toFixed(2) * 100
            } else {
                return 0
            }
        }

    },
    mounted() { },
    unmounted() { },
    components: {
        addChecklistItem,
        taskChecklistCmp
    }
}

</script>