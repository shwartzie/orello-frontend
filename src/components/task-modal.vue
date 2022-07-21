<template>
    <section class="task-modal">
    <h1>hi</h1>
        <section class="task-modal-info">
            <img v-if="currTask.attachments" src="currTask.attachments[0]" alt="" />
            <header class="window-header">
                <div class="flex space-between">
                    <div class="flex">
                        <i class="fa-solid fa-hard-drive"></i>
                        <div class="flex column title-modal">
                            Android App new landing page
                            <p>
                                in list
                                <a>
                                    {{ currGroup.title }}
                                </a>
                            </p>
                        </div>
                    </div>
                    <a class="task-close-modal" @click="closeModal"
                        ><i class="fa-solid fa-x"></i
                    ></a>
                </div>
            </header>
            <section class="flex space-between">
                <section class="left-side-modal-container">
                    <div class="flex labels" v-if="currGroup.labels">
                        <h5>Labels</h5>
                        <div v-for="label in currGroup.labels">
                            <a class="label">label</a>
                        </div>
                        <a>+</a>
                    </div>
                    <div class="window-module">
                        <div class="modal-description">
                            <i class="fa-solid fa-align-justify"></i>
                            <div class="flex column description">
                                Description
                                <textarea
                                    v-if="currTask.description"
                                    contenteditable="true"
                                ></textarea>
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
                    <div class="flex activities">
                        <i class="fa-solid fa-list-ul"></i>
                        <div class="flex column activities">
                            Activity
                            <div v-for="activity in currTask.activities">
                                <p>activity</p>
                            </div>
                            <input type="text" placeholder="write a comment" />
                        </div>
                    </div>
                </section>
                <section class="flex column">
                    <div class="flex column side-bar">
                        <h4>Add to card</h4>
                        <a class="board-header-btn button-link side-bar-button" href="">
                            <span>
                                <i class="fa-solid fa-user"></i>
                            </span>
                            members</a>
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
                        <a class="board-header-btn button-link side-bar-button" href="">
                            <span>
                                <i class="fa-solid fa-paperclip"></i>
                            </span>
                            Attachment</a>
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
                        <h4>axtions</h4>
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
export default {
    props: {
        board: Object,
        task: Object,
        group: Object,
    },
    data() {
        return {
            currGroup:null||this.group,
            currTask:null||this.task
        }
    },
    created() {
        const {_id,groupId,id} = this.$route.params
        if (!this.group) {
            this.currGroup=this.board.groups.find((group)=> group.id===groupId)
            console.log(this.currGroup)
            this.currTask=this.currGroup.tasks.find((task)=> task.id===id)
        }
    },
    methods: {
        closeModal() {
            this.$router.push(`/board/${this.board._id}`)
        },
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
