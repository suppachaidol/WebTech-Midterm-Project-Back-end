<template>
<div>
    <div v-for="(pro, index) in products" :key="index">
    <div  v-if="index === 1 || index===2" :class="'home_intro_'+index">
        <div>
            <img class="img_milktea_home" :src="api_endpoint+products[index].image.url">
        </div>
        <div class="intro_lable_menu">

            <label>ชื่อสินค้า: {{products[index].name}}</label>
            <br>
            <label >ราคา: {{products[index].price}}</label>
            <br>
            <label>แต้มที่ได้: {{products[index].points}}</label>
        </div>
    </div>
        

        
        
    </div>
</div>

  
</template>

<script>
import BeverageStore from '@/store/Beverage'
export default {
    data(){
        return{
            index: 1,
            products:[],
            api_endpoint: process.env.VUE_APP_CHAKAIMOOK_ENDPOINT || "http://localhost:1337"
        }
    },
    created(){
        this.fetchProduct()
        
    },
    methods:{
        async fetchProduct() {
            await BeverageStore.dispatch("fetchProduct")
            this.products = BeverageStore.getters.prod
            console.log(this.products[1])
        },
    }
    
}
</script>

<style>
.home_intro_1{
    box-shadow: 5px 9px #888888;
    padding: 20px 20px 20px 20px;
    border: #2c3e50 solid 3px;
    margin: 20px;
    font-family: monospace;
    font-size: 18px;
    font-weight: bold;
    background-color: #694306;
    border-radius: 5px;
    display: flex;
     color: rgb(250, 237, 220);
    
}
.home_intro_2{
    box-shadow: 5px 9px #888888;
    padding: 20px 20px 20px 20px;
    border: #2c3e50 solid 3px;
    margin: 20px;
    border-radius:5px ;
    font-family: monospace;
    font-weight: bold;
    font-size: 18px;
    background-color: #f19a0d;
    display: flex;
     color: #2c3e50;
   
}
.img_milktea_home{
    border-radius: 5px;
    float: left;
    margin-right: 15px ;
}
.intro_lable_menu{
    margin: 10px 20px 20px 20px;
    font-family: monospace;
    font-size: 24px;
}
</style>