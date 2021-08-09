<template>
  <div>
    <div class="top_leaderboard">
      <div class="word_leaderboard">
      <h1>Leaderboard</h1>
    </div>
    </div>
    

    <h2 class="text_L">ข้อมูลการได้แต้มของผู้ใช้</h2>
    <br>
    <leaderboard-get-point></leaderboard-get-point>
    <dir class="router_form_use">
      <router-link class="router_use" to="/leaderboard/use">ดูข้อมูลการใช้แต้มของผู้ใช้</router-link>
    </dir>
    
    

  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
import LeaderboardGetPoint from '@/components/LeaderboardGetPoint.vue'
export default {
  components:{

    LeaderboardGetPoint
    
  },
  mounted() {
    if (!this.isAuthen()) {
      this.$swal("Restricted Area", "You have no permission", "warning")
      this.$router.push("/")
    }
    if (!this.isAdmin()) {
      this.$swal("Restricted Area", "You have no permission", "warning")
      this.$router.push("/")
    }
  },
  methods: {
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
  }

}
</script>

<style lang="scss" scoped>
  .text_L{
    text-align: center;
    font-size: 30px;
    margin: 50px 0px 10px 0px;
  }
  .router_form_use{
    flex-flow: row wrap;
    display: flex;
    align-content: center;
    justify-content: space-evenly;

  }
.router_use:link, .router_use:visited{
  /* box-shadow: 4px 6px #888888; */
  border-radius: 5px;
  padding: 10px 30px;
  text-align: center;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  background-color: #694306;
  color: #fff3e0;
  /* border: 2px solid black; */
  
  text-decoration: none;
  display: inline-block;
  margin: 0px 0px 50px 0px;
  
}
.router_use:hover ,.router_use:active{
  box-shadow: 4px 9px #888888;
  background-color:#fdbc54;

  color: #694306;
}
.top_leaderboard {
  background-image: url("../assets/banner.jpg");
  background-position: center;
  width: 100%;
  height: 300px;
  filter: blur(5px);
}
.word_leaderboard{
  position: absolute;
  border: 3px solid rgba(255, 255, 255, 0.623);
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
  border-radius: 10px;
}
h1 {
  font-size: 4em;
}

</style>