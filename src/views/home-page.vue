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

        <hr>
        <article class="home-page-card-container  flex">
            <img
                src="https://images.ctfassets.net/rz1oowkt5gyp/2ozLp25HsHeANpiNqAwzGI/d60a017d2f214c28f774b35d03499782/tag.svg">
            <div class="home-page-card">
                <h4>See Orello pricing</h4>
                <p> Whether you’re a team of 2 or 2,000, Orello can be customized for your organization. Explore which
                    option is
                    best for you.</p>
            </div>
            <img
                src="https://images.ctfassets.net/rz1oowkt5gyp/6rRWTcHzPKupQ3ZDqBaxu6/aecd045f4b31a92288a85bdb4a9dfe2c/compass.svg">
            <div class="home-page-card">
                <h4>What is Orello?</h4>
                <p> Orello is the visual tool that empowers your team to manage any type of project, workflow, or task
                    tracking.</p>
            </div>
            <img
                src="https://images.ctfassets.net/rz1oowkt5gyp/5AE4nXLOennRxmmUMcgMLM/747e96bdd16cf4113e4ef867bd85fd29/solutions.svg">
            <div class="home-page-card">
                <h4>Discover Orello Enterprise</h4>
                <p> The productivity tool teams love, paired with the features and security needed for scale.</p>
            </div>
        </article>
        <hr>

        <!-- <h2 class="sec-title">It’s more than work. It’s a way of working together.</h2> -->

        <!-- <div class="home-page-info">
            <p>Start with a Orello board, lists, and cards.
                Customize and expand with more features as your </p>
            <p> teamwork grows.
                Manage projects, organize tasks, and build team spirit—all in one place.</p>
        </div> -->
        <div class="home-page-content grid">
            <div class="home-page-features">
                <h3>Features to help your team succeed</h3>
                <p>Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and
                    projects
                    to
                    events and goal setting, Trello’s intuitive features give any team the ability to quickly set up and
                    customize workflows for just about anything.</p>
            </div>
            <img class="view-img" src="../assets/svg/view.svg" alt="">
            <div class="home-page-back">
                <h5>CHOOSE A VIEW</h5>
                <h3>The board is just the beginning</h3>
                <p>Lists and cards are the building blocks of organizing work on a Orello board. Grow from there with
                    task
                    assignments, timelines, productivity metrics, calendars, and more.</p>
            </div>
            <img class="card-back-img" src="../assets/svg/card-back.svg" alt="">
            <div class="home-page-view">
                <h5>DIVE INTO THE DETAILS</h5>
                <h3>Cards contain everything you need</h3>
                <p>Orello cards are your portal to more organized work—where every single part of your task can be
                    managed,
                    tracked, and shared with teammates. Open any card to uncover an ecosystem of checklists, due dates,
                    attachments, conversations, and more.</p>
            </div>
        </div>

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