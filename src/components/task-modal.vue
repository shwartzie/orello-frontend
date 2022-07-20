<template>
    <section class="task-modal">
        <section class="task-modal-info">
            <img v-if="task.attachments" src="task.attachments[0]" alt="" />
            <header class="window-header">
                <div class="flex space-between">
                    <div class="flex">
                        <i class="fa-solid fa-hard-drive"></i>
                        <div class="flex column title-modal">
                            Android App new landing page
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
            <!-- modal body -->
            <section class="flex space-between">
                <section>
                    <div class="flex labels" v-if="group.labels">
                        <h5>Labels</h5>
                        <div v-for="label in group.labels">
                            <a class="label">label</a>
                        </div>
                        <a>+</a>
                    </div>
                    <div class="flex">
                        <i class="fa-solid fa-align-justify"></i>
                        <div class="flex column description">
                            Description
                            <textarea
                                v-if="task.description"
                                contenteditable="true"
                            ></textarea>
                            <a href=""> add a detailed description</a>
                        </div>
                    </div>
                    <div class="flex" v-if="task.attachments">
                        <i class="fa-solid fa-paperclip"></i>
                        <div class="flex column attachments">
                            attachments
                            <div v-for="attachment in task.attachments">
                                <img src="attachment.src" alt="" />
                            </div>
                            <a href=""> add a an attachment</a>
                        </div>
                    </div>
                    <div class="flex activities">
                        <i class="fa-solid fa-list-ul"></i>
                        <div class="flex column activities">
                            Activity
                            <div v-for="activity in task.activities">
                                <p>activity</p>
                            </div>
                            <input type="text" placeholder="write a comment" />
                        </div>
                    </div>
                </section>
                <!-- side bar -->
                <section class="flex column">
                    <div class="flex column side-bar">
                        <h4>Add to card</h4>
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-user"></i>
                            </span>
                            members</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-tag"></i>
                            </span>
                            Labels</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-square-check"></i>
                            </span>
                            Checklist</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-clock"></i>
                            </span>
                            Dates</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-paperclip"></i>
                            </span>
                            Attachment</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                            >custom Fields</a
                        >
                    </div>
                    <div class="flex column">
                        <h4>power ups</h4>
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                            >Confluence</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                            >+ add new power</a
                        >
                    </div>
                    <div class="flex column">
                        <h4>automation</h4>
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                            >+ add button</a
                        >
                    </div>
                    <div class="flex column">
                        <h4>axtions</h4>
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </span>
                            move</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-copy"></i>
                            </span>
                            copy</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                            >make template</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-eye"></i>
                            </span>
                            watch</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-box-archive"></i>
                            </span>
                            archive</a
                        >
                        <a
                            class="board-header-btn button-link side-bar-button"
                            href=""
                        >
                            <span>
                                <i class="fa-solid fa-square-share-nodes"></i>
                            </span>
                            share</a
                        >
                    </div>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
export default {
    props: {
        task: Object,
        group: Object,
    },
    data() {
        return {}
    },
    created() {},
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
    },
    computed: {},
    mounted() {},
    unmounted() {},
    components: {},
}
</script>
