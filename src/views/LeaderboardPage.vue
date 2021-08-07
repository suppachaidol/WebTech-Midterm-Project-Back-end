<template>
  <div>
    <div class="top">
      <h1>Leaderboard</h1>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"

export default {
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
  .top {
    color: #2c3e50;
    font-weight: bold;
    left: 50%;
    width: 50%;
    height: 10%;
    padding: 10px;
    margin: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
</style>