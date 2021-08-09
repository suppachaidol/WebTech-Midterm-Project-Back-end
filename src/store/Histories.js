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
            let month=updated.getMonth()+1
            let hours=updated.getHours()
            let minutes=updated.getMinutes()
            
            if(+date<10 || +date===0){
                date="0"+date
            }
            if(+month<10 || +month===0){
                
                month="0"+month
            }
            if(+hours<10 ||+hours===0){
                hours="0"+hours
                
            }
            if(+minutes<10||+minutes===0){
                minutes="0"+minutes
            }
            const getHistory = {
                name : item.name,
                reward_name : item.reward_name,
                point : item.points_use,
                date : `${updated.getFullYear()}-${month}-${date}`,
                time: `${hours}:${minutes}`
            }
            return getHistory
        })
        state.keepHistory=historychange
        
      },
      find(state,payload){
        state.findkeep=[]
        let count=0;
        for(let i=0;i<state.keepHistory.length;i++){
            // const findDay=payload.date+" "+payload.time
            // console.log(findDay)
            if(payload.key===0){
            if(state.keepHistory[i].date===payload.date){
                if(state.keepHistory[i].time===payload.time){
                    state.findkeep[count]=state.keepHistory[i]
                    count++;
                }
                
            }
        }
        else if(payload.key===1){
            if(state.keepHistory[i].date===payload.date){
                    state.findkeep[count]=state.keepHistory[i]
                    count++;
                
                
            }
        }
        }
        
      },
      sort(state,keysort){
        //   console.log(state.findkeep)
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
          let res=await Axios.get(api_endpoint+"/histories")
        //   console.log(res)
          commit("fetch",{res})
      },
      getHistory({commit}){
          commit("historyKeep")
      },
      findDate({commit},payload){
        let data={
            date: payload.day,
            time: payload.time,  
            key:  payload.key
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