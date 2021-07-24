<template>
    <div class="border w-80 mx-auto p-10 rounded-md shadow-xl mt-5">
        <h1 class="text-center text-xl font-bold">Register</h1>
        <form @submit.prevent="register">
            <div class="space-y-3">
                <div class="flex flex-col">
                    <label>Name:</label>
                    <input v-model="form.name" class="bg-gray-100 border p-1"/>
                </div>
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
                <button class="border p-2 rounded-md">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
            }
        }
    },
    methods: {
        register() {
            this.axios.post('/register', this.form)
            .then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "Register",
                        text: "Register success!",
                        type: "success"
                    })
                    this.$router.push('/login')
                }
            })
            .catch(err => {
                this.$notify({
                    title: "Register",
                    text: err.response.data.message,
                    type: "error"
                })
            })
        }
    }
}
</script>