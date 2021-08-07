<template>
  <div>
    <home-img></home-img>
    
    <h2 class="intro_menu">เมนูแนะนำ</h2>
    <br>
    <!--<home-introduce></home-introduce>

     <div class="banner">
      <img class="image" src="@/assets/banner.jpg">
    </div>

    <div class="container">
      <div class="content">
        <h1>This our HomePage</h1>
      </div>

      <div class="content">
        <h2>We will add something here</h2>
      </div>

      <div class="content">
        <h3>Just a test content</h3>
      </div>
    </div> -->
  </div>
</template>

<script>
import HomeImg from '@/components/HomeImg'
//import HomeIntroduce from '@/components/HomeIntroduce.vue'

export default {
  components:{
    HomeImg,
    //HomeIntroduce
    
    
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
  // .container {
  //   text-align: center;
  // }

  // .image {
  //   width: 100%;
  //   height: 300px;
  // }
  
  // .content {
  //   margin: 50px;
  // }
  
</style>