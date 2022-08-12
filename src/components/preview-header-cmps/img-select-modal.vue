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
            <article class="background-select-container unsplash-card-container flex">
                <span v-for="img in imgs" :key="img.thumb" class="background-select-card unsplash-card"
                    @click="setBackground(img.full, img.thumb, img.color)"
                    :style="{ backgroundImage: `url(${img.thumb})` }">
                </span>

            </article>

        </section>
    </section>
</template>

<script>
import { unsplashService } from '../../services/unspalsh.service'

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
        // this.setBackground()
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
        setBackground(full, thumb, color) {
            full = `url(${full})`
            thumb = `url(${thumb})`
            color = this.checkColorBrightness(color)

            const background = { full, thumb, color }
            this.$emit('setBackground', background)
        },
        async searchImgs() {
            this.imgs = await unsplashService.searchImgs(this.queryParams)
        },
        checkColorBrightness(color) {
            const c = color.substring(1);      // strip #
            const rgb = parseInt(c, 16);   // convert rrggbb to decimal
            const r = (rgb >> 16) & 0xff;  // extract red
            const g = (rgb >> 8) & 0xff;  // extract green
            const b = (rgb >> 0) & 0xff;  // extract blue

            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
            if (luma > 40) {
                return '026aa7'
            }
            return color
        }

    },
    computed: {

    },
    mounted() { },
    unmounted() { },
    components: { Search }
}

</script>
