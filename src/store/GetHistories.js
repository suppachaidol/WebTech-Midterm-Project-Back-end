import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const api_endpoint = process.env.VUE_APP_CHAKAIMOOK_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      history:[],
      keepHistory:[],
      findkeep:[]

  },
  getters:{
      history: (state)=> state.history,
      keepHistory: (state)=>state.keepHistory,
      findkeep:(state)=> state.findkeep
      
  },
  mutations: {
      fetch(state,{res}){
          state.history=res.data
          
      },
      historyKeep(state){
        const historychange = state.history.map(item => {
            const updated = new Date(item.updated_at)
            let date=updated.getDate()
            let month=updated.getMonth()
            
            if(updated.getDate()<10){
                date="0"+updated.getDate()
            }
            if(updated.getMonth()+1<10){
                let mon=updated.getMonth()+1
                month="0"+mon
            }
            const getHistory = {
                name : item.name,
                point : item.get_points,
                date : `${updated.getFullYear()}-${month}-${date}`,
                time: `${updated.getHours()}:${updated.getMinutes()}`
            }
            return getHistory
        })
        state.keepHistory=historychange
        
      },
      find(state,payload){
        //   console.log({date,time})
        state.findkeep=[]
        let count=0;
        for(let i=0;i<state.keepHistory.length;i++){
            // const findDay=payload.date+" "+payload.time
            // console.log(findDay)
            if(state.keepHistory[i].date===payload.date){
                if(state.keepHistory[i].time===payload.time){
                    state.findkeep[count]=state.keepHistory[i]
                    count++;
                }
                
            }
        }
      },
      sort(state,keysort){
          console.log(state.findkeep)
          if(keysort==="0"){
              state.keepHistory.sort((a,b)=>(a.point<b.point) ? 1 : ((b.point < a.point) ? -1:0))
          }
          else if(keysort==="1"){

            state.findkeep.sort((a,b)=>(a.point<b.point) ? 1 : ((b.point < a.point) ? -1:0))
          }
          

      }


  },
  actions: {
      async fetchHistory({commit}){
          let res=await Axios.get(api_endpoint+"/get-histories")
        //   console.log(res)
          commit("fetch",{res})
      },
      getHistory({commit}){
          commit("historyKeep")
      },
      findDate({commit},payload){
          let data={
              date: payload.day,
              time: payload.time    
            }

          commit("find",data)
      },
      sortPoint({commit},keysort){

          
          commit("sort",keysort)

      }

  },
  modules: {
  }
})