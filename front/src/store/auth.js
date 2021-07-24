const GET_USER_INFO = 'GET_USER_INFO'
const SET_USER_AUTHENTICATED = 'SET_USER_AUTHENTICATED'
import axios from 'axios'

const headers = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
}

const state = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: {}
}

const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user
}

const mutations = {
    [GET_USER_INFO](state, payload) {
        state.user = payload
    },
    [SET_USER_AUTHENTICATED](state, payload) {
        state.isAuthenticated = payload
    }
}

const actions = {
    getUserInfo({ commit }) {
        return axios.get('/me', headers)
        .then(res => {
            commit(GET_USER_INFO, res.data)
        })
    }
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}