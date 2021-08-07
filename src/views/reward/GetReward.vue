<template>
<div>
    <h1 class="getreward">แลกของรางวัล</h1>
      <div class="getform">
        <div>
            <label class="la1" for="name">ของรางวัล</label>
            {{form.name}}
        </div>

        <div>
            <label class="la2" for="quantity">จำนวนคงเหลือ</label>
            {{form.quantity}}
        </div>

        <div>
            <label class="la3" for="points_use">คะแนนในการแลก</label>
            {{form.points_use}}
        </div>

        <div>
            <button class="get" @click="getReward()">แลก</button>
        </div>
      </div>
</div>
</template>

<script>
import RewardService from "@/services/RewardService"
import RewardStore from '@/store/Reward'
import AuthUser from "@/store/AuthUser"
import UserService from "@/services/UserService"
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
    methods:{
        async getReward() {
            let user = await UserService.getUserById(AuthUser.getters.user.id)
            let payload = {
                id: this.id,
                quantity: this.form.quantity - 1,

                user_id: user.id,
                total_points: user.total_points - this.form.points_use,
                points_use: user.points_use + this.form.points_use,

                name: user.username,
                reward_name: this.form.name,
                points_use_history: this.form.points_use
            }
            console.log(user.total_points)
            if(payload.total_points >= 0){
                let res = await RewardStore.dispatch("getReward", payload)

                if(res.success){
                    this.$router.push("/reward")
                }
                else{
                    this.$swal("Get Failed", res.message,"error")
                }
            }
            else{
                this.$swal("Points not enough")
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.getreward{
    text-align: center;
    margin-top: 20px;
    font-size: 2em;
}
.getform{
    text-align: center;
    border: 3px solid #333;
    padding: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 1.2em;
}
.la1, .la2, .la3{
    margin-top: 20px;
}
.get{
    margin-top: 20px;
    font-size: 1em;
}

</style>