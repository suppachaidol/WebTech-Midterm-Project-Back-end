<template>
<div>
    <h1 class="getreward">แลกของรางวัล</h1>
      <div class="getform">
        <div class="la1">
            <label for="name">ของรางวัล</label>
            {{form.name}}
        </div>

        <div class="la2">
            <label for="quantity">จำนวนคงเหลือ</label>
            {{form.quantity}}
        </div>

        <div class="la3">
            <label for="points_use">คะแนนในการแลก</label>
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
                if(this.form.quantity > 0){
                    let res = await RewardStore.dispatch("getReward", payload)
                    if(res.success){
                        this.$swal("แลกของรางวัลสำเร็จ","","success")
                        this.$router.push("/reward")
                    }
                    else{
                        this.$swal("Get Failed", res.message,"error")
                    }
                }
                else{
                    this.$swal("ของรางวัลไม่เพียงพอ","","error")
                    this.$router.push("/reward")
                }
            }
            else{
                this.$swal("แต้มคงเหลือไม่เพียงพอ","","error")
                this.$router.push("/reward")
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.getreward{
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
.getform{
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
.la1, .la2, .la3{
    margin-top: 20px;
    font-size: 1.3em;
}
.get{
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