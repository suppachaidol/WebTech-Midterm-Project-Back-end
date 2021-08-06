<template>
  <div>
      <h1 class="dereward">ลบของรางวัล</h1>
      <div class="deform">
        <div class="name">
            <label for="name">ของรางวัล</label>
            {{form.name}}
        </div>

        <div class="quantity">
            <label for="quantity">จำนวน</label>
            {{form.quantity}}
        </div>

        <div class="ptu">
            <label for="points_use">คะแนนในการแลก</label>
            {{form.points_use}}
        </div>

        <div>
            <button class="de" @click="deleteReward()">ลบ</button>
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
        async deleteReward() {
            let payload = {
                id: this.id, 
            }
            let res = await RewardStore.dispatch("deleteReward", payload)
            if(res.success){
                
                this.$router.push("/reward")
            }else{
                this.$swal("Delete Failed", res.message,"error")
            }
        },
        isAuthen(){
            if(AuthUser.getters.user.role.name === "Admin")
                return AuthUser.getters.isAuthen
        },
    }

}
</script>

<style lang="scss" scoped>
.dereward{
    text-align: center;
    margin-top: 20px;
    font-size: 2em;
}
.deform{
    text-align: center;
    border: 3px solid #333;
    padding: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 1.2em;
}

.name, .quantity, .ptu{
    margin-top: 20px;
}
.de{
    margin-top: 20px;
    font-size: 1em;
}


</style>