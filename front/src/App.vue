<template>
  <div class="container mx-auto text-center space-x-2">
    <router-link to="/" class="text-xl hover:text-blue-600" v-if="isAuthenticated"><i class="fas fa-home"></i></router-link>
    <router-link to="/user" class="text-xl hover:text-blue-600" v-if="isAuthenticated"><i class="fas fa-user"></i></router-link>
    <a class="cursor-pointer text-xl hover:text-blue-600" @click="logout" v-if="isAuthenticated"><i class="fas fa-sign-out-alt"></i></a>
  </div>
  <notifications position="bottom right"/>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  mounted() {
    this.$store.dispatch('auth/getUserInfo').catch(err => {
      console.log(err)
    })
  },
  methods: {
    logout() {
      return this.axios.get('/logout', {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }})
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem('token')
          this.$store.commit('auth/SET_USER_AUTHENTICATED', false)
          this.$router.push('/login')
        }
      })
      .catch(err => {
        this.$notify({
          title: "Logout",
          text: err.response.data.message || 'Logout fail!',
          type: "error"
        })
      })
    }
  }
}
</script>

<style>
</style>
