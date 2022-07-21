<template>
    <section class="login-signup-container flex column align-center">
        <div class="login-logo">
            <img src="../assets/logo/Trello-logo.png" alt="">
        </div>
        <el-card class="box-card flex column align-center">

            <h4>Sign up for your account</h4>
            <el-input placeholder="Enter email" v-model="email"></el-input>
            <div>
                <small>
                    By signing up, you confirm that you've read and accepted our
                    <a>Terms of Service</a>
                    and
                    <a>Privacy Policy.</a>
                </small>
            </div>
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

            <router-link to="/signup">Already have an account? Log In</router-link>
        </el-card>
        <div class="login-background">
            <div class="img-left">
                <img src="../assets/svg/login-img-1.svg" alt="">
            </div>
            <div class="img-right">
                <img src="../assets/svg/login-img-2.svg" alt="">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            email: null,
        }
    },
    computed: {
        isDisabled() {
            return !this.email
        }
    },
}
</script>


