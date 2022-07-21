<template>
    <ul class="flex column ">
        <li class="label-display" v-for="label in board.labels" :style="{ backgroundColor: `${label.color}` }">
            <span>
                <a @click="addLabel(label)">{{ label.title }}</a>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    data() {
        return {
        }
    },
    created() {
        // console.log(this.board);
    },
    methods: {
        addLabel(label) {
            this.$emit("addedLabel", label)
        }
    },
    computed: {
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
