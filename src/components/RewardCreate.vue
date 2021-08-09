<template>
  <div>
      <h1 class="addreward">เพิ่มของรางวัล</h1>
      <div class="addform">
          <div>
              <label for="name">ของรางวัล</label>
              <input class="in" type="text" v-model="form.name">
          </div>

          <div>
              <label for="name_jp">จำนวน</label>
              <input class="in" type="number" v-model="form.quantity">
          </div>

          <div>
              <label for="type">คะแนนในการแลก</label>
              <input class="in" type="number" v-model="form.points_use">
          </div>

          <div>
              <button class="ad" @click="addReward">เพิ่ม</button>
          </div>
      </div>
  </div>
</template>

<script>
import RewardStore from '@/store/Reward'
export default {
    data() {
        return {
            form: {
                name: '',
                quantity: '',
                points_use: ''
            }
        }
    },
    methods: {
        clearForm() {
            this.form = {
                name: '',
                quantity: '',
                points_use: ''
            }
        },
        async addReward() {
            let payload = {
                name: this.form.name,
                quantity: this.form.quantity,
                points_use: this.form.points_use 
            }
            let res = await RewardStore.dispatch("addReward", payload)
            if(res.success){
                this.clearForm()
                this.$router.push("/reward")
            }else{
                this.$swal("Add Failed", res.message,"error")
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.addreward{
    border: 3px solid wheat;
    background-color: rgba(0,0,0, 0.6);
    color: beige;
    font-weight: bold;
    border-radius: 20px;
    width: 50%;
    padding: 10px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
.in{
    margin-left: 5px;
    margin-top: 20px;
}
.addform{
    text-align: center;
    border: tomato solid 5px;
    padding: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 1.2em;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 30px;
}
.ad{
    margin-top: 20px;
    font-size: 1em;
    font-weight: bold;
    background-color: sandybrown;
    color: beige;
    text-decoration: none;
    border-radius: 28px;
    border: 1px solid beige;
    padding: 10px 20px;
    text-align: center;
}
label, input{
    font-size: 1.2em;
}
input {
        background-color: beige;
        border: 1px solid beige;
        color: black;
        font-weight: bold;
        border-radius: 20px;
        width: 40%;
        text-align: center;
        padding-top: 10px;
        margin-left: 60px;
        height: 30px;
    }


</style>