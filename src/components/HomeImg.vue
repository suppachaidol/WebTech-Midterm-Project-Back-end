<template>
  <div >
    <div class="home_img">
        <!-- <img class="img_home" src="@/assets/hometea.jpg" alt="Cinque Terre"> -->
        <div class="text_home">
          <h2 class="text_home_one">ยิ่งซื้อยิ่งมีโอกาสได้ของรางวัล</h2>
          <br>
          <p class="text_home_two">ซื้อเครื่องดื่มแล้วรับแต้ม เพื่อแลกของรางวัลมากมาย</p>
          <br>
          <p class="text_home_three">เช่น แก้วน้ำ gift voucher ฯลฯ</p>
          <br>
          
          <a class="home_yes" v-if="isAuthen()">
          <router-link class="btn_buy" to="/product">ซื้อเลย</router-link>
          </a>
          <a class="home_no" v-if="!isAuthen()">
          <router-link class="btn_buy" to="/login">ซื้อเลย</router-link>
         </a>
        

        </div>
        

    </div>
  
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  methods:{
    isAuthen(){
      return AuthUser.getters.isAuthen
    }
  }


}
</script>

<style>
div.home_img{
  padding: 60px 0px 60px 0px;
  /* width: 100%; */
  background: url(../assets/hometea.jpg) no-repeat top;
  background-size:cover;
  background-position:30% 20%;
  /* background: image width 100%; ; */
  /* margin: 0px; */
  /* position: relative; */
  /* border: black solid 2px ; */
  
}
div.text_home{
  /* position: absolute;
  top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */
  font-family:monospace,serif;
  font-weight: bold;
  color: rgb(95, 73, 0);
  margin: 5px;
  text-align: center;
  
  
}
p.text_home_two{
  
  font-size: 25px;
}
p.text_home_three{
  
  font-size: 18px;
}
h2.text_home_one{
  
  font-size: 50px;
  
}

.btn_buy:link, .btn_buy:visited{
  /* box-shadow: 4px 6px #888888; */
  border-radius: 5px;
  padding: 10px 30px;
  text-align: center;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  background-color: #2c3e50;
  color: white;
  /* border: 2px solid black; */
  
  text-decoration: none;
  display: inline-block;
  
}
.btn_buy:hover ,.btn_buy:active{
  box-shadow: 4px 9px #888888;
  background-color:#feb236;

  color: #2c3e50;
}


</style>