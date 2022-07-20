<template>
    <el-button text @click="open">Click to open the Message Box</el-button>
</template>

<script >
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    template: ``
    ,
    data() {
        return {}
    },
    created() { },
    methods: {
        open() {
            ElMessageBox.alert('This is a message', 'Title', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: 'OK',
            })
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}
</script>
