<template >
    <section v-if="currBoard" :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }" class="board">
        <template-header v-if="currBoard.isStatic" />
        <preview-header :board="currBoard" />
        <section class="flex lists" id="style-1">
            <group-list v-for="group in currBoard.groups" :group="group" :isStatic="currBoard.isStatic" class="flex list-wrapper" />
        </section>
        <task-modal v-if="this.clickedTask"/>
    </section>
</template>

<script>
import groupList from './group-list.vue'
import previewHeader from './preview-header.vue'
import templateHeader from './template-header.vue'
import taskModal from './task-modal.vue'
export default {
    name: 'board-preview',
    data() {
        return {
            clickedTask:null,
        }
    },
    created() {
        const _id=this.$route.params._id
        this.$store.dispatch({type:"setBoardById",_id})
    },
    methods: {
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        }
    },
    mounted() { },
    unmounted() { },
    components: {
        groupList,
        previewHeader,
        templateHeader,
        taskModal,
        
    }
}



</script>