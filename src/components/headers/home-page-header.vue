<template>
    <header class="home-page-header flex">
        <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
            <el-menu-item class="logo" index="0">
                <img src="../../assets/logo/Trello-logo.png" alt="" />
            </el-menu-item>
            <!-- <div /> -->

            <!-- <el-sub-menu index="1">
                <template #title>Features</template>
                <el-menu-item index="1-1">Features</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>Solutions</template>
                <el-menu-item index="3-1">Solutions</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>Plans</template>
                <el-menu-item index="4-1">Plans</el-menu-item>
            </el-sub-menu>
            <el-menu-item> Pricing </el-menu-item>

            <el-sub-menu index="5">
                <template #title>Resources</template>
                <el-space wrap>
                    <div v-for="i in 20" :key="i">
                        <el-button text> Resource </el-button>
                    </div>
                </el-space>
            </el-sub-menu> -->
        </el-menu>
        <div class="login-btns" v-if="!loggedinUser">
            <router-link class="nav-link" to="/login">
                <el-button>Log in</el-button>
                <el-button type="primary">Get Orello for free</el-button>
            </router-link>
        </div>
        <div v-else class="flex">

            <el-button @click="doLogout">Logout</el-button>
            <el-button type="primary" @click="goToBoards">Go To Your Boards</el-button>
        </div>
    </header>
</template>

<script>
export default {
    name: "home-page-header",
    methods: {
        goToBoards() {
            this.$router.push("/boards")
        },

        doLogout() {
            // location.reload();
            this.$store.dispatch({ type: "logout" })
        },
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },

    },
}
</script>
