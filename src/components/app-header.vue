<template>
    <header>
        <nav>
            <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    <router-link to="/">Trello</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/boards">Boards</router-link>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>Workspace</template>
                    <el-menu-item index="3-1">item one</el-menu-item>
                    <el-menu-item index="3-2">item two</el-menu-item>
                    <el-menu-item index="3-3">item three</el-menu-item>
                    <el-sub-menu index="3-4">
                        <template #title>item four</template>
                        <el-menu-item index="4-4-1">item one</el-menu-item>
                        <el-menu-item index="4-4-2">item two</el-menu-item>
                        <el-menu-item index="4-4-3">item three</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <!-- <el-menu-item index="5">
                    <router-link to="/board">Board</router-link>
                </el-menu-item> -->
            </el-menu>
            <div class="h-6" />

        </nav>
    </header>
</template>

<script>
export default {

    data() {
        return {

        }
    },
    methods: {
        handleSelect(key, path) {
            console.log(key, path)
        }
    }


}
</script>


 <style>
 .flex-grow {
     flex-grow: 1;
 }
 </style>



<!-- <script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script> -->
