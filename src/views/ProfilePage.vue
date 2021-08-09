<template>
  <div>
    <h1 class="profile">Profile</h1>
    <profile></profile>

  </div>

</template>

<script>
import Profile from '@/components/Profile.vue'
export default {
  components:{
    Profile
  }
}
</script>

<style>
h1.profile{
  text-align: center;
  margin: 50px;
  font-size: 70px;
  font-family: 'Trebuchet MS','sans-serif';
}
</style>