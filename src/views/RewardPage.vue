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
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rew, index) in rewards" :key="index">
          <td>{{rew.name}}</td>
          <td>{{rew.quantity}}</td>
          <td>{{rew.points_use}}</td>
          <td><button>แลก</button></td>
          <td><button>แก้ไข</button></td>
          <td><button>ลบ</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="add"><button>เพิ่มของรางวัล</button></div>
</div>
</template>

<script>
import RewardStore from '@/store/Reward'
export default {
  data() {
    return {
      rewards: [],

      editIndex: -1,

      form:{
                name: "",
                quantity: "",
                points_use: "",
            }
    }
    
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await RewardStore.dispatch("fetchData")
      this.rewards = RewardStore.getters.rewards
    }
  }

}
</script>

<style>
.banner {
    background-image: url('../assets/gift.jpg');
    background-position: center;
    width: 100%;
    height: 300px;
    filter: blur(5px);
  }
.word {
    position: absolute;
    border: 3px solid skyblue;
    background-color: rgba(0,0,0, 0.4);
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
  h1{
    font-size: 3em;
  }

th{
    padding: 40px;
    border: 2px solid black;
}
td{
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

.add{
  text-align: center;
  margin-bottom: 30px;
}

</style>