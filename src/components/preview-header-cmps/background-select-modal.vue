<template >
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <a @click="openActivityModal" class="icon-side-modal back"></a>
            <h3>Change background</h3>
            <a @click="closeModal" class="icon-side-modal close"></a>

        </header>
        <section class="modal-body">
            <article class="background-select-container background-select-def flex">
                <span @click="openImgSelectModal" class="background-select-card background-select-def-card def"
                    :style="{ backgroundImage: 'url(https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg)' }">
                </span>
                <span @click="openColorSelectModal" class="background-select-card background-select-def-card def"
                    :style="{ backgroundImage: 'url(https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg)' }">
                </span>
                <p>Photos</p>
                <p>Colors</p>
            </article>
            <hr>
            <h2>Custom</h2>
            <article class="background-select-container flex">
                <div class="background-box "></div>
                <span v-for="background in currBoard.backgrounds" class="background-select-card"
                    :style="{ background: `${background?.thumb} center / cover` }"
                    @click="setBackground(background.full)">
                </span>

                <input class="background-select-card background-select-upload" type="file"
                    accept="image/png,image/gif,image/jpg,image/jpeg,image/bmp" @change="uploadImg">
            </article>
        </section>
    </section>
</template>

<script>
import { uploadImg } from '../../services/img-upload.service.js'
export default {

    props: { currBoard: Object },
    emits: ['closeModal', 'setModalDisplay', 'saveImg', 'setBackground'],
    data() {
        return {

        }
    },
    created() {
        this.$emit('saveImg', this.currBoard.style.background)
    },
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
        },
        async uploadImg({ target: { files: [file] } }) {
            const { url } = await uploadImg(file)
            const background = `url(${url})`
            this.$emit('saveImg', background)
        },
        setBackground(background) {
            this.$emit('setBackground', background)
        },
    },
    computed: {

    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>
