<template>
  <div class="page">
    <div class="top">
      <div class="banner_product" />

      <div class="word_product">
        <h1>เครื่องดื่มสุดอร่อย</h1>
      </div>
    </div>

    <show-product></show-product>
  </div>
</template>

<script>
import ShowProduct from "@/components/ShowProduct"
export default {
  components: {
    ShowProduct,
  }

}
</script>

<style lang="scss" scoped>
  .page {
    background-color: cadetblue;
  }

  .top {
    width: 100%;
    height: 300px;
    overflow: hidden
  }

  .banner_product {
    background-image: url('../assets/drink.jpg');
    background-position: center;
    width: 100%;
    height: 300px;
    filter: blur(5px);
  }

  .word_product {
    position: relative;
    border: 3px solid wheat;
    background-color: rgba(0,0,0, 0.6);
    color: beige;
    font-weight: bold;
    border-radius: 20px;
    bottom: 50%;
    transform: translate(50%, -50%);
    width: 50%;
    height: 25%;
    padding: 10px;
    text-align: center;
    h1 {
    font-size: 4em;
    }
  }

  

</style>