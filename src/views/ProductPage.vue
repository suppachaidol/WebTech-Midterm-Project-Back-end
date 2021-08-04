<template>
  <div>
    <div class="top">
      <div class="banner" />

      <div class="word">
        <h1>เครื่องดื่มสุดอร่อย</h1>
      </div>
    </div>
    
    <div class="test">
      <h2>Product table show here</h2>
    </div>

    <div class="container">
      <div class="content" v-for="(pro, index) in items" :key="index">
        <img :src="require(`@/assets/${pro.img}`)">
        <h3>{{ pro.menu }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import DataStore from '@/store/Beverage'
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await DataStore.dispatch("fetchData")
      this.items = DataStore.getters.prod
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    height: 300px;
    overflow: hidden
  }

  .banner {
    background-image: url('../assets/drink.jpg');
    background-position: center;
    width: 100%;
    height: 300px;
    filter: blur(5px);
  }

  .word {
    position: absolute;
    border: 3px solid wheat;
    background-color: rgba(0,0,0, 0.4);
    color: beige;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 50%;
    height: 10%;
    padding: 10px;
    text-align: center;
  }

  h1 {
    font-size: 4em;
  }

  .test {
    margin-top: 50px;
    text-align: center;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: center;
  }

  .content {
    text-align: center;
  }

</style>