<template>
    <ul class="flex column label-display">
        <li class="" v-for="label in board.labels" :style="{ backgroundColor: `${label.color}` }">
            <span>
                <a @click="addLabel(label)" >{{ label.title }}</a>
            </span>
        </li>
        <a @click="closeLabel">X</a>
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
        },
        closeLabel(){
            console.log('hi');
            this.$emit("closePicker")
        }
    },
    computed: {
    },
    mounted() { },
    unmounted() { },
    components: {},
}
</script>
