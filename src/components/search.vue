<template>
    <div class="demo-input-suffix">
        <el-row :gutter="20">
            <el-input v-model="input4" class="w-50 m-2" placeholder="Type something">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
</script>
