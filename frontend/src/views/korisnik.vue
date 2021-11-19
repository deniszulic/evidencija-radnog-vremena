<template>
  <div v-if="admin==false">
    <h1>korisnik</h1>
  </div>
</template>
<script>
import { Auth } from "@/services";
export default{
  name:'korisnik',
  data(){
    return{
      admin:Auth.state.admin
    }
  },
  watch:{
    getFullPath(){
    this.usao()
  }
  }
}
</script>
