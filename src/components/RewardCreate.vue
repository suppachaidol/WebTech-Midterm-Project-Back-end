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

<style lang="scss">
.addreward{
    text-align: center;
    margin-top: 20px;
    font-size: 2em;
}
.in{
    margin-left: 5px;
    margin-top: 20px;
}
.addform{
    text-align: center;
    border: 3px solid #333;
    padding: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 1.2em;
}
.ad{
    margin-top: 20px;
    font-size: 1em;
}


</style>