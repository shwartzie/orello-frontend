<template>
    <el-select v-model="value" multiple filterable remote reserve-keyword placeholder="Please enter a keyword"
        :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="board in boards" :key="board.value" :label="board.label" :value="board.value">
        </el-option>
    </el-select>
</template>

<script>
export default {
    data() {
        return {
            boards: [],
            value: [],
            list: [],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"]
        }
    },
    mounted() {
        this.list = this.states.map(board => {
            return { value: `value:${board}`, label: `${board}` };
        });
    },
    methods: {
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.boards = this.list.filter(board => {
                        return board.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.boards = [];
            }
        }
    }
}
</script>