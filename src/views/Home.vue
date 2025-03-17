<template>
  <div class="main-container">
    <Main/>
</div>
  
</template>

<script>
import Main from "../components/Main.vue"
export default {
  name: 'Home',
  components:{
    Main,
  },
}
</script>
<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; 
  background: white; 
}
</style>
