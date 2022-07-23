<template>
    <el-upload @change="uploadFile" disabled class="upload-demo" drag multiple>
        <el-icon class="el-icon--upload">
        </el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script >
export default {
    methods: {
        uploadFile() {
            console.log('changed')
        }
    }
}
</script>
