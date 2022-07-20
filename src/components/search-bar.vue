<!-- <template>
    <el-row class="demo-autocomplete text-center">
        <el-col :span="12">
            <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
                placeholder="Please Input" @select="handleSelect" />
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            state1: '',
            RestaurantItem: {
                value: '',
                link: ''
            },
            restaurants: 1
        }
    },
    methods: {
        createFilter(queryString, restaurant) {
            return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        },
        computed: {
            querySearch(queryString, cb) {
                const results = queryString
                    ? restaurants.value.filter(this.createFilter(queryString))
                    : restaurants.value
                // call callback function to return suggestions
                cb(results)
            },
            loadAll() {
                return [
                    { value: 'vue', link: 'https://github.com/vuejs/vue' },
                    { value: 'element', link: 'https://github.com/ElemeFE/element' },
                    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
                    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
                    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
                    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
                    { value: 'babel', link: 'https://github.com/babel/babel' },
                ]
            },
            handleSelect(){}

        },
        mounted() {
            restaurants.value = loadAll()
        }
    }
}


</script>


 -->
