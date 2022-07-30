<template>
    <section class="login-signup-container flex column align-center">
        <div class="login-logo">
            <img src="../assets/logo/Trello-logo.png" alt="" />
        </div>
        <el-card class="box-card flex column align-center">
            <h4>Sign up for your account</h4>
            <el-input class="signup-input" placeholder="Enter Fullname" v-model="signupCred.fullname"></el-input>
            <el-input class="signup-input" placeholder="Enter Username" v-model="signupCred.username"></el-input>
            <el-input class="signup-input" placeholder="Enter Password" v-model="signupCred.password"></el-input>
            <div class="signup-small">
                <small>
                    By signing up, you confirm that you've read and accepted our
                    <a>Terms of Service</a>
                    and
                    <a>Privacy Policy.</a>
                </small>
            </div>
            <el-button :disabled="isDisabled" @click="doSignup">Continue</el-button>
            <span>OR</span>
            <div class="login-btn-container flex column align-center">
                <button class="continue-btn flex align-center justify-center">
                    <img src="../assets/logo/Google-logo.svg" alt="" />
                    Continue with Google
                </button>
                <button class="continue-btn flex align-center justify-center">
                    <img src="../assets/logo/Microsoft-logo.svg" alt="" />
                    Continue with Microsoft
                </button>
                <button class="continue-btn flex align-center justify-center">
                    <img src="../assets/logo/Apple-logo.svg" alt="" />
                    Continue with Apple
                </button>
            </div>
            <hr />

            <router-link to="/login">Already have an account? Log In</router-link>
        </el-card>
        <div class="login-background">
            <div class="img-left">
                <img src="../assets/svg/login-img-1.svg" alt="" />
            </div>
            <div class="img-right">
                <img src="../assets/svg/login-img-2.svg" alt="" />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            signupCred: { username: "", password: "", fullname: "", imgUrl: "src/assets/images/backgroundimg.jpg" },
        }
    },
    methods: {
        async doSignup() {
            if (
                !this.signupCred.fullname ||
                !this.signupCred.password ||
                !this.signupCred.username
            ) {
                this.msg = "Please fill up the form"
                return
            }
            await this.$store.dispatch({
                type: "signup",
                userCred: this.signupCred,
            })
            this.$router.push("/")
        },
    },
    computed: {
        isDisabled() {
            if (
                !this.signupCred.fullname &&
                !this.signupCred.password &&
                !this.signupCred.username
            ) {
                return true
            }
            return false
        },
    },
    created() {
        this.$emit("hideHeader")
    },
}
</script>
