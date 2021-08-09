<template>
  <div class="page">
    <div class="top">
        <h1>สมัครเป็นสมาชิกกับ ChaKaiMook</h1>
        <h2>เพื่อรับสิทธิประโยชน์มากมาย</h2>
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

          <div class="box">
              <button class="btn" type="submit">ยืนยัน</button>
          </div>
      </form>
    </div>

    <footer />
  </div>
</template>

<script>
// import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'

export default {
    data() {
        return {
            form: {
                username: "",
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
    .page {
        background-color: #f5e6e8;
        padding-top: 50px;
    }

    .top {
        color: #2c3e50;
        background-color: whitesmoke;
        font-weight: bold;
        width: 50%;
        height: 10%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-radius: 30px;
        border: 3px solid #156064;

        h1 {
            padding-top: 20px;
            padding-bottom: 10px;
        }

        h2 {
            padding-top: 10px;
            padding-bottom: 20px;
        }
    }

    .container {
        background-color: whitesmoke;
        border: 3px solid #156064;
        border-radius: 30px;
        text-align: left;
        padding: 20px;
        margin-top: 50px;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    .content {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        // display: grid;
        // grid-template-columns: 1fr 1fr;
        // height: 30px;
        input{
            padding: 10px 20px 10px 10px;
            margin: 10px;
            width: 40%;
        }
    }

    label {
        background-color: #156064;
        color: beige;
        border-radius: 30px;
        width: 20%;
        text-align: center;
        padding: 10px 5px 10px 5px;
        margin: 10px 5px 10px 5px;
        // padding-top: 6px;
        // margin-left: 60px
    }

    .box {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        // width: 80%;
        // height: 50px;
        // margin: auto;
        // padding: auto;
        // text-align: right;
        // margin-bottom: 20px;
    }

    .btn {
        text-align: center;
        width: 20%;
        margin: 20px;
        // margin-left: auto;
        // margin-right: auto;
        // margin-top: 10px;
        // left: 500px;
        font-weight: bold;
        font-size: 1.2em;
        background-color: #156064;
        border-radius: 30px;
        color: beige;
        text-decoration: none;
        border: 1px solid beige;
        padding: 10px 10px 10px 10px;

        &:hover {
        background-color: sandybrown;
        cursor: pointer;
      }
    }

    footer {
        background-color: #2c3e50;
        height: 90px;
        margin-top: 100px;
    }

</style>