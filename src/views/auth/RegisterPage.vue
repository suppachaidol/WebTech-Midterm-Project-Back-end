<template>
  <div>
    <div class="top">
        <h1>Registration</h1>
    </div>
      
    <div class="container">
      <form @submit.prevent="register">
          <div class="content">
              <label for="username">Username</label>
              <input v-model="form.username" type="text" autocomplete="off" placeholder="username">
          </div>

          <div class="content">
              <label for="email">Email</label>
              <input v-model="form.email" type="text" autocomplete="off" placeholder="email">
          </div>

          <div class="content">
              <label for="password">Password</label>
              <input v-model="form.password" type="password" autocomplete="off">
          </div>

          <div class="btn">
              <button type="submit">Register</button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
// import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'

export default {
    data() {
        return {
            form: {
                usernamr: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async register() {
            // let res = await AuthService.register(this.form)
            let res = await AuthUser.dispatch("register", this.form)
            if (res.success) {
                this.$swal("Register Success", `Welcome, ${res.user.username}`, "success")
                this.$router.push("/")
            } else {
                this.$swal("Register Failed", res.message, "error")
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

    .container {
        border: 3px solid #333;
        text-align: left;
        padding: 20px;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .btn {
        text-align: center;
        width: 20%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
    }

</style>