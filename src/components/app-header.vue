<template>
    <header>
        <nav>
            <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <router-link to="/">
                    <el-menu-item index="1"> Trello </el-menu-item>
                </router-link>
                <router-link to="/boards">
                    <el-menu-item index="2"> Boards </el-menu-item>
                </router-link>
                <router-link to="/board/213">
                    <el-menu-item index="2"> Board </el-menu-item>
                </router-link>
                <el-sub-menu index="3">
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
                <el-menu-item class="header-search-bar" index="4">
                    <search-bar></search-bar>
                </el-menu-item>
            </el-menu>
        </nav>
    </header>
</template>

<script>
import searchBar from "./search-bar.vue"
export default {
    data() {
        return {}
    },
    methods: {
        handleSelect(key, path) {
            console.log(key, path)
        },
    },
    components: {
        searchBar,
    },
}
</script>





