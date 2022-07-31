<template>
    <section class="home-page container flex">
        <div class="background-gradient"></div>
        <article class="home-page-intro grid">
            <h2>Orello helps teams move work forward.</h2>
            <p>Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the
                way
                your team works is unique—accomplish it all with Orello.</p>
            <form class="sign-up-container flex">
                <!-- <el-input class="" type="email" placeholder="Email"></el-input> -->
                <router-link to="/boards">
                    <!-- <el-button type="primary">See Demo</el-button> -->
                    <el-button type="primary">Start doing</el-button>
                </router-link>
            </form>
            <img class="hero-img" src="../assets/svg/hero.webp" alt="hero">
        </article>
        <h2 class="sec-title">It’s more than work. It’s a way of working together.</h2>

        <div class="home-page-info">
            <p>Start with a Orello board, lists, and cards.
                Customize and expand with more features as your </p>
            <p> teamwork grows.
                Manage projects, organize tasks, and build team spirit—all in one place.</p>
            <!-- <router-link to="/boards">
            <el-button type="primary">Start doing</el-button>
        </router-link> -->
        </div>

        <img src="../assets/svg/board.webp" alt="board">
        <p>Join over 2,000,000 teams worldwide that are using Orello to get more done.</p>
        <h2>Features to help your team succeed</h2>
        <p>Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to
            events and goal setting, Orello’s intuitive features give any team the ability to quickly set up and
            customize workflows for just about anything.</p>

    </section>
</template>
<script>
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$emit('setHeader', false)
        })
    },
    beforeRouteLeave(to, from) {
        this.$emit('setHeader', true)
    },
}
</script>
<style >
</style>  