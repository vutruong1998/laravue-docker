import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import router from './router'
import store from './store/index.js'
import './index.css'

// axios.defaults.baseURL = 'http://localhost/back-end/api'
axios.defaults.baseURL = 'http://localhost:8000/api'

const app = createApp(App)

app.use(Notifications)

app.use(VueAxios, axios)

app.use(store)

app.use(router)

app.mount('#app')