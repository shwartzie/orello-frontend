<template>
    <div class="checklist-cmp">
        <header class="flex space-between">
            <div>
                <i class="fa-solid fa-square-check"></i>
                {{ checklist.title }}
            </div>
            <div>
                <a> hide checked items</a>
                <a> delete</a>
            </div>
        </header>
        <el-progress :percentage=progress />
    </div>
</template>

<script>

export default {
    props: {
        checklist: Object,
    },
    data() {
        return {
            progress: 70,
        }
    },
    created() { },
    methods: {},
    computed: {
        format() {
            return this.progress === 100 ? 'Full' : `${this.progress}%`
        }
    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>