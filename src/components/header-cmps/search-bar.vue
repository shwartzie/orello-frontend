<template>
    <el-select v-if="filterBy.boards" class="search-bar-main-nav" v-model="filterBy.boardTitle" @input="remoteMethod" multiple filterable
        remote reserve-keyword placeholder="Search..." :remote-method="remoteMethod" :loading="loading">
        <el-option  v-for="board in filterBy.boards" :key="board._id" :value="board.title">
        </el-option>
        <template #prefix>
            <el-icon class="el-input__icon">
                <search />
            </el-icon>
        </template>
    </el-select>

</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
    props: {
        boards: Array
    },
    data() {
        return {
            filterBy: {
                boardTitle: '',
                boards: [],
                value: [],
            },
            loading: false,
        }
    },
    created() {
        this.filterBy.boards = this.boards.map(board => board)
    },
    methods: {
       
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true
                this.filterBy.boards = this.boards.filter(board => {
                    this.loading = false
                    const regex = new RegExp(query, "i")
                    return regex.test(board.title)
                })
            }
            this.filterBy.boards = []
        }
    },
    components: {
        Search
    }
}
</script>