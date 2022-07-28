<template >
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <a @click="openActivityModal" class="icon-side-modal back"></a>
            <h3>Change background</h3>
            <a @click="closeModal" class="icon-side-modal close"></a>

        </header>
        <section class="modal-body">
            <article class="background-select-container flex">
                <span @click="openImgSelectModal" class="background-select-card"
                    :style="{ backgroundImage: 'url(https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg)' }">
                </span>
                <span @click="openColorSelectModal" class="background-select-card"
                    :style="{ backgroundImage: 'url(https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg)' }">
                </span>
                <p>Photos</p>
                <p>Colors</p>
            </article>
            <hr>
            <h2>Custom</h2>
            <article class="background-select-container flex">
                <div class="background-box "></div>
                <span class="background-select-card"
                    :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }">
                </span>
                <span class="background-select-card"
                    :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }">
                </span>
                <span class="background-select-card"
                    :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }">
                </span>
                <span class="background-select-card"
                    :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }">
                </span>
                <span class="background-select-card"
                    :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }">
                </span>
                <input class="background-select-card background-select-upload" type="file"
                    accept="image/png,image/gif,image/jpg,image/jpeg,image/bmp">
            </article>
        </section>
    </section>
</template>

<script>

export default {
    props: { currBoard: Object },
    emits: ['closeModal', 'setModalDisplay'],
    data() {
        return {
        }
    },
    created() { },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
        openActivityModal() {
            this.$emit('setModalDisplay', 'activityModal')
        },
        openColorSelectModal() {
            this.$emit('setModalDisplay', 'colorSelectModal')
        },
        openImgSelectModal() {
            this.$emit('setModalDisplay', 'imgSelectModal')
        }
    },
    computed: {

    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>
