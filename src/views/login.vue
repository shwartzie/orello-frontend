<template>
    <section class="login-signup-container flex column align-center">
        <div class="login-logo">
            <img src="../assets/logo/Trello-logo.png" alt="" />
        </div>
        <el-card class="box-card flex column align-center">
            <h4>Login to your account</h4>
            <div>
                <el-input placeholder="Enter Username" v-model="loginCred.username"></el-input>
                <el-input type="password" placeholder="Enter Password" v-model="loginCred.password"></el-input>
            </div>
            <small>By signing up, you confirm that you've read and accepted our
                <a>Terms of Service</a> and <a>Privacy Policy.</a></small>
            <el-button @click="doLogin">Log in</el-button>
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
            <div>
                <router-link to="/signup">Can't log in?</router-link>
                <small> &#8226; </small>
                <router-link to="/signup">Sign up for an account</router-link>
            </div>
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
            loginCred: { username: "", password: "" },
        }
    },
    methods: {
        async doLogin() {
            if (!this.loginCred.username) {
                this.msg = 'Please enter username/password'
                return
            }
            try {
                await this.$store.dispatch({ type: "login", userCred: this.loginCred })
                console.log('LOGGED IN SUCCESFULY')
                this.$router.push('/boards')
            } catch (err) {
                console.log(err)
                this.msg = 'Failed to login'
            }
        },

        // async removeUser(userId) {
        //   try {
        //     await this.$store.dispatch({ type: "removeUser", userId })
        //     this.msg = 'User removed'
        //   } catch(err) {
        //     this.msg = 'Failed to remove user'
        //   }
        // }
    },

    beforeRouteLeave(to, from) {
        this.$emit('setHeader', true)
    },
    computed: {


    },
    created() {
        this.$emit("hideHeader")
    },
}
</script>
