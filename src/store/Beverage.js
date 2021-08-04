import Vue from 'vue'
import Vuex from 'vuex'
import Json from '/data.json'

// let external_data =
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: Json.data || [],
  },

  getters: {
    prod: (state) => state.data
  },

  mutations: {
    fetch(state, res) {
      state.data = res
    }
  },

  actions: {
    // async fetchData({ commit }) {
    //   let res = await

    //   commit("fetch", res)
    // }
  },

  modules: {
  }
})