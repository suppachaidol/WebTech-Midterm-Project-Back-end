<template>
  <div>
    <div class="container">
      <div class="content" v-for="(pro, index) in products" :key="index">
        <img :src="api_endpoint + pro.image.url"><br>
        <h2>{{ pro.name }}</h2>
        <div class="show">
            <label>ราคา: </label>
            <h3>{{ pro.price }}</h3>
        </div>

        <div class="show">
            <label>แต้มที่ได้: </label>
            <h3>{{ pro.points }}</h3>
        </div>
        
        <button class="btn" v-if="isAuthen()" @click="buyItem(pro)">ซื้อ</button>
      </div>
    </div>
  </div>
</template>

<script>
import BeverageStore from '@/store/Beverage'
import AuthUser from '@/store/AuthUser'

export default {
  data() {
    return {
      products: [],
      api_endpoint: process.env.VUE_APP_CHAKAIMOOK_ENDPOINT || "http://localhost:1337",
      user: {}
    }
  },
  created() {
    this.fetchProduct()
    this.isAuthen()
  },
  methods: {
    async fetchProduct() {
      await BeverageStore.dispatch("fetchProduct")
      this.products = BeverageStore.getters.prod
    },
    isAuthen() {
      return AuthUser.getters.isAuthen
    },
    async buyItem(item) {
      let payload1 = {
        id: AuthUser.getters.user.id,
        total_points: item.points + AuthUser.getters.user.total_points,
        max_points: item.points + AuthUser.getters.user.max_points,
      }
      console.log(payload1)

      let payload2 = {
        name: AuthUser.getters.user.username,
        get_points: item.points
      }
      console.log(payload2)

      console.log(AuthUser.getters.user.total_points)

      await AuthUser.dispatch('updateGet', payload1)

      let res = await BeverageStore.dispatch('buyItem', payload2)
      if (res.success) {
        this.$swal(`คุณได้รับ ${item.points}`, `แต้มที่มี: ${AuthUser.getters.user.total_points}`, "success")
      } else {
        this.$swal("เกิดข้อผิดพลาด", "กรุณาลองอีกครั้ง", "error")
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: center;
  }

  .content {
    color: bisque;
    text-align: center;
    border: bisque solid 5px;
    border-radius: 50px;
    padding: 20px;
  }

  img {
    margin: 20px;
    border-radius: 30px;
    border: 1px solid beige;
  }

  .show {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: left;
    width: 50%;
    padding: auto;
    margin: auto;

    label {
        margin: 5px;
    }

    h3 {
        margin: 5px;
    }
  }

  h2 {
      margin-bottom: 20px;
  }

  .btn {
    font-weight: bold;
    font-size: 1.2em;
    background-color: sandybrown;
    color: beige;
    text-decoration: none;
    border-radius: 28px;
    border: 1px solid beige;
    padding: 10px 20px;
    text-align: center;
    margin-top: 20px;
  }
</style>