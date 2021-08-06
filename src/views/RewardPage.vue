<template>
  <div>
    <div class="banner"></div>
    <div class="word">
      <h1>รางวัลสุดพิเศษ</h1>
    </div>

    <div>
      <table>
        <thead>
          <tr>
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
            <td v-if="isAuthen()">
              <router-link
                class="edit"
                :to="{ name: 'EditReward', params: { id: rew.id } }"
                >แก้ไข</router-link
              >
            </td>
            <td v-if="isAuthen()">
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
    <router-link class="add" v-if="isAuthen()" to="/addreward"
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


  },
};
</script>

<style>
.banner {
  background-image: url("../assets/gift.jpg");
  background-position: center;
  width: 100%;
  height: 300px;
  filter: blur(5px);
}
.word {
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
}
.add {
  margin-left: 45%;
  font-size: 1.5em;
  padding: 20px;
  text-decoration-line: none;
}
</style>