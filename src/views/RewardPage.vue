<template>
  <div>
    <div class="banner_reward"></div>
    <div class="word_reward">
      <h1>รางวัลสุดพิเศษ</h1>
    </div>

    <div>
      <table>
        <thead>
          <tr class="thead_R">
            <th>รางวัล</th>
            <th>คงเหลือ</th>
            <th>คะแนนในการแลก</th>
            <th v-if="isAuthen()">แลกของรางวัล</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rew, index) in rewards" :key="index">
            <td>{{ rew.name }}</td>
            <td>{{ rew.quantity }}</td>
            <td>{{ rew.points_use }}</td>
            <td v-if="isAuthen()"><router-link
                class="get"
                :to="{ name: 'GetReward', params: { id: rew.id } }"
                >แลก</router-link
              ></td>
            <td v-if="isAdmin()">
              <router-link
                class="edit"
                :to="{ name: 'EditReward', params: { id: rew.id } }"
                >แก้ไข</router-link
              >
            </td>
            <td v-if="isAdmin()">
              <router-link
                class="delete"
                :to="{ name: 'DeleteReward', params: { id: rew.id } }"
                >ลบ</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="router_add">
      <router-link class="add" v-if="isAdmin()" to="/addreward">เพิ่มของรางวัล</router-link>
    </div>
    
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import RewardStore from "@/store/Reward";
export default {
  data() {
    return {
      rewards: [],

      form: {
        name: "",
        quantity: "",
        points_use: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await RewardStore.dispatch("fetchData");
      this.rewards = RewardStore.getters.rewards;
    },

    isAuthen() {
        return AuthUser.getters.isAuthen
    },

    isAdmin() {
      if (AuthUser.getters.user.role !== undefined) {
        if (AuthUser.getters.user.role.name === "Admin") {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  
  },
};
</script>

<style>
.thead_R{
  background-color: rgb(25, 25, 202) ;
  color:rgb(255, 255, 255);
}
.banner_reward {
  background-image: url("../assets/gift.jpg");
  background-position: center;
  width: 100%;
  height: 300px;
  filter: blur(5px);
}
.word_reward{
  position: absolute;
  border: 3px solid skyblue;
  background-color: rgba(0, 0, 0, 0.4);
  color: beige;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  width: 40%;
  height: 10%;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
}
h1 {
  font-size: 4em;
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
.edit, .delete, .get {
  text-decoration-line: none;
  color:blue;

}
.edit:hover, .delete:hover, .get:hover 
{
 color: rgb(103, 4, 216); 
}
/* .add {
  margin-left: 45%;
  font-size: 1.5em;
  padding: 20px;
  text-decoration-line: none;
  
} */
.add{
  display: inline-block;
  margin: 0px 0px 50px 0px;
  text-decoration-line: none;
    font-size: 1.5em;
    padding: 5px;
    /* margin: 20px 0px 0px 500px; */
    background-color:whitesmoke; 
    color:black; 
    border: 2px solid rgb(31, 31, 209);
    border-radius:5px ;
}
.add:hover{
    background-color: rgb(55, 55, 255);
    color: white;

}
.router_add{
  flex-flow: row wrap;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
}
</style>