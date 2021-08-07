import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_CHAKAIMOOK_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
  },

  getters: {
    prod: (state) => state.data
  },

  mutations: {
    fetch(state, { res }) {
      state.data = res.data
    },
    buy(state, payload) {
      state.data.push(payload)
    },
  },

  actions: {
    async fetchProduct({ commit }) {
      let res = await Axios.get(api_endpoint + "/products")

      commit("fetch", { res })
    },
    async buyItem({ commit }, payload) {
      let url = api_endpoint + "/get-histories"

      let body = {
        name: payload.name,
        get_points: payload.get_points
      }

      try {
        let headers = AuthService.getApiHeader()
        let res = await Axios.post(url, body, headers)
        if (res.status === 200) {
          commit("buy", res.data)
          return {
            success: true,
            data: res.data
          } 
        } else {
          console.log(res)
          return {
            success: false,
            message: "Unknown status code: " + res.status
          }
        }
      } catch (e) {
        if (e.response.status === 403) {
          console.error(e.response.data.message)
          return {
            success: false,
            message: e.response.data.message,
          }
        } else {
          return {
            success: false,
            message: "Unknown error: " + e.response.data
          }
        }
      }
    },
  },

  modules: {
  }
})