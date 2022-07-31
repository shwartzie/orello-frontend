<template>

    <header class="app-header">
        <nav :style="{ backgroundColor: boardColor }" class="header-nav flex space-between">
            <el-menu :style="{ backgroundColor: boardColor }" :ellipsis="false" class="el-menu-demo" mode="horizontal"
                >
                <!-- @mouseover="setAnimeLogo"  @mouseleave="setStaticLogo" -->
                <!-- add this to router link for animated logo -->
                <router-link class="nav-link app-header-logo" to="/">
                    <el-menu-item class="app-header-logo" index="1">
                        <img :src="headerImg" alt="">
                        <img src="../../assets/logo/" alt="">
                    </el-menu-item>
                </router-link>

                <!-- <el-sub-menu index="2">
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
 -->

                <router-link class="nav-link" to="/boards">
                    <el-menu-item class="boards-link" index="6"> Boards </el-menu-item>
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
       
        setStaticLogo() {
            this.headerImg = 'src/assets/logo/app-header-logo.gif'
        },
        setAnimeLogo() {
            this.headerImg = 'src/assets/logo/app-header-logo-gif.gif'
        },
    },
    computed: {
        boardColor() {
            return this.$store.getters.currBoardColor
        },
    },
    created() {
        console.log(this.boardColor)
    },
    components: {
        searchBar,
    },
}
</script>





