<template>
    <header class="app-header">
        <nav class="header-nav flex space-between">
            <el-menu :ellipsis="false" class="el-menu-demo" mode="horizontal" @select="handleSelect">

                <router-link @mouseover="setAnimeLogo" @mouseleave="setStaticLogo" class="nav-link app-header-logo"
                    to="/">

                    <el-menu-item class="app-header-logo" index="1">
                        <img :src="headerImg" alt="">
                    </el-menu-item>
                </router-link>

                <el-sub-menu index="2">
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

                <el-sub-menu index="3">
                    <template #title>Recent</template>
                    <el-menu-item index="3-1">item one</el-menu-item>
                    <el-menu-item index="3-2">item two</el-menu-item>
                    <el-menu-item index="3-3">item three</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>Starred</template>
                    <el-menu-item index="3-1">item one</el-menu-item>
                    <el-menu-item index="3-2">item two</el-menu-item>
                    <el-menu-item index="3-3">item three</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>Template</template>
                    <el-menu-item index="3-1">item one</el-menu-item>
                    <el-menu-item index="3-2">item two</el-menu-item>
                    <el-menu-item index="3-3">item three</el-menu-item>
                </el-sub-menu>


                <router-link class="nav-link" to="/boards">
                    <el-menu-item index="6"> Boards </el-menu-item>
                </router-link>

            </el-menu>
            <search-bar></search-bar>
        </nav>
    </header>
</template>

<script>
import searchBar from "../header-cmps/search-bar.vue"
export default {
    data() {
        return {
            headerImg: 'src/assets/logo/app-header-logo.gif'
        }
    },
    methods: {
        handleSelect(key, path) {
        },
        setStaticLogo() {
            this.headerImg = 'src/assets/logo/app-header-logo.gif'
        },
        setAnimeLogo() {
            this.headerImg = 'src/assets/logo/app-header-logo-gif.gif'
        }
    },
    components: {
        searchBar,
    },
}
</script>





