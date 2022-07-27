<template>
    <label for="group -select">group:</label>
    <select name="group " id="group-select" @change="selectedLocation">
        <option v-for="(group, idx) in board.groups" :value=idx  selected>{{ idx }}
        </option>
    </select>
</template>

<script>

export default {
    emits:["newLocation"],
    props: {
        board: Object,
    },
    data() {
        return {}
    },
    created() {
    },
    methods: {
        selectedLocation(ev) {
            console.log(ev.target.value);
            this.$emit("newLocation",ev.target.value)
        }
    },
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}

</script>