import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_CHAKAIMOOK_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

const auth_key = "auth-chakaimook"
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
  user: auth ? auth.user : "",
  jwt: auth ? auth.jwt : "",
  isAuthen: auth ? true : false
}

export default new Vuex.Store({
  state: initialState,

  mutations: {
    loginSuccess(state, payload) {
      console.log(payload)
      console.log(payload.user)
      console.log(payload.jwt)
      state.user = payload.user
      state.jwt = payload.jwt
      state.isAuthen = true
      console.log(state.user)
      console.log(state.jwt)
      console.log(state.isAuthen)
    },
    logoutSuccess(state) {
      state.user = ""
      state.jwt = ""
      state.isAuthen = false
    },
    setUpdate(state, payload) {
      console.log(payload.total_points)
      console.log(payload.max_points)
      state.user.total_points = payload.total_points
      state.user.max_points = payload.max_points
      console.log(state.user.total_points)
      console.log(state.user.max_points)
    }
  },

  actions: {
    async login({ commit }, { email, password }) {
      let res = await AuthService.login({ email, password })
      console.log(res)
      if (res.success) {
        console.log(res)
        console.log(res.jwt)
        console.log(res.user)
        commit("loginSuccess", res)
      }
      return res
    },
    logout({ commit }) {
      AuthService.logout()
      commit("logoutSuccess")
    },
    async register({ commit }, { username, email, password }) {
      let res = await AuthService.register({ username, email, password })
      if (res.success) {
        commit("loginSuccess", res.user, res.jwt)
      }
      return res
    },
    async updateGet({ commit }, payload) {
      let url = api_endpoint + "/users/" + payload.id
      let body = {
        total_points: payload.total_points,
        max_points: payload.max_points
      }
      try {
        let headers = AuthService.getApiHeader()
        let res = await Axios.put(url, body, headers)
        console.log(res)
        if (res.status === 200) {
          commit("setUpdate", res.data)
        }
        return res
      } catch (e) {
        console.error(e.response.data.message)
      }
    },
  },

  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isAuthen: (state) => state.isAuthen,
  },

  modules: {
  }
})
