<template>
  <div>
      <div class="form_find_use">
          วันที่
          <input v-model="form.day" type="date">
          เวลา
          <input v-model="form.time" type="time">
          <button class="find_use" @click="find()">ค้นหา</button>
          <button class="restore_use" @click="restore()">คืนค่า</button>
      </div>
      

      
      <table>
          <thead>
              <tr class="thead_ues">
                  <td>Username</td>
                  <td>ชื่อของที่แลก</td>
                  <td>แต้มที่ใช้</td>
                  <td>เวลาที่ใช้แต้ม (ปี-เดือน-วัน ชั่วโมง:นาที)</td>
              </tr>
          </thead>
          <tbody > 
              <tr v-for="(histo,index) in history_change_date" :key="index">
                  <td>{{histo.name}}</td>
                  <td>{{histo.reward_name}}</td>
                  <td>{{histo.point}}</td>
                  <td>{{histo.date+" "+histo.time}}</td>
              </tr>


          </tbody>
      </table>

  </div>
</template>

<script>
import UseHistoriesStore from '@/store/Histories'
export default {
    data(){
        return{
            form:{
                day:"",
                time:"",
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
            await UseHistoriesStore.dispatch("fetchHistory")
            await UseHistoriesStore.dispatch("getHistory")
            this.history = UseHistoriesStore.getters.history
            UseHistoriesStore.dispatch("sortPoint","0")
            this.history_change_date=UseHistoriesStore.getters.keepHistory     
        },
        async find(){
            if(this.form.day!== "" && this.form.time!== ""){
            UseHistoriesStore.dispatch("findDate",this.form)
            UseHistoriesStore.dispatch("sortPoint","1")
            console.log(UseHistoriesStore.getters.findkeep)
            if(UseHistoriesStore.getters.findkeep.length===0){
                this.$swal("Find Fail", "ไม่พบวันที่และเวลาที่คุณค้นหา", "error")
            }
            else{
                this.history_change_date=UseHistoriesStore.getters.findkeep
            }
            
            
            
            }
            else if(this.form.day==="" && this.form.time!== ""){
                this.$swal("Find Fail", "กรุณาใส่วันที่ที่ต้องการค้นหา", "error")
                

            }
            else if(this.form.day!== ""&&this.form.time===""){
                this.$swal("Find Fail", "กรุณาใส่เวลาที่ต้องการค้นหา", "error")
            }
            else if(this.form.day==="" &&this.form.time===""){
                this.$swal("Find Fail", "กรุณาใส่วันที่และเวลาที่ต้องการค้นหา", "error")
            }
            this.form={
                day:"",
                time:"",
            }
            
            
        },
        restore(){
            this.history_change_date=UseHistoriesStore.getters.keepHistory

        }
}
}

    


</script>

<style>
.input_date_use{
    /* padding: 20px; */
    width: 200px;
    /* margin: 20px 0px 0px 250px; */
}
.input_time_use{
    width: 60px;
}
.find_use,.restore_use{
    padding: 5px;
    margin: 5px;
    background-color:whitesmoke; 
    color:black; 
    border: 2px solid #694306;
    border-radius:5px ;
}
.find_use:hover,.restore_use:hover{
    background-color: #694306;
    color: white;

}
.form_find_use{
    margin: 0px 0px 0px 560px;
}
.thead_ues{
    color: whitesmoke;
    background-color: #694306;
}
</style>