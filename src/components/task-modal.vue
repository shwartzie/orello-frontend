<template>
    <section class="task-modal" @click="closeModal" @keydown.esc="something_in_your_methods">
        <section class="task-modal-info" @click.stop="">
            <img v-if="currTask.attachments" src="currTask.attachments[0]" alt="" />
            <header class="window-header">
                <div class="flex space-between">
                    <div class="flex">
                        <i class="fa-solid fa-hard-drive"></i>
                        <div class="flex column title-modal">
                            {{ currTask.title }}
                            <p>
                                in list
                                <a>
                                    {{ currGroup.title }}
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
                        <h5>Labels</h5>
                        <div v-for="label in currGroup.labels" v-if="currGroup.labels">
                            <a class="label">label</a>
                        </div>
                        <a @click="labelPicker = true" v-if="!labelPicker">+</a>
                        <label-picker v-if="labelPicker" :board="board" @addedLabel="addLabel" />
                        <div v-if="currTask.members.length" v-for="member in currTask.members" :key="member._id">
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
                                <textarea v-if="currTask.description" contenteditable="true"></textarea>
                                <a href=""> add a detailed description</a>
                            </div>
                        </div>
                    </div>
                    <div class="flex" v-if="currTask.attachments">
                        <i class="fa-solid fa-paperclip"></i>
                        <div class="flex column attachments">
                            attachments
                            <div v-for="attachment in currTask.attachments">
                                <img src="attachment.src" alt="" />
                            </div>
                            <a href=""> add a an attachment</a>
                        </div>
                    </div>
                    <div class="window-module">
                        <div class="modal-description">
                            <div class="flex column description">
                                <div class="flex">
                                    <i class="fa-solid fa-align-justify"></i>
                                    Description
                                </div>
                                <textarea v-if="currTask.description" contenteditable="true"></textarea>
                                <a href=""> add a detailed description</a>
                            </div>
                        </div>
                    </div>
                    <div class="flex activities window-module">
                        <i class="fa-solid fa-list-ul"></i>
                        <div class="flex column activities">
                            Activity
                            <div v-for="activity in currTask.activities">
                                <p>activity</p>
                            </div>
                            <input v-if="!board.isStatic" type="text" placeholder="write a comment" />
                        </div>
                    </div>
                    currTask: {{ currTask }}
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

                        <a class="board-header-btn button-link side-bar-button" href="">
                            <span>
                                <i class="fa-solid fa-square-check"></i>
                            </span>
                            Checklist</a>
                        <a class="board-header-btn button-link side-bar-button" href="">
                            <span>
                                <i class="fa-solid fa-clock"></i>
                            </span>
                            Dates</a>

                        <modal-attachment @addAttachment="onAddAttachment" :task="currTask" />
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
        </section>
    </section>
</template>

<script>
import labelPicker from "./label-picker.vue"
import modalMembers from './task-modal-cmps/modal-members.vue'
import modalAttachment from './task-modal-cmps/modal-attachment.vue'
export default {
    props: {
        board: Object,
        task: Object,
        group: Object,
    },
    emits: ["addedLabel"],
    data() {
        return {
            currGroup: null || this.group,
            currTask: null || this.task,
            labelPicker: false,
        }
    },
    created() {
        const { _id, groupId, id } = this.$route.params
        if (!this.group) {
            this.currGroup = this.board.groups.find(
                (group) => group.id === groupId
            )
            this.currTask = this.currGroup.tasks.find((task) => task.id === id)
        }
    },
    methods: {
        closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
        addLabel(label) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.currGroup))
            const taskToAdd = JSON.parse(JSON.stringify(this.currTask))

            if (!taskToAdd.labels) {
                taskToAdd.labels = [label]
            } else {
                if (taskToAdd.labels.includes(label)) {
                    return
                }
                taskToAdd.labels.push(label)
            }
            this.$store.dispatch({

                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd,
            })
        },
        onAddAttachment(task) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.currGroup))
            const taskToAdd = task
            console.log(task, currBoard, currGroup)
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd,
            })
        }
        ,
        addMemberToTask(member) {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            const currGroup = JSON.parse(JSON.stringify(this.currGroup))
            const taskToAdd = JSON.parse(JSON.stringify(this.currTask))
            this.$store.dispatch({
                type: "updateTask",
                currBoard,
                currGroup,
                taskToAdd,
                member,
            })
        },
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
    },
    mounted() { },
    unmounted() { },
    components: {
        labelPicker,
        modalMembers,
        modalAttachment,
    },
}
</script>
