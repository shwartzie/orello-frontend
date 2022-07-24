<template>
    <img v-if="task.attachments" :src="task.attachments[0]" alt="" />
    <header class="window-header">
        <div class="flex space-between">
            <div class="flex task-modal-title">
                <span class="icon-logo header"></span>
                <div class="flex column title-modal">
                    {{ task.title }}
                    <p>
                        in list
                        <a>
                            {{ group.title }}
                        </a>
                    </p>
                </div>
            </div>
            <a class="task-close-modal" @click="closeModal"><i class="fa-solid fa-x"></i></a>
        </div>
    </header>

    <section class="flex space-between">
        <section class="left-side-modal-container">
            <h4 style="padding-left: 40px">Labels</h4>
            <div class="flex labels">
                <div style="padding-right: 5px" v-for="label in task.labels" :key="label.id">
                    <span class="card-label" :class="label.class" style="padding-left: 36px">
                        {{ label.title }}
                    </span>
                </div>

                <label-picker :board="board" :task="task" @addedLabel="addLabel" />
                <div v-if="task.members?.length" v-for="member in task.members" :key="member._id">
                    <span>
                        <img class="member-avatar" :src="member.imgUrl" />
                    </span>
                </div>
            </div>
            <div class="window-module">
                <div class="modal-description">
                    <div class="flex column">
                        <div class="flex task-modal-title">
                            <span class="icon-logo description"></span>
                            <span>Description</span>
                        </div>
                        <textarea v-if="task.description" contenteditable="true"></textarea>
                        <a href=""> add a detailed description</a>
                    </div>
                </div>
            </div>
            <div class="flex" v-if="task.checklists" v-for="checklist in task.checklists">
                <checklist :checklist="checklist" @updateChecklist="onUpdateChecklist" />
            </div>
            <div class=" column" v-if="task.attachments">
                <div class="task-modal-title">
                    <i class="fa-solid fa-paperclip"></i>
                    <span>Attachments</span>
                </div>
                <div class="flex task-modal-layout column attachments">
                    <modal-attachment-preview :attachments="task.attachments" />
                </div>
            </div>

            <div class="flex activities window-module">
                <div class="task-modal-title">
                    <span class="icon-logo activity"></span>
                    <span>Activity</span>
                </div>
                <div class="flex column">
                    <div v-for="activity in task.activities">
                        <p>Activity</p>
                    </div>
                    <div class="task-modal-layout">
                        <input v-if="!board.isStatic" type="text" placeholder="write a comment" />
                    </div>
                </div>
            </div>
        </section>
        <section class="flex column">
            <div class="flex column side-bar">
                <h4>Add to card</h4>
                <modal-members @addMemberToTask="addMemberToTask" :board="board" />

                <a class="board-header-btn button-link side-bar-button">
                    <span>
                        <i class="fa-solid fa-tag"></i>
                    </span>
                    Labels</a>

                <a class="board-header-btn button-link side-bar-button" @click="this.addChecklist = true">
                    <span>
                        <i class="fa-solid fa-square-check"></i>
                    </span>
                    Checklist</a>
                <div class="todos-container" v-if="addChecklist">
                    <todo-modal @closeModal="onCloseModal" @updateChecklist="onAddChecklist" />
                </div>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-clock"></i>
                    </span>
                    Dates</a>

                <modal-attachment @addAttachment="addAttachment" :task="task" />

                <!-- <a class="board-header-btn button-link side-bar-button" href="">custom Fields</a> -->
            </div>
            <!-- <div class="flex column">
                <h4>power ups</h4>
                <a class="board-header-btn button-link side-bar-button" href="">Confluence</a>
                <a class="board-header-btn button-link side-bar-button" href="">+ add new power</a>
            </div>
            <div class="flex column">
                <h4>automation</h4>
                <a class="board-header-btn button-link side-bar-button" href="">+ add button</a>
            </div> -->
            <div class="flex column">
                <h4>actions</h4>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </span>
                    move</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-copy"></i>
                    </span>
                    copy</a>
                <a class="board-header-btn button-link side-bar-button" href="">make template</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-eye"></i>
                    </span>
                    watch</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-box-archive"></i>
                    </span>
                    archive</a>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-square-share-nodes"></i>
                    </span>
                    share</a>
            </div>
        </section>
    </section>
</template>

<script>
import todoModal from "../task-modal-cmps/todo-modal.vue"
import labelPicker from "../task-modal-cmps/label-picker.vue"
import modalMembers from "../task-modal-cmps/modal-members.vue"
import modalAttachment from "../task-modal-cmps/modal-attachment.vue"
import modalAttachmentPreview from "../task-modal-cmps/modal-attachment-preview.vue"
import checklist from "../checklist-cmps/checklist.vue"
import { utilService } from "../../services/util.service"
export default {
    props: {
        board: Object,
        group: Object,
        task: Object,
    },
    emits: ["addedLabel", "closeModal", "updateChecklist"],
    data() {
        return {
            currGroup: null,
            labelPicker: false,
            addChecklist: false,
        }
    },
    created() { },
    methods: {
        onCloseModal() {
            this.addChecklist = false
        },
        closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
        addLabel(label) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            if (!taskToAdd.labels?.length) {
                taskToAdd.labels = [label]
            } else {
                if (taskToAdd.labels.includes(label)) {
                    return
                }
                taskToAdd.labels.push(label)
            }
            tasks.forEach((task, idx) => {
                if (task.id === taskToAdd.id) {
                    currGroup.tasks[idx] = taskToAdd
                }
            })
            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },

        addMemberToTask(member) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))

            const { tasks } = currGroup

            tasks.forEach((task, idx) => {
                if (task.id === taskToAdd.id) {
                    if (member) {
                        const j = task.members.findIndex(
                            (currMember) => currMember._id === member._id
                        )
                        if (j > -1) {
                            taskToAdd.members.splice(j, 1)
                        } else {
                            taskToAdd.members.push(member)
                        }
                    }
                    currGroup.tasks[idx] = taskToAdd
                }
            })

            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
        addAttachment(task) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = task
            console.log(task, currBoard, currGroup)
            const idx = currGroup.tasks.findIndex(
                (task) => task.id === taskToAdd.id
            )
            currGroup.tasks.splice(idx, 1, taskToAdd)
            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        },
        onAddChecklist(title) {
            console.log(title);
            const checklist = {
                title,
            }
            this.addUpdateChecklist(checklist)
        },
        onUpdateChecklist(newChecklist) {
            this.addUpdateChecklist(newChecklist)
        },
        addUpdateChecklist(checklist) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.group))
            const taskToAdd = JSON.parse(JSON.stringify(this.task))
            const { tasks } = currGroup
            if (!taskToAdd.checklists?.length) {
                checklist.id = utilService.makeId()
                taskToAdd.checklists = [checklist]
            } else if (checklist.id) {
                taskToAdd.checklists.forEach((currCheck, idx) => {
                    if (currCheck.id === checklist.id) {
                        taskToAdd.checklists[idx] = checklist
                    }
                })
            } else {
                checklist.id = utilService.makeId()
                taskToAdd.checklists.push(checklist)
            }
            tasks.forEach((task, idx) => {
                if (task.id === taskToAdd.id) {
                    currGroup.tasks[idx] = taskToAdd
                }
            })
            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
            })
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {
        labelPicker,
        modalMembers,
        todoModal,
        modalAttachment,
        checklist,
        modalAttachmentPreview,
    },
}
</script>
