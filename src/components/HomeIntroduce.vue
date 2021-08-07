<template>
<div>
    <div class="home_intro_one">
        <div>
            <img :src="require(`@/assets/${products[1].img}`)">
        </div>
        <div class="intro_lable_menu">
            <label>ชื่อสินค้า: {{products[1].name}}</label>
            <br>
            <label >ราคา: {{products[1].price}}</label>
            <br>
            <label>แต้มที่ได้: {{products[1].ponit}}</label>
        </div>
        
        

        
        
    </div>
    <br>
    <div class="home_intro_two">
        <div>
            <img :src="require(`@/assets/${products[2].img}`)">
        </div>
        <div class="intro_lable_menu">
            <label>ชื่อสินค้า: {{products[2].name}}</label>
            <br>
            <label>ราคา: {{products[2].price}}</label>
            <br>
            <label>แต้มที่ได้: {{products[2].ponits}}</label>
        </div>
             

       
        
    </div>
</div>

  
</template>

<script>
import BeverageStore from '@/store/Beverage'
export default {
    data(){
        return{
            products:[]

        }
    },
    created(){
        this.fetchProduct()
        console.log(this.products)

    },
    methods:{
        async fetchProduct() {
            await BeverageStore.dispatch("fetchProduct")
            this.products = BeverageStore.getters.prod
        },
    }
    

}
</script>

<style>
.home_intro_one{
    box-shadow: 5px 9px #888888;
    padding: 20px 20px 20px 20px;
    border: #2c3e50 solid 3px;
    margin: 20px;
    font-family: monospace;
    font-size: 18px;
    font-weight: bold;
    background-color: rgb(95, 73, 0);
    border-radius: 5px;
    display: flex;
     color: rgb(250, 237, 220);
    
}
.home_intro_two{
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
.home_intro_one>img,.home_intro_two>img{
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