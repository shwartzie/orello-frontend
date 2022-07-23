<template>
    <img v-if="task.attachments" :src="task.attachments[0]" alt="" />
    <header class="window-header">
        <div class="flex space-between">
            <div class="flex">
                <i class="fa-solid fa-hard-drive"></i>
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
            <div class="flex labels">
                <label-picker :board="board" :task="task" @addedLabel="addLabel" />
                <div v-if="task.members?.length" v-for="member in task.members" :key="member._id">
                    <span>
                        <img class="member-avatar" :src="member.imgUrl" />
                    </span>
                </div>
            </div>
            <div class="window-module">
                <div class="modal-description">
                    <div class="flex column description">
                        <div class="flex">
                            <i class="fa-solid fa-align-justify"></i>
                            Description
                        </div>
                        <textarea v-if="task.description" contenteditable="true"></textarea>
                        <a href=""> add a detailed description</a>
                    </div>
                </div>
            </div>

            <div class="flex" v-if="task.attachments">
                <i class="fa-solid fa-paperclip"></i>
                <div class="flex column attachments">
                    attachments
                    <modal-attachment-preview :attachments="task.attachments" />
                </div>
            </div>


            <div class="flex activities window-module">
                <i class="fa-solid fa-list-ul"></i>
                <div class="flex column activities">
                    Activity
                    <div v-for="activity in task.activities">
                        <p>activity</p>
                    </div>
                    <input v-if="!board.isStatic" type="text" placeholder="write a comment" />
                </div>
            </div>

        </section>
        <section class="flex column">
            <div class="flex column side-bar">
                <h4>Add to card</h4>
                <modal-members @addMemberToTask="addMemberToTask" />

                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-tag"></i>
                    </span>
                    Labels</a>

                <a class="board-header-btn button-link side-bar-button" @click="this.addChecklist = true">
                    <span>
                        <i class="fa-solid fa-square-check"></i>
                    </span>
                    Checklist</a>
                <div class="todos-container" v-if="task.checklist || addChecklist">
                    <todo-modal @closeModal="onCloseModal" />
                </div>
                <a class="board-header-btn button-link side-bar-button" href="">
                    <span>
                        <i class="fa-solid fa-clock"></i>
                    </span>
                    Dates</a>

                <modal-attachment @addAttachment="addAttachment" :task="task" />

                <a class="board-header-btn button-link side-bar-button" href="">custom Fields</a>
            </div>
            <div class="flex column">
                <h4>power ups</h4>
                <a class="board-header-btn button-link side-bar-button" href="">Confluence</a>
                <a class="board-header-btn button-link side-bar-button" href="">+ add new power</a>
            </div>
            <div class="flex column">
                <h4>automation</h4>
                <a class="board-header-btn button-link side-bar-button" href="">+ add button</a>
            </div>
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
import todoModal from './todo-modal.vue'
import labelPicker from "./label-picker.vue"
import modalMembers from "./task-modal-cmps/modal-members.vue"
import modalAttachment from "./task-modal-cmps/modal-attachment.vue"
import ModalAttachmentPreview from './task-modal-cmps/modal-attachment-preview.vue'
export default {
    props: {
        board: Object,
        group: Object,
        task: Object,
    },
    emits: ["addedLabel", "closeModal"],
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
            const idx = currGroup.tasks.findIndex(task => task.id === taskToAdd.id)
            currGroup.tasks.splice(idx, 1, taskToAdd)
            this.$store.commit("setCurrTask", taskToAdd)
            this.$store.commit("setCurrGroup", currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup
            })
        },
        getTimePassed(date) {
            const diff = Date.now() - date
            const seconds = Math.round(diff / 1000)
            const minutes = Math.round(seconds / 60)
            const hours = Math.round(minutes / 60)
            if (hours >= 1) {
                return `Added ${hours} hours ago`
            }
            else if (minutes > 1) {
                return `Added ${minutes} minutes ago`
            }
            else if (minutes === 1) {
                return `Added a minute ago`
            }
            else if (minutes <= 0) {
                return `Added a few seconds ago`
            }
            else if (seconds < 10) {
                return `Added just now`
            }
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
        ModalAttachmentPreview
    },
}
</script>
