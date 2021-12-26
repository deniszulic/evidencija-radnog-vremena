<template>
  <div v-if="admin==false">
    <h3>Dobro došao nazad, {{ime}}</h3>
    <div class="jumbotron jumbotron-fluid"> <!-- v-if -->
  <div class="container">
    <div class="alert alert-danger" role="alert">
  Imate nepotpisanih sati !
</div>
  </div>
</div>


    


  </div>
</template>
<script>
import { Auth } from "@/services";
export default{
  name:'korisnik',
  data(){
    return{
      admin:Auth.state.admin,
      ime:Auth.state.name
    }
  },
  methods: {
    
}
}
</script>


<style>

</style>