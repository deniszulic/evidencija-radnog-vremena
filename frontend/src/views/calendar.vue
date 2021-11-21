<template>
<div id="app">
<div class="container">

<div class="jumbotron">
  <h1 class="display-4">Upis radnih sati</h1>
  <hr class="my-4">
  <img src="https://i.ibb.co/zmBCGtv/logo.png" alt="logo" width="350" height="100">
  <hr>
</div>
<form @submit.prevent="kalendar">
<div class="container">
  <div class="row">
    <div class="col-sm">
      <h2>Odaberi datum: </h2>
      <DatePicker v-model="range" is-range />
    </div>
    
    <div class="col-sm">
      <br><br>
      <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Broj radnih sati</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours" required v-model.number="brsati">
    </div>
  </div>
<br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Prekovremeni</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours" v-model.number="prekovremeni">
    </div>
  </div>

<br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Rad vikendom/blagdanom</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours" v-model.number="blagdan">
    </div>
  </div>
<br>
 <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Noćni rad</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours" v-model.number="nocni">
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Odsutan</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours" v-model.number="odsutan">
    </div>
  </div>
<br>

<div class="form-group col-md-5">
      <label for="inputState">Rad od kuće</label>
      <select v-model="posaoodkuce" id="inputState" class="form-control" >
        <option selected>NE</option>
        <option>DA</option>
      </select>
    </div>
<br>
    <div class="form-group col-md-10">
    <label for="exampleFormControlTextarea1">Napomena: </label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="napomena"></textarea>
  </div>


    </div>
    <div class="col-sm">
      <h2>Status:</h2>
      <p><i>Ukupno sati: {{suma}}</i></p>
      <p>Odabrani datumi:</p>
      <p><b>od {{formattedDateStart}} do {{formattedDateEnd}}</b></p>
      <br>
    <button type="submit" class="btn btn-success btn-lg" style="float:right">Pošalji</button>
    </div>
  </div>
</div>

</form>

<!--
{{currentDate}}

  <DatePicker v-model="range" is-range />-->
  </div>


  </div>



</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
import {Podaci} from '@/services'
import {Auth} from '@/services'

export default {
  name:"calendar",
  components: {
    Calendar,
    DatePicker
  },
  methods: {
    currentDate() {
      const current = new Date();
      /*const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;
      
      return dateTime;*/
      return current.getMonth;
    },
    async kalendar(){
      let podaci={
        br_sati:this.brsati,
        prekovremeni:this.prekovremeni,
        blagdan:this.blagdan,
        nocni_rad:this.nocni,
        odsutan:this.odsutan,
        rad_od_kuce:this.posaoodkuce,
        napomena:this.napomena,
        datum_obavljanja_pocetak:this.range.start,
        datum_obavljanja_kraj:this.range.end,
        email:Auth.state.email,
        korisnik_id:Auth.state.id,
        postavljeno:Date.now()
      }
      await Podaci.datumi(podaci);
    }
  },
  data() {
  return {
    brsati:null,
    prekovremeni:null,
    blagdan:null,
    nocni:null,
    odsutan:null,
    posaoodkuce:null,
    napomena:null,
    //suma:null,
    range: {
      //start:this.currentDate() /*this.currentDate()*/,
      //end:'' /*this.currentDate()*/,
      start: new Date(),
      end: new Date()
    }
  }
},
computed:{
  suma:function(){
    //if(this.brsati>0||this.prekovremeni>0||this.blagdan>0||this.nocni>0||this.odsutan>0){
     // if(isNaN(this.brsati))
      return this.brsati+this.prekovremeni+this.blagdan+this.nocni+this.odsutan
    //}
  },
  formattedDateStart() {
      return moment(this.range.start).format('DD-MM-YYYY')// dan,mjesec, godina
    },
    formattedDateEnd() {
      return moment(this.range.end).format('DD-MM-YYYY')
    },
  provjera:function(){
    if(this.napomena=="") return this.napomena=null;
  }
}
  /*mounted () {
      this.currentDate()
    }*//*,
    watch:{
      range
    }*/
}

</script>

<style>

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}

</style>