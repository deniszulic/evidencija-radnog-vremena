<template>
  <div v-if="admin==false">
    <h3>Dobro došao nazad, {{ime}}</h3>
    <div class="jumbotron jumbotron-fluid"> <!-- v-if -->
  <div class="container">
    <div v-if="data" class="alert alert-danger" role="alert">
  Imate nepotpisanih sati !
</div>
  </div>


        <!-- Image element - set the background image for the header in the line below-->
        <div class="py-5 bg-image-full" style="background-image: url('https://source.unsplash.com/4ulffa6qoKA/1200x800')">
            <div style="height: 20rem"></div>
        </div>
        
        <section class="py-5">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <p class="lead">Take control of your working time. </p>
                        <p class="mb-0">I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>
                    </div>
                </div>
            </div>
        </section>
        


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