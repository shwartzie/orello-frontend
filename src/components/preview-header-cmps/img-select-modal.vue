<template >
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <a @click="openBackgroundSelectModal" class="icon-side-modal back"></a>
            <h3>Change background</h3>
            <a @click="closeModal" class="icon-side-modal close"></a>
        </header>

        <section class="modal-body">
            <h1>image</h1>
            <article class="background-select-container flex">
                <span v-for="img in imgs" :key="img.urls.thumb" class="background-select-card"
                    :style="{ backgroundImage: `url(${img.urls.thumb})` }">
                </span>

            </article>

        </section>
    </section>
</template>

<script>
import { unsplashService } from '../../services/unspalsh.service'
export default {
    props: { currBoard: Object },
    emits: ['closeModal', 'setModalDisplay'],
    data() {
        return {
            imgs: null
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
        }
    },
    computed: {

    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>
