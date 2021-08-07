<template>
  <div>
      <div class="profilediv">
        <label class="profilelable1">Username: {{form.username}}</label>
        <br>
        <label class="profilelable2">Email: {{form.email}}</label>
        <br>
        <label class="profilelable3">Point Total: {{form.total_points}}</label>

      </div>
    
    

  </div>

</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  data() {
        return {
            form: {
                username: "",
                email: "",
                total_points: ""
            }
        }
    },
    created(){
      console.log(AuthUser.getters.user)
      this.form.username=AuthUser.getters.user.username
      this.form.email=AuthUser.getters.user.email
      if(AuthUser.getters.user.total_points===null){
           this.form.total_points="0"
      }
      else{
          this.form.total_points=AuthUser.getters.user.total_points
      }
      
      
    },

}
</script>

<style>
div.profilediv{
    padding: 10px 10px 10px 50px;
    margin: 60px;
    border:rgb(110, 107, 81) groove 5px;
    border-radius: 5px;
    /* border-color: ; */
    background: lemonchiffon;
}
label.profilelable1{
    font-family: 'Trebuchet MS','sans-serif';
    font-size: 24px;
    font-weight: bold;

}
label.profilelable2{
    font-family: 'Trebuchet MS','sans-serif';
    font-size: 24px;
    font-weight: bold;
    
}
label.profilelable3{
    font-family: 'Trebuchet MS','sans-serif';
    font-size: 24px;
    font-weight: bold;
}

</style>