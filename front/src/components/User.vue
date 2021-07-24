<template>
    <div>
        <div class="text-center bg-gray-200 w-80 mx-auto z-50 sticky" style="top:0;">
            <h1 class="text-green-500">Completed: {{ countCompleted }}</h1>
            <h1 class="text-yellow-400">Pending: {{ countPending }}</h1>
        </div>
        <div ref="scrollComponent" v-if="getUsers">
            <div class="user-items shadow-md mx-auto border w-80 my-5 rounded-md" v-for="(item, key) in getUsers" :key="key">
                <div class="user-item p-3">
                    <div v-if="isEdit && userID == item.id">
                        <div class="flex items-center mb-3">
                            <label class="mr-5">Name:</label>
                            <input class="border w-full p-1" v-model="form.name" />
                        </div>
                        <div class="flex items-center mb-3">
                            <label class="mr-6">Email:</label>
                            <input class="border w-full p-1" v-model="form.email"/>
                        </div>
                        <div class="flex items-center mb-3">
                            <label class="mr-4">Status:</label>
                            <select class="border w-full p-1" v-model="form.status">
                                <option  v-for="(item, key) in options" :value="item.value" :key="key">{{ item.text }}</option>
                            </select>
                        </div>
                    </div>
                    <div v-else>
                        <h3 class="font-bold text-xl">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500">{{ item.email }}</p>
                    </div>

                    <div class="action mt-5">
                        <div class="flex justify-end">
                            <button class="border border-red-600 hover:bg-red-600 hover:text-white px-2 py-1 text-red-400 font-bold rounded-md" @click="removeUser(item.id)"><i class="fas fa-trash"></i></button>
                            <button class="border border-yellow-500 hover:bg-yellow-500 hover:text-white ml-2 px-2 text-yellow-500 font-bold rounded-md" v-if="isEdit && userID == item.id" @click="updateUser(item.id)"><i class="fas fa-pen"></i></button>
                            <button class="border border-yellow-500 hover:bg-yellow-500 hover:text-white ml-2 px-2 text-yellow-500 font-bold rounded-md" v-else @click="toggleEdit(item.id)"><i class="fas fa-toggle-on"></i></button>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="w-full p-2 completed" v-if="item.status == 1">Completed</button>
                    <button class="w-full p-2 pending" :class="{'compeleted': item.status == 1}" v-else @click="completed(item.id)">Pending</button>
                </div>
            </div>
        </div>
        <div class="user-items mx-auto border w-80 rounded-md mt-5 p-3 text-sm" v-if="isCreate">
            <div class="flex items-center mb-3">
                <label class="mr-3">Name:</label>
                <input class="border w-full p-1" v-model="form.name" />
            </div>
            <div class="flex items-center mb-3">
                <label class="mr-3">Email:</label>
                <input class="border w-full p-1" v-model="form.email"/>
            </div>
            <div class="flex items-center">
                <label class="mr-2">Status:</label>
                <select class="border w-full p-1" v-model="form.status">
                    <option  v-for="(item, key) in options" :value="item.value" :key="key">{{ item.text }}</option>
                </select>
            </div>
            <div class="text-center mt-5">
                <button class="border p-2 rounded-md border-blue-400 px-3 text-blue-400 hover:bg-blue-400 hover:text-white" @click="createUser"><i class="fas fa-database"></i></button>
                <button class="border p-2 rounded-md text-gray-400 px-3 ml-2 hover:bg-gray-400 hover:text-white" @click="isCreate = false"><i class="fas fa-times-circle"></i></button>
            </div>
        </div>
        <div class="text-center mt-5">
            <button class="border px-3 py-2 rounded-md font-bold border-indigo-400 text-indigo-400 text-sm hover:bg-indigo-400 hover:text-white" v-if="!isCreate" @click="isCreate = true"><i class="fas fa-plus"></i></button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'User',
    data() {
        return {
            users: [],
            form: {
                name: '',
                age: '',
                status: 2
            },
            options: [
                { value: 1, text: 'Completed' },
                { value: 2, text: 'Pending' }
            ],
            userID: '',
            isCreate: false,
            isEdit: false,
            page: 1,
            headers: {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token') 
                }
            }
        }
    },
    computed: {
        getUsers () {
            return this.users
        },
        countCompleted () {
            return this.users.filter(user => user.status == 1).length
        },
        countPending () {
            return this.users.filter(user => user.status == 2).length
        }
    },
    beforeMount() {
        this.initUsers()
    },
    mounted() {
        // this.scroll()
    },
    methods: {
        initUsers() {
            return this.axios.get(`/users`, this.headers)
            .then(res => {
                this.users = res.data
                // if (res.data.last_page == this.page) {
                //     this.page = 'max'
                //     return
                // }
                this.page++
            })
            .catch(err => { console.log(err) })
        },
        clearForm() {
            this.form = {
                name: '',
                email: '',
                status: 2
            }
            this.isEdit = false
            this.isCreate = false
        },
        createUser() {
            // this.form.id = this.users.slice(-1).pop()
            this.axios.post('/users', this.form, this.headers)
            .then(res => {
                if (res.status === 200) { 
                    this.initUsers()
                    this.clearForm()
                    this.$notify({
                        title: "User",
                        text: "Create success!",
                        type: "success"
                    })
                }
            })
            .catch(err => { 
                this.$notify({
                    title: "Login",
                    text: err.response.data.message,
                    type: "error"
                })
            })
        },
        toggleEdit(id) {
            this.userID = id
            this.isEdit = true
            this.isCreate = false
            let user = this.users.find(user => user.id == id)
            Object.assign(this.form, user)
        },
        updateUser(id) {
            this.axios.put(`/users/${id}`, this.form, this.headers)
            .then(res => {
                if (res.status === 200) { 
                    this.initUsers()
                    this.clearForm()
                    this.$notify({
                        title: "User",
                        text: "Update success!",
                        type: "success"
                    })
                }
            })
            .catch(err => { 
                this.$notify({
                    title: "Login",
                    text: err.response.data.message,
                    type: "error"
                })
            })
        },
        removeUser(id) {
            return this.axios.delete(`/users/${id}`, this.headers)
            .then(res => {
                if (res.status === 200) {
                    this.initUsers()
                    this.$notify({
                        title: "User",
                        text: "Remove success!",
                        type: "success"
                    })
                }
            })
            .catch(err => { 
                this.$notify({
                    title: "Login",
                    text: err.response.data.message,
                    type: "error"
                })    
            })
        },
        completed(id) {
            return this.axios.put(`/users/${id}/completed`, {}, this.headers)
            .then(res => {
                if (res.status === 200) {
                    this.initUsers()
                    this.$notify({
                        title: "User",
                        text: "Completed success!",
                        type: "success"
                    })
                }
            })
            .catch(err => { 
                this.$notify({
                    title: "Login",
                    text: err.response.data.message,
                    type: "error"
                })
            })
        },
        scroll() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
                if (bottomOfWindow) {
                    this.initUsers()
                }
            }
        }
    }
}
</script>

<style>
.completed {
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: 0 0 0 1px rgba(16, 185, 129) inset!important;
    color: rgba(16, 185, 129)!important; 
    border-radius: 0 0 5px 5px;
}
.pending {
    box-shadow: 0 0 0 1px #DB2828 inset!important;
    color: #DB2828!important; 
    border-radius: 0 0 5px 5px;
}
</style>