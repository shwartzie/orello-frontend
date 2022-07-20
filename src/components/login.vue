<template>
    <div class="login-logo">
        <img src="../assets/logo/Trello-logo.png" alt="">
    </div>
    <el-card class="box-card flex column align-center">
        <h4>Sign up for your account</h4>
        <div>
            <el-input placeholder="Enter email" v-model="email"></el-input>
            <el-input placeholder="Enter password" v-model="password"></el-input>
        </div>
        <small>By signing up, you confirm that you've read and accepted our <a>Terms of Service</a> and <a>Privacy
                Policy.</a></small>
        <el-button>Log in</el-button>
        <el-button :disabled="isDisabled">Continue</el-button>
        <span>OR</span>
        <div class="login-btn-container flex column align-center">
            <button class="continue-btn flex align-center justify-center">
                <img src="../assets/logo/Google-logo.svg" alt="">
                Continue with Google
            </button>
            <button class="continue-btn flex align-center justify-center">
                <img src="../assets/logo/Microsoft-logo.svg" alt="">
                Continue with Microsoft
            </button>
            <button class="continue-btn flex align-center justify-center">
                <img src="../assets/logo/Apple-logo.svg" alt="">
                Continue with Apple
            </button>
        </div>
        <hr>
        <div>
            <router-link to="/signup">Can't log in?</router-link>
            <small> &#8226; </small>
            <router-link to="/signup">Sign up for an account</router-link>
        </div>
    </el-card>
    <div class="login-background">
        <div class="img-left">
            <img src="../assets/svg/login-img-1.svg" alt="">
        </div>
        <div class="img-right">
            <img src="../assets/svg/login-img-2.svg" alt="">
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null
        }
    },
    computed: {
        isDisabled() {
            return this.email === ''
        }
    }
}
</script>


