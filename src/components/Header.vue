<template>
  <div id="app">
    <div id="head">
      <h1 class="ChaKaiMook">
        ChaKaiMook
      </h1>
    </div>

    <div id="nav">
      <router-link class="btn" to="/">หน้าแรก</router-link>
      <router-link class="btn" to="/product">เลือกซื้อ</router-link>
      <router-link class="btn" to="/reward">แลกรางวัล</router-link>
      <router-link class="btn" v-if="isAdmin()" to="/leaderboard">กระดานคะแนน</router-link>
      <a v-if="!isAuthen()">
        <router-link class="btn in" to="/login">เข้าสู่ระบบ</router-link>
        <router-link class="btn re" to="/register">สมัครสมาชิก</router-link>
      </a>
      <a v-if="isAuthen()">
        <router-link class="btn" to="/profile">ข้อมูลผู้ใช้</router-link>
        <router-link class="btn out" to="/logout">ออกจากระบบ</router-link>
      </a>
    </div>
    <router-view/>

  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"

export default {
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

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #head {
    background-color: blanchedalmond;
    height: 100px;
    padding: 20px;
    text-align: center;
    color: #333;

    a {
      color: #333;
      text-decoration: none;
      cursor: default;
    }
    
    h1 {
      font-size: 2.5em;
      padding: 25px;
    }
  }

  #nav {
    background-color: #2c3e50;
    padding: 25px;
    text-align: center;

    .btn {
      font-weight: bold;
      color: beige;
      text-decoration: none;
      border-radius:28px;
      border:1px solid beige;
      padding: 10px 20px;
      margin-right: 15px;

      &.router-link-exact-active {
        color: #2c3e50;
        background-color: #feb236;
      }
      
      &:hover {
        color: #333;
        background-color: beige;;
      }
     
      &:active {
        color: coral;
      }

      &.in {
        background-color: royalblue;

        &:hover {
          background-color: green;
          color: beige;
        }

        &.router-link-exact-active {
          color: #2c3e50;
          background-color: #feb236;
        }
      }

      &.re {
        background-color: royalblue;

        &:hover {
          background-color: green;
          color: beige;
        }

        &.router-link-exact-active {
          color: #2c3e50;
          background-color: #feb236;
        }
      }

      &.out {
        background-color: salmon;

        &:hover {
          background-color: crimson;
          color: beige;
        }
      }
    }
  }
</style>