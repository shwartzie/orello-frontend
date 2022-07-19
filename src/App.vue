<template>
    <section >
      <app-header></app-header>
      <router-view></router-view>
    </section>
</template>

<script>
import appHeader from "./components/app-header.vue"
// import { store } from './store/store'
// import userMsg from './cmps/user-msg.vue'
// import { userService } from './services/user.service'

export default {
    name: "app",
    components: {
        appHeader,
    },
}
</script>

<style></style>
