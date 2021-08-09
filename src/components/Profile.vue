<template>
  <div>
      <div class="profilediv">
        <label class="profilelable1">Username: {{form.username}}</label>
        <br>
        <label class="profilelable2">Email: {{form.email}}</label>
        <br>
        <label class="profilelable3">Point Total: {{form.total_points}}</label>

      </div>
      <h1 class="getPoint">ประวัติการได้แต้ม</h1>
      <div>
          <table class="styled-table">
              <thead>
                  <tr>
                      <th>ชื่อผู้ใช้</th>
                      <th>แต้มที่ได้รับ</th>
                      <th>วันที่ได้รับ</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(getHis, index) in getHistories" :key="index">
                      <td v-if="checkUser(getHis.name)">{{getHis.name}}</td>
                      <td v-if="checkUser(getHis.name)">{{getHis.get_points}}</td>
                      <td v-if="checkUser(getHis.name)">{{getHis.created_at.slice(0,10)}}</td>
                  </tr>
              </tbody>
          </table>
          <h1 class="getReward">ประวัติการแลกของรางวัล</h1>
          <table class="styled-table">
              <thead>
                  <tr>
                    <th>ชื่อผู้ใช้</th>
                    <th>ของรางวัล</th>
                    <th>แต้มที่ใช้</th>
                    <th>วันที่แลก</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(his, index) in histories" :key="index">
                      <td v-if="checkUser(his.name)">{{his.name}}</td>
                      <td v-if="checkUser(his.name)">{{his.reward_name}}</td>
                      <td v-if="checkUser(his.name)">{{his.points_use}}</td>
                      <td v-if="checkUser(his.name)">{{his.created_at.slice(0,10)}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    

  </div>

</template>

<script>
import AuthUser from '@/store/AuthUser'
import GetHistoriesStore from '@/store/GetHistories'
import HistoriesStore from '@/store/Histories'
import UserService from "@/services/UserService"
export default {
  data() {
        return {
            getHistories:[],

            histories:[],

            form: {
                username: "",
                email: "",
                total_points: ""
            },
        }
    },
    async created(){
        let user = await UserService.getUserById(AuthUser.getters.user.id)
        this.fetchData()
        console.log(AuthUser.getters.user)
        this.form.username=AuthUser.getters.user.username
        this.form.email=AuthUser.getters.user.email
        if(user.total_points===null){
            this.form.total_points="0"
        }
        else{
            this.form.total_points=user.total_points
        }
        
    },
    methods:{
        async fetchData() {
            await GetHistoriesStore.dispatch("fetchHistory");
            this.getHistories = GetHistoriesStore.getters.history;

            await HistoriesStore.dispatch("fetchHistory");
            this.histories = HistoriesStore.getters.history;
        },
        checkUser(name){
            if(name === AuthUser.getters.user.username){
                return true   
            }
            else{
                return false
            }
        }

    }

}
</script>

<style lang="scss" scoped>

div.profilediv{
    padding: 10px 10px 10px 50px;
    margin: 60px;
    border:rgb(110, 107, 81) groove 5px;
    border-radius: 5px;
    /* border-color: ; */
    background: lemonchiffon;
}
label.profilelable1{
    font-family: 'Trebuchet MS','sans-serif';
    font-size: 24px;
    font-weight: bold;

}
label.profilelable2{
    font-family: 'Trebuchet MS','sans-serif';
    font-size: 24px;
    font-weight: bold;
    
}
label.profilelable3{
    font-family: 'Trebuchet MS','sans-serif';
    font-size: 24px;
    font-weight: bold;
}
h1.getPoint, h1.getReward{
    text-align: center;
    margin: 50px;
    font-family: 'Trebuchet MS','sans-serif';
}

.styled-table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: lemonchiffon;
    color: black;
    text-align: left;
}
.styled-table th, .styled-table td {
    padding: 12px 15px;
    text-align: center;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid lemonchiffon;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: lemonchiffon;
}

</style>