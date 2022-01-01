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
  </div>
  Broj sati blagdan: {{blagdan}}<br/>
  Broj sati običnih: {{br_sati}}<br/>
  Broj sati noćni rad: {{nocni_rad}}<br/>
  Broj sati odsutan: {{odsutan}}<br/>
  Broj sati prekovremeni: {{prekovremeni}}<br/>
  Suma (bez odsutnih sati): {{suma}}
</div>
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