<template>
  <div class="page">
      <div class="container">
        <div class="top">
            <h1>เข้าสู่ระบบ</h1>
        </div>

        <form @submit.prevent="login">
            <div class="content">
                <label class="lable_login" for="email">Email</label>
                <input v-model="form.email" type="text" placeholder="email@chakaimook.org" autocomplete="off">
            </div>

            <div class="content">
                <label class="lable_login" for="password">Password</label>
                <input v-model="form.password" type="password" autocomplete="off">
            </div>

            <div class="box">
                <button class="btn">ยืนยัน</button>
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
                email: "",
                password: "",
            }
        }
    },
    methods: {
        async login() {
            // let res = await AuthService.login(this.form)
            let res = await AuthUser.dispatch("login", this.form)
            if (res.success) {
                this.$swal("Login Success", `Welcome, ${res.user.username}`, "success")
                this.$router.push('/')
            } else {
                this.$swal("Login failed", res.message, "error")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .page {
        background-color: #bbb5bd;
        padding: 1px 1px 65px 1px;
    }
    .container {
        background-color: #3f4045;
        border: 3px solid beige;
        border-radius: 30px;
        text-align: left;
        padding: 20px;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 70px;
        
    }

    .top {
        color: beige;
        font-weight: bold;
        // left: 50%;
        // width: 20%;
        padding: 20px;
        margin: 20px;
        // display: block;
        // margin-left: auto;
        // margin-right: auto;
        text-align: center;
    }        

    .content {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        // grid-template-columns: 1fr 1fr;
        // height: 30px;
        input{
        width: 50%;
        margin: 15px;
        padding: 10px 10px 10px 10px;
    }
    }

    .lable_login {
        background-color: #424b54;
        border: 1px solid beige;
        color: beige;
        font-weight: bold;
        border-radius: 30px;
        width: 20%;
        text-align: center;
        padding: 10px;
        // padding-top: 10px;
        
        margin: 20px;
        // margin-left: 60px;
        // height: 30px;
        
    }
    

    .box {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        // width: 80%;
        // height: 50px;
        // margin: 20px 20px 20px 20px;
        // padding: auto;
        // text-align: center;
        // margin-bottom: 20px;
    }

    .btn {
        text-align: center;
        width: 30%;
        margin: 20px 0px 0px 10px;
        // margin-left: auto;
        // margin-right: auto;
        // margin-top: 10px;
        font-weight: bold;
        font-size: 1.2em;
        background-color: #424b54;
        border-radius: 30px;
        color: beige;
        text-decoration: none;
        border: 1px solid beige;
        padding: 10px 10px;

        &:hover {
        background-color: sandybrown;
        cursor: pointer;
      }
    }
</style>