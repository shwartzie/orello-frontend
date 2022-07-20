<template>
    <section class="login-signup-container flex column align-center">
        <signup></signup>
        <!-- <login></login> -->
    </section>
</template>

<script>
import login from '../components/login.vue'
import signup from '../components/signup.vue'
export default {
    data() {
        return {
            email: null,
            password: null
        }
    },
    created() {
        this.$emit('hideHeader')
    },
    computed: {
        isDisabled() {
            return this.email === ''
        }

    },
    components: {
        login,
        signup
    }
}
</script>


