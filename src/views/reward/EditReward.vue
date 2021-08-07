<template>
  <div>
      <h1 class="editReward">แก้ไขของรางวัล</h1>
      <div class=editform>
        <div>
            <label for="name">ของรางวัล</label>
            <input v-model="form.name" type="text">
        </div>

        <div>
            <label for="quantity">จำนวน</label>
            <input v-model="form.quantity" type="number">
        </div>

        <div>
            <label for="points_use">คะแนนในการแลก</label>
            <input v-model="form.points_use" type="number">
        </div>

        <div>
            <button class="edit" @click="editReward()">แก้ไข</button>
        </div>
      </div>
  </div>
</template>

<script>
import RewardService from "@/services/RewardService"
import RewardStore from '@/store/Reward'
import AuthUser from "@/store/AuthUser"
export default {
    data(){
        return{
            id: '',
            form: {
                name: '',
                quantity: '',
                points_use: ''
            },
        }
    },
    async created(){
        this.id = this.$route.params.id
        let reward = await RewardService.getRewardById(this.id)
        console.log(reward)
        this.form.name = reward.name
        this.form.quantity = reward.quantity
        this.form.points_use = reward.points_use
    },
    mounted(){
        if(!this.isAuthen()){
            this.$swal("Restricted Area", "You have no permission", "warning")
            this.$router.push("/reward")
        }
    },
    methods:{
    async editReward() {
            let payload = {
                id: this.id,
                name: this.form.name,
                quantity: this.form.quantity,
                points_use: this.form.points_use 
            }
            let res = await RewardStore.dispatch("editReward", payload)
            if(res.success){
                
                this.$router.push("/reward")
            }else{
                this.$swal("Edit Failed", res.message,"error")
            }
        },

        isAuthen(){
            if(AuthUser.getters.user.role.name === "Admin")
                return AuthUser.getters.isAuthen
        }
    }

}
</script>

<style lang="scss" scoped>
.editReward{
    text-align: center;
    margin-top: 20px;
    font-size: 2em;
}
input{
    margin-left: 5px;
    margin-top: 20px;
}
.editform{
    text-align: center;
    border: 3px solid #333;
    padding: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
.edit{
    margin-top: 20px;
    font-size: 1em;
}
label, input{
    font-size: 1.2em;
}
</style>