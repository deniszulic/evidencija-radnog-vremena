<template>
  <div v-if="admin==false">
    <h3>Dobro došao nazad, {{ime}}</h3>
    <div class="jumbotron jumbotron-fluid"> <!-- v-if -->
  <div class="container">
    <div class="alert alert-danger" role="alert" v-if="locked.length!=null">
  Imate nepotpisanih sati !
</div>
<div class="alert alert-success" role="alert" v-if="locked.length==null">
  Svi sati su potpisani !
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
  Broj sati blagdan: {{blagdan}}<br/>
  Broj sati običnih: {{br_sati}}<br/>
  Broj sati noćni rad: {{nocni_rad}}<br/>
  Broj sati odsutan: {{odsutan}}<br/>
  Broj sati prekovremeni: {{prekovremeni}}<br/>
  Suma (bez odsutnih sati): {{suma}}
</div>
</template>
<script>
import {dohvatpodataka} from '@/services'
import { Auth } from "@/services";
export default{
  name:'korisnik',
  data(){
    return{
      admin:Auth.state.admin,
      ime:Auth.state.name,
      mydata:[],
      locked:[],
      blagdan:'',
      br_sati:'',
      nocni_rad:'',
      odsutan:'',
      prekovremeni:''
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    async fetchData(){
        this.mydata=await dohvatpodataka.getstatisticdata(Auth.state.id)
        this.blagdan=this.mydata[0].blagdan;
        this.br_sati=this.mydata[0].br_sati;
        this.nocni_rad=this.mydata[0].nocni_rad
        this.odsutan=this.mydata[0].odsutan
        this.prekovremeni=this.mydata[0].prekovremeni
       this.locked=await dohvatpodataka.getlockeddatacheck(Auth.state.id)
    }
},
computed:{
  suma:function(){
    return parseInt(this.blagdan)+parseInt(this.br_sati)+parseInt(this.nocni_rad)+parseInt(this.prekovremeni)
  }
}
}
</script>


<style>

</style>