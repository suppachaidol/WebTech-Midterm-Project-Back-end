<template>
  <div>
    <home-img></home-img>
    
    <h2 class="intro_menu">เมนูแนะนำ</h2>
    <br>
    <home-introduce></home-introduce>
  </div>
</template>

<script>
import HomeImg from '@/components/HomeImg'
import HomeIntroduce from '@/components/HomeIntroduce.vue'

export default {
  components:{
    HomeImg,
    HomeIntroduce
    
    
  }

}
</script>

<style lang="scss">
  .intro_menu{
    text-align: center;
    background-color: #2c3e50;
    padding: 30px 30px 30px 20px;
    color: #eaf3fd;
  }
</style>