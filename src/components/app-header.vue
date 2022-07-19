<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link>
            <p></p>
            <router-link to="/boards">boards</router-link>

            <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    @select="handleSelect">
                    <el-menu-item index="0">LOGO</el-menu-item>
                    <div class="flex-grow" />
                    <el-menu-item index="1">Processing Center</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Workspace</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu> -->
        </nav>
    </header>
</template>
<script>


export default {

    data() {
        return {
            activeIndex: 1
        }
    },
    methods: {}


}
</script>




            <style>
            .flex-grow {
                flex-grow: 1;
            }
            </style>