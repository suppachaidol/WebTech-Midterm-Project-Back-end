import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
let api_endpoint = process.env.VUE_APP_CHAKAIMOOK_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters:{
    histories: (state) => state.data
  },
  mutations: {
    fetch(state, {res}){
        state.data = res.data
    },
  },
  actions: {
    async fetchData({ commit }){
        let res = await Axios.get(api_endpoint + "/histories")
      
        commit('fetch', {res})
    },
  },
  modules: {
  }
})