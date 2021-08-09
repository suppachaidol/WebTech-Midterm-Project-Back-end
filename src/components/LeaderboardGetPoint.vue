<template>
  <div>
      <div class="form_find_get">
          วันที่
          <input class="input_date_get" v-model="form.day" type="date">
          เวลา
          <input class="input_time_get" v-model="form.time" type="time">
          <button class="find_get" @click="find()">ค้นหา</button>
          <button class="restore_get" @click="restore()">คืนค่า</button>

      </div>
      
      <table>
          <thead>
              <tr class="thead_get">
                  <td>Username</td>
                  <td>แต้มที่ได้</td>
                  <td>เวลาที่ได้แต้ม (ปี-เดือน-วัน ชั่วโมง:นาที)</td>
              </tr>
          </thead>
          <tbody > 
              <tr v-for="(histo,index) in history_change_date" :key="index">
                  <td>{{histo.name}}</td>
                  <td>{{histo.point}}</td>
                  <td>{{histo.date+" "+histo.time}}</td>
              </tr>


          </tbody>
      </table>
  </div>
</template>

<script>
import GetHistoriesStore from '@/store/GetHistories'
export default {
    data(){
        return{
            form:{
                day:"",
                time:"",
                key:""
            },
            history:[],
            history_change_date:[],
            
            keepdata:[]
        }
    },
    created(){
        this.fetchHistory()
          
    },
    methods:{
        async fetchHistory(){
            await GetHistoriesStore.dispatch("fetchHistory")
            await GetHistoriesStore.dispatch("getHistory")
            
            this.history = GetHistoriesStore.getters.history
            GetHistoriesStore.dispatch("sortPoint","0")
            this.history_change_date=GetHistoriesStore.getters.keepHistory     
        },
        async find(){

            if(this.form.day!== "" && this.form.time!== ""){
                this.form.key=0
            GetHistoriesStore.dispatch("findDate",this.form)
            GetHistoriesStore.dispatch("sortPoint","1")
            console.log(GetHistoriesStore.getters.findkeep)
            if(GetHistoriesStore.getters.findkeep.length===0){
                this.$swal("Find Fail", "ไม่พบวันที่และเวลาที่คุณค้นหา", "error")
            }
            else{
                this.history_change_date=GetHistoriesStore.getters.findkeep
            }
            
            
            
            }
            else if(this.form.day==="" && this.form.time!== ""){
                this.$swal("Find Fail", "กรุณาใส่วันที่ที่ต้องการค้นหา", "error")
                

            }
            else if(this.form.day!== ""&&this.form.time===""){
                this.form.key=1
                 GetHistoriesStore.dispatch("findDate",this.form)
                GetHistoriesStore.dispatch("sortPoint","1")
                console.log(GetHistoriesStore.getters.findkeep)
                if(GetHistoriesStore.getters.findkeep.length===0){
                    this.$swal("Find Fail", "ไม่พบวันที่ที่คุณค้นหา", "error")
                }
                else{
                    this.history_change_date=GetHistoriesStore.getters.findkeep
                }
            }
            else if(this.form.day==="" &&this.form.time===""){
                this.$swal("Find Fail", "กรุณาใส่วันที่และเวลาหรือวันที่ที่ต้องการค้นหา", "error")
            }
            this.form={
                day:"",
                time:"",
                key:""
            }
            
            
            
        },
        restore(){
            
            this.history_change_date=GetHistoriesStore.getters.keepHistory
            

        }
}
}

    


</script>

<style>
.input_date_get{
    width: 200px;
    /* margin: 20px 0px 0px 250px; */
}
.find_get,.restore_get{
    padding: 5px;
    margin: 5px;
    background-color:whitesmoke; 
    color:black; 
    border: 2px solid #694306;
    border-radius:5px ;
}
.find_get:hover,.restore_get:hover{
    background-color: #694306;
    color: white;

}
.form_find_get{
    
    margin: 0px 0px 0px 560px;
}
.thead_get{
    color: whitesmoke;
    background-color: #694306;
}
th {
  padding: 40px;
  border: 2px solid black;
}
td {
  padding: 10px;
  text-align: center;
  border: 2px solid black;
}
table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>