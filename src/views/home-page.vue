<template>
    <section class="home-page container flex">
        <div class="background-gradient"></div>
        <article class="home-page-intro grid">
            <h2>Trello helps teams move work forward.</h2>
            <p>Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the
                way
                your team works is unique—accomplish it all with Trello.</p>
            <form class="sign-up-container flex">
                <el-input class="" type="email" placeholder="Email"></el-input>
                <router-link to="/signup">
                    <el-button type="primary">Sign up -it's free</el-button>
                </router-link>
            </form>
            <img class="hero-img" src="../assets/svg/hero.webp" alt="hero">
        </article>
        <h2>It’s more than work. It’s a way of working together.</h2>
        <p>Start with a Trello board, lists, and cards.
            Customize and expand with more features as your teamwork grows.
            Manage projects, organize tasks, and build team spirit—all in one place.</p>
        <router-link to="/boards">
            <el-button type="primary">Start doing</el-button>
        </router-link>

        <img src="../assets/svg/board.webp" alt="board">
        <p>Join over 2,000,000 teams worldwide that are using Trello to get more done.</p>
        <div class="logo-container">
            <img src="../assets/svg/coinbase.svg" alt="logo">
            <img src="../assets/svg/johnDeere.svg" alt="logo">
            <img src="../assets/svg/Grand-Hyatt.svg" alt="logo">
            <img src="../assets/svg/Google.svg" alt="logo">
            <img src="../assets/svg/Visa.svg" alt="logo">
            <img src="../assets/svg/Zoom.webp" alt="logo">
        </div>
        <h2>Features to help your team succeed</h2>
        <p>Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to
            events and goal setting, Trello’s intuitive features give any team the ability to quickly set up and
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
        // console.log('leaving')
        this.$emit('setHeader', true)
    },
}
</script>
<style >
</style>