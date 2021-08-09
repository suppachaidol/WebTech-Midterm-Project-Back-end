<template>
  <div>
    <div class="bannerReward"></div>
    <div class="wordReward">
      <h1 class="reward">รางวัลสุดพิเศษ</h1>
    </div>

    <div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>รางวัล</th>
            <th>คงเหลือ</th>
            <th>คะแนนในการแลก</th>
            <th v-if="isAuthen()">แลกของรางวัล</th>
            <th v-if="isAdmin()">แก้ไข</th>
            <th v-if="isAdmin()">ลบ</th>
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
      <br>
    </div>
    <router-link class="add" v-if="isAdmin()" to="/addreward"
      >เพิ่มของรางวัล</router-link
    >
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

<style lang="scss" scoped>
.bannerReward {
  background-image: url("../assets/gift.jpg");
  background-position: center;
  width: 100%;
  height: 300px;
  filter: blur(5px);
}
.wordReward {
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
}
.reward {
  font-size: 4em;
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
    background-color: skyblue;
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
    border-bottom: 2px solid skyblue;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color:skyblue;
}

.edit, .delete, .get {
  text-decoration-line: none;
}
.add {
  margin-left: 46%;
  margin-top: 20px;
  font-size: 1.3em;
  padding: 20px;
  text-decoration-line: none;
  background-color:skyblue;
  color: black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 20%;
}
.add:hover{
  background-color: beige;
  cursor: pointer;
}

</style>