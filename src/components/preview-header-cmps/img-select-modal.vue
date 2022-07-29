<template >
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <a @click="openBackgroundSelectModal" class="icon-side-modal back"></a>
            <h3>Photos by <a href="https://unsplash.com/">Unsplash</a> </h3>
            <a @click="closeModal" class="icon-side-modal close"></a>
        </header>

        <section class="modal-body">
            <el-input @input="searchImgs" v-model="queryParams" class="w-50 m-2" placeholder="Photos">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>
            <article class="background-select-container flex">
                <span v-for="img in imgs" :key="img.thumb" class="background-select-card"
                    @click="setBackground(img.full)" :style="{ backgroundImage: `url(${img.thumb})` }">
                </span>

            </article>

        </section>
    </section>
</template>

<script>
import { unsplashService } from '../../services/unspalsh.service'
import { utilService } from '../../services/util.service'
import { Search } from '@element-plus/icons-vue'
export default {
    props: { currBoard: Object },
    emits: ['closeModal', 'setModalDisplay', 'setBackground'],
    data() {
        return {
            imgs: null,
            queryParams: null
        }
    },
    async created() {
        if (!this.imgs) {
            this.imgs = await unsplashService.getImgs()
        }

    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
        openActivityModal() {
            this.$emit('setModalDisplay', 'activityModal')
        },
        openBackgroundSelectModal() {
            this.$emit('setModalDisplay', 'backgroundSelectModal')
        },
        setBackground(background) {
            background = `url(${background})`
            this.$emit('setBackground', background)
        },
        async searchImgs() {
            this.imgs = await unsplashService.searchImgs(this.queryParams)
        },

    },
    computed: {

    },
    mounted() { },
    unmounted() { },
    components: { Search }
}

</script>
