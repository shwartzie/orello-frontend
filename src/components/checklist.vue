<template>
    <section class="flex column checklist-cmp">
        <div class="checklist-cmp">
            <header class="flex space-between task-modal-title">
                <div>
                    <i class="fa-solid fa-square-check"></i>
                    {{ checklist.title }}
                </div>
                <div>
                    <a class="board-header-btn button-link"> hide checked items</a>
                    <a class="board-header-btn button-link"> delete</a>
                </div>
            </header>
            <el-progress :percentage=progress />
        </div>
        <section class="todos" v-if="checklist.tasks">
            <div v-for="task in checklist.tasks">
                <task-checklist-cmp :task="task" @updateTask="onUpdateChecklist" />
            </div>
        </section>
        <section class="add-todos ">
            <a @click="addTaskItem = true">Add an item</a>
            <add-checklist-item v-if="addTaskItem" @addNewItem="onUpdateChecklist" />
        </section>
    </section>
</template>

<script>
import addChecklistItem from './add-checklist-item.vue'
import taskChecklistCmp from './task-checklist-cmp.vue'
import { utilService } from '../services/util.service'
export default {
    emits: ["addNewItem"],
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
        console.log(this.checklist)
        if (this.checklist.tasks) {
            let tasksIsDone = 0
            this.checklist.tasks.forEach(task => {
                if (task.isDone) {
                    tasksIsDone++
                }
            })
            console.log(tasksIsDone, this.checklist.tasks.length);
            this.progress = (tasksIsDone / this.checklist.tasks.length).toFixed(2) * 100
        }
    },
    methods: {
        onUpdateChecklist(item) {
            let newChecklist = JSON.parse(JSON.stringify(this.checklist))
            console.log(item);
            if (!newChecklist.tasks?.length) {
                item.id = utilService.makeId()
                newChecklist.tasks = [item]
            } else if (item.id) {
                newChecklist.tasks.forEach((task, idx) => {
                    if (task.id === item.id) {
                        newChecklist.tasks[idx] = item
                    }
                })
            } else {
                item.id = utilService.makeId()
                newChecklist.tasks.push(item)
            }
            this.$emit("updateChecklist", newChecklist)
        },
    },
    computed: {
        format() {
            return this.progress === 100 ? 'Full' : `${this.progress}%`
        },

    },
    mounted() { },
    unmounted() { },
    components: {
        addChecklistItem,
        taskChecklistCmp
    }
}

</script>