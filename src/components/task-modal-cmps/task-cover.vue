

<template>
    <div class="pop-over task-cover-pop-over" >
        <div class="pop-over-header">
            <span class="pop-over-header-title">Cover</span>
            <a class="pop-over-header-close-btn">
                <i class="fa-solid fa-x" style="cursor: pointer" @click="closeModal"></i>
            </a>
        </div>
        <div>
            <div class="pop-over-content">
                <div>
                    <h4>Size</h4>
                    <el-button>Half Size</el-button>
                    <el-button>Full Size</el-button>
                </div>
                <div class="pop-over-section"></div>
                <ul class="pop-over-member-list cover-picker-ul-modal" style="
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        align-items: center;
                        height: 85px;
                    ">
                    <li v-for="color in demoColors" :key="color">
                        <span class="cover-color" :style="{ backgroundColor: color }" @click="onCoverPick(color)">
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { socketService } from '../../services/socket.service.js'
export default {
    emits: ['closeCoverModal', 'setCover'],

    data() {
        return {
            demoColors: ["#61bd4f", '#f2d600', '#e69524', '#eb5a46', ' #c377e0', '#0079bf', ' #00c2e0'],
            isMarked: false,
        }
    },
    created() {
        socketService.on("update-task", this.updateTask)
     },
    methods: {
        updateTask(currBoard) {
            this.$store.commit({ type: "updateTask", currBoard })
        },
        closeModal() {
            this.$emit("closeCoverModal", false)
        },
        onCoverPick(color) {
            this.$emit("setCover", { color }, 'cover','added color cover')
        },
    },
    computed: {
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
