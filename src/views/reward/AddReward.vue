<template>
  <div>
      <reward-create></reward-create>
  </div>
</template>

<script>
import RewardCreate from '@/components/RewardCreate.vue'
import AuthUser from "@/store/AuthUser"
export default {
  components: { RewardCreate },

  mounted(){
        if(!this.isAuthen()){
            this.$swal("Restricted Area", "You have no permission", "warning")
            this.$router.push("/reward")
        }

    },
    methods:{
        isAuthen(){
            if(AuthUser.getters.user.role.name === "Admin")
                return AuthUser.getters.isAuthen
        }
    }

}
</script>

<style lang="scss" scoped>

</style>