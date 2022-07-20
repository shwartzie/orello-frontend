<template>
    <section class="login-signup-container flex column align-center">
        <div class="login-logo">
            <img src="../assets/logo/Trello-logo.png" alt="">
        </div>
        <el-card class="box-card flex column align-center">
            <p>OR</p>
            <div class="login-btn-container flex column align-center">
                <button class="continue-btn">Continue with Google</button>
                <button class="continue-btn">Continue with Microsoft</button>
                <button class="continue-btn">Continue with Apple</button>
            </div>
            <hr>
            <router-link to="/signup">Can't log in?</router-link>
            &#8226;
            <router-link to="/signup">Sign up for an account</router-link>
        </el-card>
    </section>
</template>

<script>
export default {

}
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 480px;
}
</style>
