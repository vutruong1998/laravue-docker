<template>
    <div class="border w-80 mx-auto p-10 rounded-md shadow-xl mt-5">
        <h1 class="text-center text-xl font-bold">Login</h1>
        <form @submit.prevent="login">
            <div class="space-y-3">
                <div class="flex flex-col">
                    <label>Email:</label>
                    <input v-model="form.email" class="bg-gray-100 border p-1"/>
                </div>
                <div class="flex flex-col">
                    <label>Password:</label>
                    <input type="password" v-model="form.password" class="bg-gray-100 border p-1"/>
                </div>
            </div>
            <div class="text-center mt-5">
                <button class="border p-2 rounded-md">Login</button>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            this.axios.post('/login', this.form)
            .then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "Login",
                        text: "Login success!",
                        type: "success"
                    })
                    localStorage.setItem('token', res.data.access_token)
                    this.$store.commit('auth/SET_USER_AUTHENTICATED', true)
                    this.$router.push('/')
                }
            })
            .catch(err => {
                this.$notify({
                    title: "Login",
                    text: err.response.data.message || 'Login fail!',
                    type: "error"
                })
            })
        }
    }
}
</script>